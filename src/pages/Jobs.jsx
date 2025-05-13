import { Helmet } from 'react-helmet-async';
import MainFeature from '../components/MainFeature';
import { motion } from 'framer-motion';

function Jobs({ darkMode }) {
  return (
    <div className="flex flex-col gap-8 pb-8">
      <Helmet>
        <title>Find Jobs | CareerBridge</title>
        <meta name="description" content="Browse and search for job and internship opportunities on CareerBridge" />
      </Helmet>
      
      <section className="pt-4 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Find Your Perfect Opportunity</h1>
          <p className="text-lg text-surface-600 dark:text-surface-400 max-w-3xl">
            Browse through our extensive list of job openings and internships. Use filters to narrow down your search and find the perfect match for your skills and career goals.
          </p>
        </motion.div>
      </section>
      
      <MainFeature darkMode={darkMode} />
    </div>
  );
}

export default Jobs;