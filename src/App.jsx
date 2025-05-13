import { useState, useEffect, createContext } from 'react';
import { Routes, Route, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from './store/userSlice';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Jobs from './pages/Jobs';
import Employers from './pages/Employers';
import Dashboard from './pages/Dashboard';
import StudentProfile from './pages/StudentProfile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

// Create auth context for sharing authentication methods
export const AuthContext = createContext(null);

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // Authentication state
  const { isAuthenticated, user } = useSelector(state => state.user);
  const [isInitialized, setIsInitialized] = useState(false);

  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Initialize ApperUI once when the app loads
  useEffect(() => {
    const { ApperClient, ApperUI } = window.ApperSDK;
    const client = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    // Initialize but don't show login yet
    ApperUI.setup(client, {
      target: '#authentication',
      clientId: import.meta.env.VITE_APPER_PROJECT_ID,
      view: 'both',
      onSuccess: function(user) {
        // CRITICAL: This exact currentPath logic must be preserved
        let currentPath = window.location.pathname + window.location.search;
        if (user && user.isAuthenticated) {
          dispatch(setUser(user));
          navigate('/dashboard');
        } else if (!currentPath.includes('login')) {
          navigate(currentPath);
        } else {
          navigate('/login');
        }
      },
      onError: function(error) {
        console.error("Authentication failed:", error);
      }
    });
    
    setIsInitialized(true);
  }, [dispatch, navigate]);

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Toggle dark mode handler
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };
  
  // Authentication methods to share via context
  const authMethods = {
    isInitialized,
    logout: async () => {
      try {
        const { ApperUI } = window.ApperSDK;
        await ApperUI.logout();
        dispatch(clearUser());
        navigate('/login');
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
  };

  return (
    <AuthContext.Provider value={authMethods}>
      <div className="min-h-screen flex flex-col bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-200 transition-colors duration-200">
        <header className="sticky top-0 z-10 bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 shadow-sm">
          <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
            <NavLink to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                CareerBridge
              </span>
            </NavLink>
            
            <div className="flex items-center justify-between w-full sm:w-auto">
              <nav className="flex items-center space-x-1 sm:space-x-2">
                <NavLink 
                  to="/" 
                  className={({ isActive }) => 
                    `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 hover:text-surface-900 dark:hover:text-white'
                    }`
                  }
                  end
                >
                  Home
                </NavLink>
                <NavLink 
                  to="/jobs" 
                  className={({ isActive }) => 
                    `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 hover:text-surface-900 dark:hover:text-white'
                    }`
                  }
                >
                  Jobs
                </NavLink>
                <NavLink 
                  to="/employers" 
                  className={({ isActive }) => 
                    `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 hover:text-surface-900 dark:hover:text-white'
                    }`
                  }
                >
                  For Employers
                </NavLink>
                {isAuthenticated && (
                  <>
                    <NavLink 
                      to="/dashboard" 
                      className={({ isActive }) => 
                        `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isActive 
                            ? 'bg-primary/10 text-primary' 
                            : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 hover:text-surface-900 dark:hover:text-white'
                        }`
                      }
                    >
                      Dashboard
                    </NavLink>
                  </>
                )}
              </nav>
              
              <div className="flex items-center gap-2">
                {isAuthenticated ? (
                  <button
                    onClick={authMethods.logout}
                    className="px-3 py-2 rounded-lg text-sm font-medium bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                  >
                    Logout
                  </button>
                ) : (
                  <NavLink
                    to="/login"
                    className="px-3 py-2 rounded-lg text-sm font-medium bg-primary text-white hover:bg-primary-dark transition-colors"
                  >
                    Login
                  </NavLink>
                )}
                <button 
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? '🌞' : '🌙'}
                </button>
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-grow container mx-auto px-4 py-6">
          {/* Hidden element for authentication target */}
          <div id="authentication" className="hidden"></div>
          
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home darkMode={darkMode} />} />
            <Route path="/jobs" element={<Jobs darkMode={darkMode} />} />
            <Route path="/opportunities" element={<Jobs darkMode={darkMode} showAllOpportunities={true} />} />
            <Route path="/employers" element={<Employers darkMode={darkMode} />} />

            {/* Authentication routes - accessible only when NOT authenticated */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
            
            {/* Protected routes - require authentication */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard darkMode={darkMode} />} />
              <Route path="/profile" element={<StudentProfile darkMode={darkMode} />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <footer className="bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 py-6">
          <div className="container mx-auto px-4 text-center text-surface-600 dark:text-surface-400">
            <p>© 2023 CareerBridge. Connect students with opportunities.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
    </AuthContext.Provider>