import { useState } from 'react';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';
import { createEmployer } from '../services/employerService';

function Employers({ darkMode }) {
  // Get icons
  const BuildingIcon = getIcon('Building');
  const UserIcon = getIcon('User');
  const MailIcon = getIcon('Mail');
  const PhoneIcon = getIcon('Phone');
  const BriefcaseIcon = getIcon('Briefcase');
  const GlobeIcon = getIcon('Globe');
  const AlertCircleIcon = getIcon('AlertCircle');

  // Form state
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    size: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    website: '',
    description: '',
    acceptTerms: false
  });

  // Validation state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    
    if (!formData.industry) {
      newErrors.industry = 'Please select an industry';
    }
    
    if (!formData.contactName.trim()) {
      newErrors.contactName = 'Contact name is required';
    }
    
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Email is invalid';
    }
    
    if (formData.contactPhone && !/^\+?[0-9]{10,15}$/.test(formData.contactPhone.replace(/[\s-]/g, ''))) {
      newErrors.contactPhone = 'Phone number is invalid';
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Real API call to create employer
      const result = await createEmployer({
        companyName: formData.companyName,
        industry: formData.industry,
        size: formData.size,
        contactName: formData.contactName,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        website: formData.website,
        description: formData.description
      });
      
      // Registration successful
      setSubmitSuccess(true);
      
      // Show success message temporarily
      setTimeout(() => setSubmitSuccess(false), 5000);
      
      // Reset form after successful submission
      setFormData({
        companyName: '',
        industry: '',
        size: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        website: '',
        description: '',
        acceptTerms: false
      });
    } catch (error) {
      console.error("Error creating employer:", error);
      alert("Failed to register employer. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Employer Registration</h1>
        <p className="text-lg text-surface-600 dark:text-surface-400">
          Join CareerBridge to post job opportunities and connect with talented students
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card p-6 md:p-8"
      >
        {submitSuccess && (
          <div className="mb-6 p-4 bg-green-100 dark:bg-green-800/30 border border-green-200 dark:border-green-700 rounded-lg text-green-800 dark:text-green-200">
            <p className="font-medium">Registration successful!</p>
            <p className="text-sm mt-1">Your employer account has been created. Our team will review your information and contact you shortly.</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Information */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <BuildingIcon className="mr-2 h-5 w-5 text-primary" />
                Company Information
              </h2>
            </div>

            <div className="space-y-2">
              <label htmlFor="companyName" className="block text-sm font-medium">Company Name*</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className={`input-field ${errors.companyName ? 'border-red-500 dark:border-red-500' : ''}`}
                placeholder="Enter company name"
              />
              {errors.companyName && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircleIcon className="h-3 w-3 mr-1" />{errors.companyName}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="industry" className="block text-sm font-medium">Industry*</label>
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className={`input-field ${errors.industry ? 'border-red-500 dark:border-red-500' : ''}`}
              >
                <option value="">Select industry</option>
                <option value="technology">Technology</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="retail">Retail</option>
                <option value="marketing">Marketing</option>
                <option value="other">Other</option>
              </select>
              {errors.industry && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircleIcon className="h-3 w-3 mr-1" />{errors.industry}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="size" className="block text-sm font-medium">Company Size</label>
              <select
                id="size"
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select company size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501-1000">501-1000 employees</option>
                <option value="1000+">1000+ employees</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="website" className="block text-sm font-medium">Company Website</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <GlobeIcon className="h-4 w-4 text-surface-400" />
                </div>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label htmlFor="description" className="block text-sm font-medium">Company Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="input-field"
                placeholder="Tell us about your company..."
              ></textarea>
            </div>

            {/* Contact Information */}
            <div className="md:col-span-2 mt-4">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <UserIcon className="mr-2 h-5 w-5 text-primary" />
                Contact Information
              </h2>
            </div>

            <div className="space-y-2">
              <label htmlFor="contactName" className="block text-sm font-medium">Contact Name*</label>
              <input
                type="text"
                id="contactName"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                className={`input-field ${errors.contactName ? 'border-red-500 dark:border-red-500' : ''}`}
                placeholder="Full name"
              />
              {errors.contactName && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircleIcon className="h-3 w-3 mr-1" />{errors.contactName}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="contactEmail" className="block text-sm font-medium">Email Address*</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MailIcon className="h-4 w-4 text-surface-400" />
                </div>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className={`input-field pl-10 ${errors.contactEmail ? 'border-red-500 dark:border-red-500' : ''}`}
                  placeholder="email@example.com"
                />
              </div>
              {errors.contactEmail && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircleIcon className="h-3 w-3 mr-1" />{errors.contactEmail}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="contactPhone" className="block text-sm font-medium">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <PhoneIcon className="h-4 w-4 text-surface-400" />
                </div>
                <input
                  type="tel"
                  id="contactPhone"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  className={`input-field pl-10 ${errors.contactPhone ? 'border-red-500 dark:border-red-500' : ''}`}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              {errors.contactPhone && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircleIcon className="h-3 w-3 mr-1" />{errors.contactPhone}</p>}
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="acceptTerms"
                  name="acceptTerms"
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary bg-surface-100 dark:bg-surface-700 border-surface-300 dark:border-surface-600 rounded focus:ring-primary"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="acceptTerms" className={`font-medium ${errors.acceptTerms ? 'text-red-500' : ''}`}>
                  I agree to the Terms of Service and Privacy Policy
                </label>
                {errors.acceptTerms && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircleIcon className="h-3 w-3 mr-1" />{errors.acceptTerms}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn-primary w-full flex items-center justify-center gap-2 py-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                  Processing...
                </>
              ) : (
                <>
                  <BriefcaseIcon className="h-5 w-5" />
                  Register as Employer
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default Employers;