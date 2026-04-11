"use client";
import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [bannerActive , setActiveBanner] = useState(true);
  const value = {
    // UI
    bannerActive , 
    setActiveBanner
    
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
