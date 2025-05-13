import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

/**
 * 404 Not Found page
 */
function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Helmet>
        <title>Page Not Found | CareerBridge</title>
        <meta name="description" content="The page you're looking for doesn't exist or has been moved." />
      </Helmet>
      
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="text-surface-600 dark:text-surface-400 mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/" className="btn-primary">
            Go Home
          </Link>
          <Link to="/jobs" className="btn-outline">
            Browse Jobs
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;