// ProfileDataContext.js
import React, { createContext, useContext, useState } from "react";

// Define initial profile data
const initialProfileData = {
  username: "damienthedane",
  fullName: "Damien Dane",
  email: "damien@albany.edu",
  bio: "Frontend Developer",
  location: "New York, USA",
  followers: 0,
  following: 0,
  profilePic: "https://example.com/profile-pic.jpg",
};

const ProfileDataContext = createContext();

export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(initialProfileData);

  const updateProfileData = (newProfileData) => {
    console.log("Updating profile data:", newProfileData); // Log the new profile data
    setProfileData(newProfileData);
  };

  console.log("Current profile data:", profileData); // Log the current profile data

  return (
    <ProfileDataContext.Provider value={{ profileData, updateProfileData }}>
      {children}
    </ProfileDataContext.Provider>
  );
};

export const useProfileData = () => {
  const context = useContext(ProfileDataContext);
  if (context === undefined) {
    throw new Error("useProfileData must be used within a ProfileDataProvider");
  }
  return context;
};

export default ProfileDataContext;
