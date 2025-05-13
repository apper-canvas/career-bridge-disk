/**
 * Service for job application data operations
 * Handles CRUD operations for the job_application table
 */

/**
 * Create a job application
 * @param {Object} applicationData - The application data
 * @returns {Promise<Object>} - The created application record
 */
export const createJobApplication = async (applicationData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    // Prepare the record data
    const params = {
      records: [{
        Name: `Application for ${applicationData.jobTitle}`,
        job: applicationData.jobId,
        student: applicationData.studentId,
        status: applicationData.status || 'applied'
      }]
    };

    const response = await apperClient.createRecord('job_application', params);
    
    if (response && response.success && response.results && response.results.length > 0) {
      return response.results[0].data;
    }
    
    throw new Error('Failed to create job application');
  } catch (error) {
    console.error('Error creating job application:', error);
    throw error;
  }
};

/**
 * Get applications for a specific student
 * @param {number} studentId - The student ID
 * @returns {Promise<Array>} - Array of job application records
 */
export const getStudentApplications = async (studentId) => {
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

    const response = await apperClient.fetchRecords('job_application', params);
    
    if (response && response.data) {
      return response.data;
    }
    
    return [];
  } catch (error) {
    console.error(`Error fetching applications for student ${studentId}:`, error);
    return [];
  }
};

/**
 * Update a job application status
 * @param {number} applicationId - The application ID
 * @param {string} status - The new status
 * @returns {Promise<Object>} - The updated application record
 */
export const updateApplicationStatus = async (applicationId, status) => {
  try {
    // Implementation for updating application status
    // Would use apperClient.updateRecord
    throw new Error('Not implemented yet');
  } catch (error) {
    console.error(`Error updating application ${applicationId} status:`, error);
    throw error;
  }
};