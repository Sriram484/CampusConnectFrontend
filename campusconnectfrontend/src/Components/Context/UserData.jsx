import React, { createContext, useContext, useState } from 'react';

// Create a context for the form data
export const UserDataContext = createContext();

// Custom hook to use the form data context
export const useFormData = () => useContext(UserDataContext);

// Provider component
export const UserDataProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobileNumber: '',
    courseId: [],
    enquiryId: [],
    type: 'student',
  });

  return (
    <UserDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </UserDataContext.Provider>
  );
};
