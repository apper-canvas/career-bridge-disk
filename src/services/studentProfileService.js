/**
 * Service for student profile-related data operations
 * Handles CRUD operations for the student_profile table
 */

/**
 * Create a student profile
 * @param {Object} profileData - The profile data to create
 * @returns {Promise<Object>} - The created profile record
 */
export const createStudentProfile = async (profileData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    // Prepare the record data
    const params = {
      records: [{
        Name: `${profileData.firstName} ${profileData.lastName}`,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        university: profileData.university
      }]
    };

    const response = await apperClient.createRecord('student_profile', params);
    
    if (response && response.success && response.results && response.results.length > 0) {
      return response.results[0].data;
    }
    
    throw new Error('Failed to create student profile');
  } catch (error) {
    console.error('Error creating student profile:', error);
    throw error;
  }
};

/**
 * Get a student profile by user ID
 * @param {string} userId - The user ID associated with the profile
 * @returns {Promise<Object>} - The student profile record
 */
export const getStudentProfileByUserId = async (userId) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    // Search for profile by Owner field which maps to user ID
    const params = {
      where: [
        {
          fieldName: "Owner",
          operator: "ExactMatch",
          values: [userId]
        }
      ]
    };

    const response = await apperClient.fetchRecords('student_profile', params);
    
    if (response && response.data && response.data.length > 0) {
      return response.data[0];
    }
    
    return null; // No profile found for this user
  } catch (error) {
    console.error(`Error fetching student profile for user ${userId}:`, error);
    return null;
  }
};

/**
 * Update a student profile
 * @param {number} profileId - The ID of the profile to update
 * @param {Object} profileData - The updated profile data
 * @returns {Promise<Object>} - The updated profile record
 */
export const updateStudentProfile = async (profileId, profileData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    // Implementation similar to createStudentProfile but with update logic
    // Would use apperClient.updateRecord with the ID
    throw new Error('Not implemented yet');
  } catch (error) {
    console.error(`Error updating student profile with ID ${profileId}:`, error);
    throw error;
  }
};