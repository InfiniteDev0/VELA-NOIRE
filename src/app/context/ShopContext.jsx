"use client";
import React, { createContext } from "react";

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const value = {};
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopProvider;


// season products in hero , 
// Best seeling this season .
// theming the whole website based on the season 
// location determining of the user , this helps in pricing and shipping calculation or even the language of the website 