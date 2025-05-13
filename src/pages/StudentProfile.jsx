import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createStudentProfile, updateStudentProfile } from '../services/studentProfileService';

function StudentProfile({ darkMode, onSave, initialData, isEmbedded = false }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    university: '',
    major: '',
    graduationYear: '',
    bio: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Load initial data if provided
  useEffect(() => {
    if (initialData) {
      setFormData({
        firstName: initialData.firstName || '',
        lastName: initialData.lastName || '',
        university: initialData.university || '',
        major: initialData.major || '',
        graduationYear: initialData.graduationYear || '',
        bio: initialData.bio || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.university.trim()) {
      newErrors.university = 'University name is required';
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
      // Save to localStorage for offline/fallback access
      localStorage.setItem('studentProfile', JSON.stringify(formData));
      
      // Save to database if user is authenticated
      if (user && user.isAuthenticated) {
        if (initialData && initialData.Id) {
          await updateStudentProfile(initialData.Id, formData);
        } else {
          await createStudentProfile(formData);
        }
      }
      
      // Call onSave callback if provided
      if (onSave) {
        onSave(formData);
      }
      
      // Navigate to dashboard if not embedded
      if (!isEmbedded) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-4">Student Profile</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields for student profile - similar to Employers form */}
        {/* This would include firstName, lastName, university, etc. */}
        <div className="mt-4">
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default StudentProfile;