import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  ProfileDataContext,
  useProfileData,
} from "../contexts/ProfileDataContext";

const EditProfile = () => {
  const navigation = useNavigation();
  // Import updateProfileData from ProfileDataContext
  const { profileData, updateProfileData } = useProfileData();

  // Define initial profile data
  const initialProfileData = {
    username: "damienthedane",
    fullName: "Damien Dane",
    email: "damien@albany.edu",
    bio: "Frontend Developer",
    location: "New York, USA",
    profilePic: "https://example.com/profile-pic.jpg",
  };

  // Initialize formData state with the initial profile data
  const [formData, setFormData] = useState(initialProfileData);

  // Use effect to update formData when profileData changes
  useEffect(() => {
    setFormData(profileData);
  }, [profileData]);

  // Function to handle changes to the profile data fields
  const handleChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  // Function to save the updated profile data
  const handleSave = () => {
    // Save the updated profile data by calling updateProfileData
    updateProfileData(formData); // Assuming formData contains the updated profile data

    console.log("Updated Profile Data (edit profile):", formData);
    // Navigate back to the previous screen
    navigation.goBack();
  };

  // List of profile fields with corresponding labels
  const profileFields = [
    { key: "username", label: "Username", placeholder: "Enter Username" },
    { key: "fullName", label: "Full Name", placeholder: "Enter Full Name" },
    { key: "email", label: "Email", placeholder: "Enter Email" },
    { key: "bio", label: "Bio", placeholder: "Enter Bio" },
    { key: "location", label: "Location", placeholder: "Enter Location" },
  ];

  // Render item for FlatList
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.label}>{item.label}</Text>
      <TextInput
        style={styles.input}
        value={formData[item.key]}
        onChangeText={(text) => handleChange(item.key, text)}
        placeholder={item.placeholder}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Edit Profile</Text>
      <FlatList
        data={profileFields}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fafafa",
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
});
