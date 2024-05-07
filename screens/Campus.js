import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBookBookmark } from "@fortawesome/free-solid-svg-icons";
import Post from "../components/Post";
import { useNavigation } from "@react-navigation/native";

const Campus = () => {
  const [posts, setPosts] = useState([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchPosts();
  }, []);

  // Fetch posts from the server based on followed user IDs
  const fetchPosts = async () => {
    const followedUserIds = await fetchFollowedUserIds();
    const postsForFollowedUsers = await fetchPostsForFollowedUsers(
      followedUserIds
    );
    setPosts(postsForFollowedUsers);
  };

  const fetchFollowedUserIds = async () => {
    // Fetching followed user IDs from a server
    return [1, 3];
  };

  const fetchAndSetBookmarkedPosts = (post) => {
    if (post.bookmarked) {
      setBookmarkedPosts([...bookmarkedPosts, post]);
    } else {
      setBookmarkedPosts(bookmarkedPosts.filter((p) => p.id !== post.id));
    }
  };

  const fetchPostsForFollowedUsers = async (followedUserIds) => {
    const allPosts = [
      {
        id: 1,
        userId: 1,
        title: "Exciting Event",
        body: "Join us for an exciting event on this Friday!",
        likes: 0,
        pictures: [
          "https://picsum.photos/200/263",
          "https://picsum.photos/200/153",
        ],
      },
      {
        id: 2,
        userId: 3,
        title: "Study Group Session",
        body: "Looking for study buddies for the upcoming exams. Anyone interested?",
        likes: 8,
        pictures: [],
      },
    ];

    return allPosts;
  };

  const navigateToFocusedPost = (postId) => {
    navigation.navigate("FocusedPost", { postId });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("Archive", {
            bookmarkedPosts: bookmarkedPosts.map((post) => ({
              ...post,
              type: "post",
            })),
          })
        }
      >
        <FontAwesomeIcon icon={faBookBookmark} size={24} color="black" />
      </TouchableOpacity>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <Post
            post={item}
            onPress={() => navigateToFocusedPost(item.id)}
            onBookmark={fetchAndSetBookmarkedPosts}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.postsContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
    padding: 10,
  },
  postsContainer: {
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default Campus;
