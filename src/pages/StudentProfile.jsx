import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentProfile = ({ darkMode, onSave, initialData = null, isEmbedded = false }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    university: '',
    degree: '',
    fieldOfStudy: '',
    graduationYear: new Date().getFullYear(),
    skills: '',
    bio: '',
    linkedin: '',
    github: '',
    portfolio: '',
    resume: null,
    profileComplete: false
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // If initialData is provided, use it
    if (initialData) {
      setFormData(prevData => ({
        ...prevData,
        ...initialData
      }));
    } else if (!isEmbedded) {
      // Only attempt to load from localStorage if not embedded in Dashboard
      // (Dashboard component already handles this)
      const storedProfile = localStorage.getItem('studentProfile');
      if (storedProfile) {
        try {
          setFormData(JSON.parse(storedProfile));
        } catch (error) {
          console.error('Error parsing profile data:', error);
        }
      }
    }
  }, [initialData, isEmbedded]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setFormData(prevData => ({
          ...prevData,
          resume: file
        }));
        
        // Clear error
        setErrors(prev => ({
          ...prev,
          resume: null
        }));
      } else {
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.university.trim()) newErrors.university = 'University is required';
    if (!formData.degree.trim()) newErrors.degree = 'Degree is required';
    if (!formData.fieldOfStudy.trim()) newErrors.fieldOfStudy = 'Field of study is required';
    
    // Phone validation
    if (formData.phone.trim() && !/^\+?[0-9\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }

    // URL validations
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    
    if (formData.linkedin.trim() && !urlRegex.test(formData.linkedin)) {
      newErrors.linkedin = 'LinkedIn URL is invalid';
    }
    
    if (formData.github.trim() && !urlRegex.test(formData.github)) {
      newErrors.github = 'GitHub URL is invalid';
    }
    
    if (formData.portfolio.trim() && !urlRegex.test(formData.portfolio)) {
      newErrors.portfolio = 'Portfolio URL is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Mark profile as complete
    const profileData = {
      ...formData,
      profileComplete: true,
      lastUpdated: new Date().toISOString()
    };
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, this would be an API call
      localStorage.setItem('studentProfile', JSON.stringify(profileData));
      
      setIsLoading(false);
      
      if (onSave) {
        // If callback provided (from Dashboard), use it
        onSave(profileData);
      } else {
        navigate('/dashboard');
      }
    }, 1000);
  };

  return (
    <div className={`${isEmbedded ? '' : 'max-w-3xl mx-auto'}`}>
      <div className="card">
        <div className="p-6 border-b border-surface-200 dark:border-surface-700">
          <h2 className="text-xl font-bold">Student Profile</h2>
          <p className="text-surface-600 dark:text-surface-400 mt-1">
            Complete your profile to increase your chances of getting hired
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`input-field ${errors.firstName ? 'border-red-500' : ''}`}
                placeholder="John"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`input-field ${errors.lastName ? 'border-red-500' : ''}`}
                placeholder="Doe"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                placeholder="john.doe@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`input-field ${errors.phone ? 'border-red-500' : ''}`}
                placeholder="+1 (555) 123-4567"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>
          </div>
          
          <h3 className="text-lg font-medium mb-4 pt-2 border-t border-surface-200 dark:border-surface-700">Education</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="university" className="block text-sm font-medium mb-1">
                University/College <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="university"
                name="university"
                value={formData.university}
                onChange={handleChange}
                className={`input-field ${errors.university ? 'border-red-500' : ''}`}
                placeholder="Stanford University"
              />
              {errors.university && (
                <p className="mt-1 text-sm text-red-500">{errors.university}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="degree" className="block text-sm font-medium mb-1">
                Degree <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="degree"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                className={`input-field ${errors.degree ? 'border-red-500' : ''}`}
                placeholder="Bachelor of Science"
              />
              {errors.degree && (
                <p className="mt-1 text-sm text-red-500">{errors.degree}</p>
              )}
            </div>
          </div>
          
          <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-surface-200 dark:border-surface-700">
            <button type="button" onClick={() => navigate(-1)} className="btn bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600">
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentProfile;