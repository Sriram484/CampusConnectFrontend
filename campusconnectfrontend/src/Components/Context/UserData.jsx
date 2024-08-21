import React, { createContext, useContext, useState } from 'react';

// Create a context for the form data
export const UserDataContext = createContext();

// Custom hook to use the form data context
export const useFormData = () => useContext(UserDataContext);

// Provider component
export const UserDataProvider = ({ children }) => {
  const [formData, setFormData] = useState(
    {
      userId: null,
      role: 'USER',
      userFirstName: '',
      userLastName: '',
      userHeadLine: '',
      userAboutYourself: '',
      userWebsite: '',
      userLinkedIn: '',
      userTwitter: '',
      userFaceBook: '',
      userYouTube: '',
      userProfileImage: '',
      userEmailId: '',
      userPassword: '',
      userMobileNumber: '',
      blockedUsers:[],
      reportedUsers:[],
      createdCourseIds:[],
      enrolledCourseIds:[],
      // profilePrivacySetting: [], // Initialize as empty array
      // profileNotificationEmail: [], // Initialize as empty array
      // enrolledCourseId: [], // Initialize as empty array
      // reviewId: [], // Initialize as empty array
      //  madeCourseId: [], // Initialize as empty array
      //  enquiryId: [], // Initialize as empty array
  });

  return (
    <UserDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </UserDataContext.Provider>
  );
};
