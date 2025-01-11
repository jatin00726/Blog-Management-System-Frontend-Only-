import React, { createContext, useContext, useState } from "react";

// Create a context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null); // User role (author/reader)
  const [blogs, setBlogs] = useState([]); // Blogs will be managed here

  return (
    <AppContext.Provider value={{ userRole, setUserRole, blogs, setBlogs }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access the context
export const useAppContext = () => useContext(AppContext);
