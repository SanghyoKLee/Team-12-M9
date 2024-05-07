import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Platform,
} from "react-native";
import CustomButton from "./CustomButton";
import * as ImagePicker from "expo-image-picker";
import { useUser } from "../contexts/UserContext";

const CreateReview = ({ toggleFormType }) => {
  const [title, setTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [images, setImages] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const { userId } = useUser();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Camera roll permissions are required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImages([...images, result.uri]);
    }
  };

  const handleCreateReview = () => {
    console.log({
      userId,
      companyName,
      zipCode,
      images,
      reviewText,
    });
    // POST review data to server
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Create Review</Text>
        <Pressable onPress={toggleFormType}>
          <Text style={styles.switchText}>Switch to Post</Text>
        </Pressable>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <View style={styles.inputGroup}>
        <TextInput
          style={[styles.input, { flex: 5 }]}
          placeholder="Company Name"
          value={companyName}
          onChangeText={setCompanyName}
        />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Zip Code"
          keyboardType="numeric"
          value={zipCode}
          onChangeText={setZipCode}
        />
      </View>
      <TextInput
        style={styles.multilineInput}
        placeholder="Review"
        value={reviewText}
        onChangeText={setReviewText}
        multiline
        numberOfLines={4}
      />
      <CustomButton text="Add Images" onPress={pickImage} type="SECONDARY" />
      <View style={styles.imagePreviewContainer}>
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={styles.imagePreview}
          />
        ))}
      </View>
      <CustomButton
        text="Upload Review"
        onPress={handleCreateReview}
        type="PRIMARY"
        marginTop={10}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  switchText: {
    fontSize: 16,
    color: "#007BFF",
    fontWeight: "bold",
  },
  inputGroup: {
    flexDirection: "row",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 5,
  },
  multilineInput: {
    height: 200,
    textAlignVertical: "top",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
  },
  imagePreviewContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
});

export default CreateReview;
