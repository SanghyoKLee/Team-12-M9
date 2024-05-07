import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  StatusBar,
} from "react-native";
import Post from "../components/Post";

const FocusedPost = ({ route }) => {
  const { postId } = route.params;
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      setIsLoading(true);
      const data = await fetchPostDetails(postId);
      setPost(data);
      setIsLoading(false);
    };
    loadPost();
  }, [postId]);

  const fetchPostDetails = async () => {
    // Mock data
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      id: 1,
      userId: 1,
      title: "Exciting Event",
      body: "Join us for an exciting event this Friday!",
      likes: 10,
      pictures: [
        "https://picsum.photos/200/300",
        "https://picsum.photos/200/300",
      ],
      comments: [
        {
          id: 1,
          userId: 2,
          userName: "Alice Johnson",
          profilePicture: "https://picsum.photos/50/50",
          timestamp: "2024-02-12T10:00:00Z",
          comment: "Can't wait!",
        },
        {
          id: 2,
          userId: 3,
          userName: "Bob Smith",
          profilePicture: "https://picsum.photos/50/50",
          timestamp: "2024-04-12T11:00:00Z",
          comment: "Sounds fun!",
        },
      ],
    };
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!post) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Error</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Post post={post} />
    </ScrollView>
  );
};

export default FocusedPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
