/**
 * Service for saved job data operations
 * Handles CRUD operations for the saved_job table
 */

/**
 * Save a job for a student
 * @param {Object} savedJobData - The data for saving a job
 * @returns {Promise<Object>} - The created saved job record
 */
export const saveJob = async (savedJobData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    // Prepare the record data
    const params = {
      records: [{
        Name: `Saved job ${savedJobData.jobId} for student ${savedJobData.studentId}`,
        job: savedJobData.jobId,
        student: savedJobData.studentId
      }]
    };

    const response = await apperClient.createRecord('saved_job', params);
    
    if (response && response.success && response.results && response.results.length > 0) {
      return response.results[0].data;
    }
    
    throw new Error('Failed to save job');
  } catch (error) {
    console.error('Error saving job:', error);
    throw error;
  }
};

/**
 * Get saved jobs for a specific student
 * @param {number} studentId - The student ID
 * @returns {Promise<Array>} - Array of saved job records
 */
export const getSavedJobs = async (studentId) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    const params = {
      where: [
        {
          fieldName: "student",
          operator: "ExactMatch",
          values: [studentId.toString()]
        }
      ],
      expands: [
        {
          name: "job",
          alias: "jobDetails"
        }
      ]
    };

    const response = await apperClient.fetchRecords('saved_job', params);
    
    if (response && response.data) {
      return response.data;
    }
    
    return [];
  } catch (error) {
    console.error(`Error fetching saved jobs for student ${studentId}:`, error);
    return [];
  }
};

/**
 * Unsave/remove a saved job
 * @param {number} savedJobId - The saved job record ID to remove
 * @returns {Promise<boolean>} - Success indicator
 */
export const unsaveJob = async (savedJobId) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    const params = {
      RecordIds: [savedJobId]
    };

    const response = await apperClient.deleteRecord('saved_job', params);
    
    if (response && response.success) {
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error removing saved job ${savedJobId}:`, error);
    return false;
  }
};