import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import CustomButton from "./CustomButton";
import * as ImagePicker from "expo-image-picker";
import { useUser } from "../contexts/UserContext";

const CreatePost = ({ toggleFormType }) => {
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [postText, setPostText] = useState("");
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

  const handleCreatePost = () => {
    console.log({
      userId,
      title,
      images,
      postText,
    });
    // POST post data to server
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Create Post</Text>
        <Pressable onPress={toggleFormType}>
          <Text style={styles.switchText}>Switch to Review</Text>
        </Pressable>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.multilineInput}
        placeholder="Post Content"
        value={postText}
        onChangeText={setPostText}
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
        text="Upload Post"
        onPress={handleCreatePost}
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

export default CreatePost;
