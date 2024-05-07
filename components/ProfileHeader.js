import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";
import { Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import EditProfile from "../screens/EditProfile";
import ProfileDataContext from "../contexts/ProfileDataContext";

const ProfileHeader = () => {
  const { profileData } = useContext(ProfileDataContext);

  // Add console.log to track profileData changes
  console.log("Profile Data (profile header):", profileData);
  const navigation = useNavigation();

  const handleEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  return (
    <>
      {/* header photo */}
      <View>
        <Image
          source={require("../assets/images/ualbany.jpeg")}
          resizeMode="cover"
          style={styles.headerPhoto}
        />
      </View>

      {/* profile info */}
      <View style={styles.profileInfoContainer}>
        {/* Profile image and details */}
        <View
          style={{
            flex: 1,
            alignItems: "left",
          }}
        >
          <Image
            source={require("../assets/images/damien.png")}
            resizeMode="cover"
            style={styles.profilePicture}
          />

          <Text style={styles.profileName}>{profileData.fullName}</Text>

          <Text style={styles.userName}>@{profileData.username}</Text>

          <Text style={styles.profileDesc}>{profileData.bio}</Text>

          <View style={styles.location}>
            <Ionicons name="location-outline" size={15} color="black" />
            <Text
              style={{
                fontWeight: "200",
                fontSize: 12,
                marginHorizontal: 5,
              }}
            >
              {profileData.location}
            </Text>
          </View>

          <View style={styles.followContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.followNum}>{profileData.followers}</Text>
              <Text>Followers</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 20,
              }}
            >
              <Text style={styles.followNum}>{profileData.following}</Text>
              <Text>Following</Text>
            </View>
          </View>
        </View>

        {/* Edit Profile Button */}
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Ionicons name="pencil-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerPhoto: {
    height: 125,
    width: "100%",
  },
  editButton: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 8,
  },
  profileInfoContainer: {
    flex: 1,
    alignItems: "left",
  },
  profilePicture: {
    height: 75,
    width: 75,
    borderRadius: 999,
    borderColor: "#36454F",
    borderWidth: 2,
    marginTop: -20,
  },
  profileName: {
    fontWeight: "600",
    marginVertical: 6,
    fontSize: 20,
    marginLeft: 10,
  },
  userName: {
    fontWeight: "200",
    marginVertical: -10,
    fontSize: 15,
    marginLeft: 10,
  },
  profileDesc: {
    fontWeight: "300",
    marginVertical: 20,
    fontSize: 15,
    marginLeft: 10,
  },
  location: {
    flexDirection: "row",
    marginVertical: -10,
    alignItems: "center",
    marginLeft: 10,
  },
  followContainer: {
    flexDirection: "row",
    alignItems: "left",
    marginHorzontal: 10,
    marginVertical: 20,
    marginLeft: 5,
  },
  followNum: {
    marginHorizontal: 5,
    fontWeight: "bold",
  },
});

export default ProfileHeader;
