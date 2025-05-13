import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * ProtectedRoute component
 * Ensures routes are only accessible to authenticated users
 */
function ProtectedRoute() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const location = useLocation();
  
  // If not authenticated, redirect to login with return path
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  
  return <Outlet />;
}

export default ProtectedRoute;