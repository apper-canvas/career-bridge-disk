/**
 * Service for job-related data operations
 * Handles CRUD operations for the job table
 */

/**
 * Create a new job listing
 * @param {Object} jobData - The job data to create
 * @returns {Promise<Object>} - The created job record
 */
export const createJob = async (jobData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    // Prepare the record data
    const params = {
      records: [{
        Name: jobData.title,
        title: jobData.title,
        company: jobData.company,
        location: jobData.location,
        type: jobData.type,
        salary: jobData.salary,
        experience: jobData.experience,
        posted: jobData.posted || new Date().toISOString().split('T')[0],
        description: jobData.description,
        responsibilities: jobData.responsibilities,
        requirements: jobData.requirements,
        Tags: jobData.tags?.join(',')
      }]
    };

    const response = await apperClient.createRecord('job', params);
    
    if (response && response.success && response.results && response.results.length > 0) {
      return response.results[0].data;
    }
    
    throw new Error('Failed to create job record');
  } catch (error) {
    console.error('Error creating job:', error);
    throw error;
  }
};

/**
 * Get a job by ID
 * @param {number} jobId - The ID of the job to retrieve
 * @returns {Promise<Object>} - The job record
 */
export const getJobById = async (jobId) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    const response = await apperClient.getRecordById('job', jobId);
    
    if (response && response.data) {
      // Parse tags from comma-separated string to array
      const job = response.data;
      if (job.Tags) {
        job.tags = job.Tags.split(',');
      } else {
        job.tags = [];
      }
      
      // Parse responsibilities and requirements if they're stored as strings
      if (job.responsibilities && typeof job.responsibilities === 'string') {
        try {
          job.responsibilities = JSON.parse(job.responsibilities);
        } catch (e) {
          job.responsibilities = job.responsibilities.split('\n').filter(Boolean);
        }
      }
      
      if (job.requirements && typeof job.requirements === 'string') {
        try {
          job.requirements = JSON.parse(job.requirements);
        } catch (e) {
          job.requirements = job.requirements.split('\n').filter(Boolean);
        }
      }
      
      return job;
    }
    
    throw new Error('Job not found');
  } catch (error) {
    console.error(`Error fetching job with ID ${jobId}:`, error);
    throw error;
  }
};

/**
 * Get all jobs with optional filtering
 * @param {Object} filters - Optional filters to apply
 * @returns {Promise<Array>} - Array of job records
 */
export const getJobs = async (filters = {}) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    // Prepare query parameters
    const params = {
      fields: ["Id", "Name", "title", "company", "location", "type", "salary", "experience", "posted", "description", "Tags"],
      pagingInfo: {
        limit: filters.limit || 50,
        offset: filters.offset || 0
      }
    };
    
    // Add where conditions based on filters
    if (filters.type || filters.location || filters.experience) {
      params.where = [];
      
      if (filters.type) {
        params.where.push({
          fieldName: "type",
          operator: "ExactMatch",
          values: Array.isArray(filters.type) ? filters.type : [filters.type]
        });
      }
      
      if (filters.location) {
        params.where.push({
          fieldName: "location",
          operator: "ExactMatch",
          values: Array.isArray(filters.location) ? filters.location : [filters.location]
        });
      }
      
      if (filters.experience) {
        params.where.push({
          fieldName: "experience",
          operator: "ExactMatch",
          values: Array.isArray(filters.experience) ? filters.experience : [filters.experience]
        });
      }
    }

    const response = await apperClient.fetchRecords('job', params);
    
    if (response && response.data) {
      // Process each job to add tags array from Tags string
      return response.data.map(job => ({
        ...job,
        tags: job.Tags ? job.Tags.split(',') : [],
        id: job.Id // Ensure id field for compatibility with existing code
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
};