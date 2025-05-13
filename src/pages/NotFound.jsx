import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

function NotFound() {
  // Get icons
  const ChevronLeftIcon = getIcon('ChevronLeft');
  const MapIcon = getIcon('Map');

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <motion.div 
        className="max-w-md w-full text-center space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
            <MapIcon className="h-12 w-12 text-primary" />
          </div>
        </div>
        
        <h1 className="text-5xl font-bold text-surface-800 dark:text-surface-100">404</h1>
        <h2 className="text-2xl font-semibold text-surface-700 dark:text-surface-300">Page Not Found</h2>
        
        <p className="text-surface-600 dark:text-surface-400 text-lg">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark dark:hover:text-primary-light font-medium"
          >
            <ChevronLeftIcon className="h-5 w-5" />
            Return to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default NotFound;