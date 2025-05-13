/**
 * Service for employer-related data operations
 * Handles CRUD operations for the employer table
 */

/**
 * Create a new employer record
 * @param {Object} employerData - The employer data to create
 * @returns {Promise<Object>} - The created employer record
 */
export const createEmployer = async (employerData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    // Prepare the record data
    const params = {
      records: [{
        Name: employerData.companyName,
        companyName: employerData.companyName,
        industry: employerData.industry,
        size: employerData.size,
        contactName: employerData.contactName,
        contactEmail: employerData.contactEmail,
        contactPhone: employerData.contactPhone,
        website: employerData.website,
        description: employerData.description
      }]
    };

    const response = await apperClient.createRecord('employer', params);
    
    if (response && response.success && response.results && response.results.length > 0) {
      return response.results[0].data;
    }
    
    throw new Error('Failed to create employer record');
  } catch (error) {
    console.error('Error creating employer:', error);
    throw error;
  }
};

/**
 * Get an employer by ID
 * @param {number} employerId - The ID of the employer to retrieve
 * @returns {Promise<Object>} - The employer record
 */
export const getEmployerById = async (employerId) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    const response = await apperClient.getRecordById('employer', employerId);
    
    if (response && response.data) {
      return response.data;
    }
    
    throw new Error('Employer not found');
  } catch (error) {
    console.error(`Error fetching employer with ID ${employerId}:`, error);
    throw error;
  }
};

/**
 * Get all employers
 * @param {Object} filters - Optional filters to apply
 * @returns {Promise<Array>} - Array of employer records
 */
export const getEmployers = async (filters = {}) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    // Prepare parameters with filtering
    const params = {
      fields: ["Id", "Name", "companyName", "industry", "size", "contactName", "contactEmail", "website", "description"],
      pagingInfo: {
        limit: filters.limit || 50,
        offset: filters.offset || 0
      }
    };

    // Add filtering conditions if provided
    if (filters.industry) {
      params.where = [
        {
          fieldName: "industry",
          operator: "ExactMatch",
          values: [filters.industry]
        }
      ];
    }

    const response = await apperClient.fetchRecords('employer', params);
    
    if (response && response.data) {
      return response.data;
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching employers:', error);
    return [];
  }
};

/**
 * Update an employer record
 * @param {number} employerId - The ID of the employer to update
 * @param {Object} employerData - The updated employer data
 * @returns {Promise<Object>} - The updated employer record
 */
export const updateEmployer = async (employerId, employerData) => {
  try {
    // Implementation similar to createEmployer but with update logic
    // Would use apperClient.updateRecord with the ID
    throw new Error('Not implemented');
  } catch (error) {
    console.error(`Error updating employer with ID ${employerId}:`, error);
    throw error;
  }
};