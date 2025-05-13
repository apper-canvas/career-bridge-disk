import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import MainFeature from '../components/MainFeature';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import jobsData from '../utils/jobsData';
import getIcon from '../utils/iconUtils';

function Jobs({ darkMode, showAllOpportunities = false }) {
  const location = useLocation();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5);
  const [filters, setFilters] = useState({
    jobType: [],
    location: [],
    experience: []
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  // Import icons
  const BriefcaseIcon = getIcon('Briefcase');
  const BuildingIcon = getIcon('Building');
  const MapPinIcon = getIcon('MapPin');
  const CalendarIcon = getIcon('Calendar');
  const FilterIcon = getIcon('Filter');
  const SearchIcon = getIcon('Search');
  const ArrowRightIcon = getIcon('ArrowRight');
  const DollarSignIcon = getIcon('DollarSign');
  const ClockIcon = getIcon('Clock');
  const SlidersIcon = getIcon('Sliders');
  const XIcon = getIcon('X');

  // Initialize jobs data
  useEffect(() => {
    // Simulate API call
    const fetchJobs = () => {
      setLoading(true);
      setTimeout(() => {
        setJobs(jobsData);
        setLoading(false);
      }, 800);
    };

    fetchJobs();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = [...jobs];
    
    // Apply search term
    if (searchTerm) {
      result = result.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply job type filter
    if (filters.jobType.length > 0) {
      result = result.filter(job => filters.jobType.includes(job.type));
    }
    
    // Apply location filter
    if (filters.location.length > 0) {
      result = result.filter(job => filters.location.includes(job.location));
    }
    
    // Apply experience filter
    if (filters.experience.length > 0) {
      result = result.filter(job => filters.experience.includes(job.experience));
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'recent':
        // Assuming more recent jobs have lower indices in our mock data
        // In a real app, you would sort by date
        result = [...result].sort((a, b) => a.id - b.id);
        break;
      case 'salary-high':
        // Simple string comparison for mock data
        // In a real app, you would parse and compare actual numbers
        result = [...result].sort((a, b) => 
          (b.salary || '').localeCompare(a.salary || '')
        );
        break;
      case 'salary-low':
        result = [...result].sort((a, b) => 
          (a.salary || '').localeCompare(b.salary || '')
        );
        break;
      default:
        break;
    }
    
    setFilteredJobs(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [jobs, searchTerm, filters, sortBy]);

  // Get current jobs for pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Toggle filter
  const toggleFilter = (category, value) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      if (newFilters[category].includes(value)) {
        newFilters[category] = newFilters[category].filter(item => item !== value);
      } else {
        newFilters[category] = [...newFilters[category], value];
      }
      return newFilters;
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      jobType: [],
      location: [],
      experience: []
    });
    setSearchTerm('');
    setSortBy('recent');
  };

  // Apply for job
  const applyForJob = (job) => {
    toast.success(`Applied to ${job.title} at ${job.company}!`);
  };

  // Get available filter options from the data
  const jobTypes = [...new Set(jobs.map(job => job.type))];
  const locations = [...new Set(jobs.map(job => job.location))];
  const experiences = [...new Set(jobs.map(job => job.experience))];

  // Calculate active filters count
  const activeFiltersCount = 
    filters.jobType.length + 
    filters.location.length + 
    filters.experience.length + 
    (searchTerm ? 1 : 0);

  return (
    <div className="flex flex-col gap-8 pb-8">
      <Helmet>
        <title>{showAllOpportunities ? "All Opportunities" : "Find Jobs"} | CareerBridge</title>
        <meta name="description" content="Browse and search for job and internship opportunities that match your skills and interests on CareerBridge" />
      </Helmet>
      
      <section className="pt-4 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            {showAllOpportunities ? "All Career Opportunities" : "Find Your Perfect Opportunity"}
          </h1>
          <p className="text-lg text-surface-600 dark:text-surface-400 max-w-3xl">
            {showAllOpportunities 
              ? "Explore our complete catalog of jobs and internships. Filter by type, location, and experience level to find opportunities that match your career aspirations."
              : "Browse through our extensive list of job openings and internships. Use filters to narrow down your search and find the perfect match for your skills and career goals."
            }
          </p>
        </motion.div>
      </section>
      
      {!showAllOpportunities && (
        <MainFeature darkMode={darkMode} />
      )}
      
      {showAllOpportunities && (
        <section className="py-6">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters Sidebar */}
              <div className="lg:w-1/4">
                <div className="sticky top-24 bg-white dark:bg-surface-800 rounded-xl shadow-card p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <FilterIcon className="w-5 h-5 text-primary" />
                      <h2 className="font-semibold text-lg">Filters</h2>
                    </div>
                    {activeFiltersCount > 0 && (
                      <button 
                        onClick={clearFilters}
                        className="text-sm text-primary hover:text-primary-dark dark:hover:text-primary-light"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                  
                  {/* Search */}
                  <div className="mb-6">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search jobs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-900 py-2 pl-10 pr-4 focus:border-primary focus:ring-1 focus:ring-primary dark:focus:border-primary dark:focus:ring-primary"
                      />
                      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
                      {searchTerm && (
                        <button 
                          onClick={() => setSearchTerm('')}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-surface-400 hover:text-surface-600"
                        >
                          <XIcon className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Sort */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <SlidersIcon className="w-4 h-4" /> Sort by
                    </h3>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-900 py-2 px-3 focus:border-primary focus:ring-1 focus:ring-primary dark:focus:border-primary dark:focus:ring-primary"
                    >
                      <option value="recent">Most Recent</option>
                      <option value="salary-high">Highest Salary</option>
                      <option value="salary-low">Lowest Salary</option>
                    </select>
                  </div>
                  
                  {/* Job Type */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <BriefcaseIcon className="w-4 h-4" /> Job Type
                    </h3>
                    <div className="space-y-2">
                      {jobTypes.map(type => (
                        <div key={type} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`type-${type}`}
                            checked={filters.jobType.includes(type)}
                            onChange={() => toggleFilter('jobType', type)}
                            className="h-4 w-4 rounded border-surface-300 text-primary focus:ring-primary"
                          />
                          <label htmlFor={`type-${type}`} className="ml-2 text-sm text-surface-700 dark:text-surface-300">
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Location */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <MapPinIcon className="w-4 h-4" /> Location
                    </h3>
                    <div className="space-y-2">
                      {locations.map(location => (
                        <div key={location} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`location-${location}`}
                            checked={filters.location.includes(location)}
                            onChange={() => toggleFilter('location', location)}
                            className="h-4 w-4 rounded border-surface-300 text-primary focus:ring-primary"
                          />
                          <label htmlFor={`location-${location}`} className="ml-2 text-sm text-surface-700 dark:text-surface-300">
                            {location}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Experience */}
                  <div>
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <ClockIcon className="w-4 h-4" /> Experience
                    </h3>
                    <div className="space-y-2">
                      {experiences.map(exp => (
                        <div key={exp} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`exp-${exp}`}
                            checked={filters.experience.includes(exp)}
                            onChange={() => toggleFilter('experience', exp)}
                            className="h-4 w-4 rounded border-surface-300 text-primary focus:ring-primary"
                          />
                          <label htmlFor={`exp-${exp}`} className="ml-2 text-sm text-surface-700 dark:text-surface-300">
                            {exp}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Main Content */}
              <div className="lg:w-3/4">
                {loading ? (
                  // Loading state
                  <div className="flex flex-col items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    <p className="mt-4 text-surface-600 dark:text-surface-400">Loading opportunities...</p>
                  </div>
                ) : filteredJobs.length === 0 ? (
                  // Empty state
                  <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-8 text-center">
                    <div className="w-16 h-16 bg-surface-100 dark:bg-surface-700 rounded-full mx-auto flex items-center justify-center mb-4">
                      <SearchIcon className="h-8 w-8 text-surface-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No opportunities found</h3>
                    <p className="text-surface-600 dark:text-surface-400 mb-6">
                      Try adjusting your filters or search term to find more opportunities.
                    </p>
                    <button 
                      onClick={clearFilters}
                      className="btn-primary py-2 px-4"
                    >
                      Clear all filters
                    </button>
                  </div>
                ) : (
                  // Jobs list
                  <div className="space-y-6">
                    {/* Results info */}
                    <div className="flex items-center justify-between">
                      <p className="text-surface-600 dark:text-surface-400">
                        Showing <span className="font-medium">{indexOfFirstJob + 1}-{Math.min(indexOfLastJob, filteredJobs.length)}</span> of <span className="font-medium">{filteredJobs.length}</span> results
                      </p>
                    </div>
                    
                    {/* Job cards */}
                    {currentJobs.map((job) => (
                      <motion.div
                        key={job.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white dark:bg-surface-800 rounded-xl shadow-card overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-200"
                      >
                        <div className="p-6">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                            <div>
                              <h3 className="text-xl font-semibold mb-2 text-surface-900 dark:text-white">
                                {job.title}
                              </h3>
                              <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-surface-600 dark:text-surface-400">
                                <div className="flex items-center gap-1">
                                  <BuildingIcon className="h-4 w-4" />
                                  <span>{job.company}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPinIcon className="h-4 w-4" />
                                  <span>{job.location}</span>
                                </div>
                                {job.salary && (
                                  <div className="flex items-center gap-1">
                                    <DollarSignIcon className="h-4 w-4" />
                                    <span>{job.salary}</span>
                                  </div>
                                )}
                                <div className="flex items-center gap-1">
                                  <CalendarIcon className="h-4 w-4" />
                                  <span>{job.posted}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <span className="tag bg-primary/10 text-primary">
                                {job.type}
                              </span>
                              <span className="tag bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300">
                                {job.experience}
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-surface-700 dark:text-surface-300 mb-4">
                            {job.description}
                          </p>
                          
                          {job.responsibilities && (
                            <div className="mb-4">
                              <h4 className="font-medium mb-2">Key Responsibilities:</h4>
                              <ul className="list-disc pl-5 space-y-1 text-sm text-surface-700 dark:text-surface-300">
                                {job.responsibilities.slice(0, 2).map((item, i) => (
                                  <li key={i}>{item}</li>
                                ))}
                                {job.responsibilities.length > 2 && (
                                  <li>And {job.responsibilities.length - 2} more...</li>
                                )}
                              </ul>
                            </div>
                          )}
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {job.tags.map((tag, i) => (
                              <span 
                                key={i} 
                                className="tag bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-surface-200 dark:border-surface-700">
                            <button 
                              className="text-primary hover:text-primary-dark dark:hover:text-primary-light font-medium flex items-center gap-1"
                              onClick={() => applyForJob(job)}
                            >
                              Apply now
                              <ArrowRightIcon className="h-4 w-4" />
                            </button>
                            <button 
                              className="text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white text-sm"
                              onClick={() => toast.info(`Details for ${job.title} will open in a modal (coming soon)`)}
                            >
                              View details
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex justify-center mt-8">
                        <div className="flex gap-2">
                          {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                              key={index}
                              onClick={() => paginate(index + 1)}
                              className={`
                                w-10 h-10 rounded-lg flex items-center justify-center
                                ${currentPage === index + 1 
                                  ? 'bg-primary text-white' 
                                  : 'bg-white dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'}
                                transition-colors duration-200
                              `}
                            >
                              {index + 1}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Jobs;