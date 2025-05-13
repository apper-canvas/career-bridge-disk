import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

function MainFeature({ darkMode }) {
  // Icon declarations
  const SearchIcon = getIcon('Search');
  const SlidersIcon = getIcon('Sliders');
  const XIcon = getIcon('X');
  const FilterIcon = getIcon('Filter');
  const MapPinIcon = getIcon('MapPin');
  const BriefcaseIcon = getIcon('Briefcase');
  const TagIcon = getIcon('Tag');
  const BookmarkIcon = getIcon('Bookmark');
  const BookmarkCheckIcon = getIcon('BookmarkCheck');
  
  const navigate = useNavigate();

  // State for job search
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [category, setCategory] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);

  // Mock job data
  const mockJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechSolutions Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      category: "Engineering",
      posted: "2 days ago",
      description: "We're looking for a skilled frontend developer with expertise in React and modern JavaScript frameworks."
    },
    {
      id: 2,
      title: "UX/UI Design Intern",
      company: "Creative Agency",
      location: "Remote",
      type: "Internship",
      category: "Design",
      posted: "1 week ago",
      description: "Join our design team to create stunning user interfaces and gain valuable industry experience."
    },
    {
      id: 3,
      title: "Data Analyst",
      company: "Analytics Pro",
      location: "New York, NY",
      type: "Full-time",
      category: "Data Science",
      posted: "3 days ago",
      description: "Help us transform data into actionable insights using Python, SQL, and visualization tools."
    },
    {
      id: 4,
      title: "Marketing Coordinator",
      company: "GrowthHackers",
      location: "Chicago, IL",
      type: "Part-time",
      category: "Marketing",
      posted: "5 days ago",
      description: "Support our marketing initiatives including social media, content creation, and campaign management."
    },
    {
      id: 5,
      title: "Software Engineering Intern",
      company: "StartupX",
      location: "Austin, TX",
      type: "Internship",
      category: "Engineering",
      posted: "1 day ago",
      description: "Gain hands-on experience building real products in a fast-paced startup environment."
    },
    {
      id: 6,
      title: "Product Manager",
      company: "InnovateCorp",
      location: "Seattle, WA",
      type: "Full-time",
      category: "Product",
      posted: "1 week ago",
      description: "Lead the development of innovative products from conception to launch."
    }
  ];

  // Job locations for the filter
  const locations = ["Remote", "San Francisco, CA", "New York, NY", "Chicago, IL", "Austin, TX", "Seattle, WA"];
  
  // Job types for the filter
  const jobTypes = ["Full-time", "Part-time", "Internship", "Contract"];
  
  // Job categories for the filter
  const categories = ["Engineering", "Design", "Data Science", "Marketing", "Product", "Business"];

  // Handle search
  const handleSearch = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const filteredResults = mockJobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              job.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesLocation = !location || job.location === location;
        const matchesType = !jobType || job.type === jobType;
        const matchesCategory = !category || job.category === category;
        
        return matchesSearch && matchesLocation && matchesType && matchesCategory;
      });
      
      setSearchResults(filteredResults);
      setLoading(false);
      
      if (filteredResults.length === 0) {
        toast.info("No jobs found. Try adjusting your search criteria.");
      } else {
        toast.success(`Found ${filteredResults.length} jobs matching your criteria`);
      }
    }, 800);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setLocation('');
    setJobType('');
    setCategory('');
    setSearchResults([]);
  };

  // Toggle job bookmark/save
  const toggleSaveJob = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
      toast.info("Job removed from saved list");
    } else {
      setSavedJobs([...savedJobs, jobId]);
      toast.success("Job saved to your list!");
    }
  };

  // Handle search on Enter key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(); 
    }
  };

  // Custom Neumorphic Design for Search Bar based on dark mode
  const searchBarClasses = darkMode 
    ? "bg-surface-800 shadow-neu-dark border border-surface-700"
    : "bg-white shadow-neu-light border border-surface-200";

  return (
    <div className="max-w-5xl mx-auto px-4">
      {/* Search Section with Neumorphic Design */}
      <div className={`${searchBarClasses} rounded-2xl p-4 md:p-6 mb-8 transition-all duration-300`}>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Main Search Input */}
          <div className="relative flex-grow">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500 h-5 w-5" />
            <input
              type="text"
              placeholder="Job title, company, or keywords"
              className="input-field pl-10 w-full bg-surface-50 dark:bg-surface-700 border-surface-200 dark:border-surface-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          
          {/* Search Button */}
          <button 
            className="btn-primary flex items-center justify-center gap-2"
            onClick={handleSearch}
          >
            <SearchIcon className="h-5 w-5" />
            <span>Search</span>
          </button>
          
          {/* Filters Toggle Button (Mobile) */}
          <button 
            className="md:hidden btn flex items-center justify-center gap-2 bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersIcon className="h-5 w-5" />
            <span>{showFilters ? "Hide Filters" : "Show Filters"}</span>
          </button>
          
          {/* Filters Toggle Button (Desktop) */}
          <button 
            className="hidden md:flex btn items-center justify-center gap-2 bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FilterIcon className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>
        
        {/* Expandable Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-surface-200 dark:border-surface-700 grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-surface-700 dark:text-surface-300">
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="h-4 w-4" />
                      <span>Location</span>
                    </div>
                  </label>
                  <select 
                    className="input-field"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option value="">Any Location</option>
                    {locations.map((loc, index) => (
                      <option key={index} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
                
                {/* Job Type Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-surface-700 dark:text-surface-300">
                    <div className="flex items-center gap-2">
                      <BriefcaseIcon className="h-4 w-4" />
                      <span>Job Type</span>
                    </div>
                  </label>
                  <select 
                    className="input-field"
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                  >
                    <option value="">Any Type</option>
                    {jobTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-surface-700 dark:text-surface-300">
                    <div className="flex items-center gap-2">
                      <TagIcon className="h-4 w-4" />
                      <span>Category</span>
                    </div>
                  </label>
                  <select 
                    className="input-field"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Any Category</option>
                    {categories.map((cat, index) => (
                      <option key={index} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <button 
                  className="text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white flex items-center gap-1 text-sm"
                  onClick={clearFilters}
                >
                  <XIcon className="h-4 w-4" />
                  Clear all filters
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Search Results */}
      <div className="space-y-6">
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : searchResults.length > 0 ? (
          <>
            <h3 className="text-xl font-medium mb-4">
              {searchResults.length} {searchResults.length === 1 ? 'Result' : 'Results'} Found
            </h3>
            
            {searchResults.map((job) => (
              <motion.div 
                key={job.id}
                className="card hover:shadow-soft transition-all duration-200 group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-surface-600 dark:text-surface-400">
                        {job.company}
                      </p>
                    </div>
                    <button 
                      onClick={() => toggleSaveJob(job.id)}
                      className="text-surface-400 hover:text-primary transition-colors"
                      aria-label={savedJobs.includes(job.id) ? "Unsave job" : "Save job"}
                    >
                      {savedJobs.includes(job.id) ? (
                        <BookmarkCheckIcon className="h-6 w-6 text-primary" />
                      ) : (
                        <BookmarkIcon className="h-6 w-6" />
                      )}
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="tag bg-primary/10 text-primary">
                      {job.type}
                    </span>
                    <span className="tag bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300">
                      {job.category}
                    </span>
                    <span className="tag bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 flex items-center gap-1">
                      <MapPinIcon className="h-3 w-3" />
                      {job.location}
                    </span>
                  </div>
                  
                  <p className="text-surface-700 dark:text-surface-300 mb-4">
                    {job.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-surface-200 dark:border-surface-700">
                    <span className="text-sm text-surface-500 dark:text-surface-400">
                      Posted {job.posted}
                    </span>
                    <button 
                      className="btn-primary text-sm px-4 py-1.5"
                      onClick={() => toast.success(`Applied to ${job.title} at ${job.company}!`)}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </>
        ) : (
          searchTerm || location || jobType || category ? (
            <div className="py-12 text-center">
              <div className="flex justify-center mb-4">
                <SearchIcon className="h-12 w-12 text-surface-400" />
              </div>
              <h3 className="text-xl font-medium mb-2">No results found</h3>
              <p className="text-surface-500 dark:text-surface-400 max-w-md mx-auto">
                Try adjusting your search or filter criteria to find more opportunities.
              </p>
              <button 
                className="mt-4 btn-outline"
                onClick={clearFilters}
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="py-12 text-center">
              <div className="flex justify-center mb-4">
                <SearchIcon className="h-12 w-12 text-surface-400" />
              </div>
              <h3 className="text-xl font-medium mb-2">Start your job search</h3>
              <p className="text-surface-500 dark:text-surface-400 max-w-md mx-auto">
                Enter a job title, skill, or company name to find the perfect opportunity.
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default MainFeature;