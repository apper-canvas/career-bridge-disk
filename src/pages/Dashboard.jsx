import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import DashboardTabs from '../components/DashboardTabs';
import StudentProfile from './StudentProfile';

const Dashboard = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading profile data
    setIsLoading(true);
    
    // Try to load profile data from localStorage
    const storedProfile = localStorage.getItem('studentProfile');
    if (storedProfile) {
      try {
        setProfileData(JSON.parse(storedProfile));
      } catch (error) {
        console.error('Error parsing profile data:', error);
        toast.error('Error loading profile data');
      }
    }
    
    // Simulate API request delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleProfileUpdate = (data) => {
    setProfileData(data);
    // In a real app, this would be an API call
    localStorage.setItem('studentProfile', JSON.stringify(data));
    toast.success('Profile updated successfully!');
  };

  // Dashboard tabs configuration
  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'applications', label: 'Applications', icon: '📝' },
    { id: 'saved-jobs', label: 'Saved Jobs', icon: '⭐' },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col gap-8">
        {/* Dashboard Header */}
        <div className="card p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">Student Dashboard</h1>
              <p className="text-surface-600 dark:text-surface-400">
                {profileData ? `Welcome back, ${profileData.firstName}!` : 'Complete your profile to get started'}
              </p>
            </div>
            <div className="flex gap-2">
              <Link 
                to="/jobs" 
                className="btn-outline text-sm"
              >
                Browse Jobs
              </Link>
              <button 
                className="btn-primary text-sm"
                onClick={() => {
                  setActiveTab('profile');
                  window.scrollTo(0, 0);
                }}
              >
                {profileData ? 'Update Profile' : 'Create Profile'}
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <div className="card p-4 mb-4">
              <div className="flex flex-col items-center py-6">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-4xl">{profileData?.firstName?.[0] || '?'}</span>
                </div>
                <h3 className="text-xl font-medium mb-1">
                  {profileData ? `${profileData.firstName} ${profileData.lastName}` : 'Complete Your Profile'}
                </h3>
                <p className="text-surface-500 dark:text-surface-400 text-sm mb-4">
                  {profileData?.university || 'Student'}
                </p>
                <div className="w-full mt-2">
                  <DashboardTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            {activeTab === 'profile' && <StudentProfile darkMode={darkMode} onSave={handleProfileUpdate} initialData={profileData} isEmbedded={true} />}
            {activeTab === 'applications' && <div className="card p-6"><h2 className="text-xl mb-4">Your Applications</h2><p>You haven't applied to any jobs yet.</p></div>}
            {activeTab === 'saved-jobs' && <div className="card p-6"><h2 className="text-xl mb-4">Saved Jobs</h2><p>You haven't saved any jobs yet.</p></div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;