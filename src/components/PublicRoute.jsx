import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * PublicRoute component
 * For routes that should redirect to dashboard if user is already authenticated
 * (like login and signup pages)
 */
function PublicRoute() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const location = useLocation();
  
  // If already authenticated, redirect to intended destination or dashboard
  if (isAuthenticated) {
    const destination = location.state?.from || '/dashboard';
    return <Navigate to={destination} replace />;
  }
  
  return <Outlet />;
}

export default PublicRoute;