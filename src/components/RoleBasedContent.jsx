import React from "react";
import { useAppContext } from "../context/AppContext";


const RoleBasedContent = ({ authorContent, readerContent }) => {
  const { userRole } = useAppContext();

  return userRole === "author" ? authorContent : readerContent;
};

export default RoleBasedContent;
