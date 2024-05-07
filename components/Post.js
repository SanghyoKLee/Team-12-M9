import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import { useNavigation } from "@react-navigation/native";

const Post = ({ post, onPress, onBookmark }) => {
  const [showFullBody, setShowFullBody] = useState(false);
  const [showFullComments, setShowFullComments] = useState(false);
  const [liked, setLiked] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [userName, setUserName] = useState("");
  const [comments, setComments] = useState([]);
  const navigation = useNavigation();
  const [bookmarked, setBookmarked] = useState(false);
  const MAX_BODY_LENGTH = 250;

  useEffect(() => {
    const fetchProfilePicture = async () => {
      const { pictureUrl, name } = await fetchUserProfileDetails(post.userId);
      setProfilePicture(pictureUrl);
      setUserName(name);
    };

    const fetchComments = async () => {
      const commentsData = await fetchCommentsForPost(post.id);
      setComments(commentsData);
    };

    fetchProfilePicture();
    fetchComments();
  }, [post.userId, post.id]);

  const fetchUserProfileDetails = async (userId) => {
    const userDetails = {
      name: "First Last",
      pictureUrl: "https://picsum.photos/200/263",
    };
    return userDetails;
  };

  const fetchCommentsForPost = async (postId) => {
    // Fetch comments from server
    const commentsData = [
      {
        id: 1,
        userId: 2,
        userName: "Alice Johnson",
        profilePicture: "https://picsum.photos/50/50",
        timestamp: "2024-02-12T10:00:00Z",
        comment: "I'll be there",
      },
      {
        id: 2,
        userId: 3,
        userName: "Bob Smith",
        profilePicture: "https://picsum.photos/50/50",
        timestamp: "2024-04-12T11:00:00Z",
        comment: "Same time?",
      },
    ];
    return commentsData.sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );
  };

  const handleLike = () => {
    if (liked) {
      post.likes -= 1;
    } else {
      post.likes += 1;
    }
    setLiked(!liked);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    onBookmark({ ...post, bookmarked: !bookmarked });
  };

  const renderComments = () => {
    const commentsToShow = showFullComments ? comments : comments.slice(0, 2);
    return commentsToShow.map((commentObj) => (
      <Comment key={commentObj.id} comment={commentObj} />
    ));
  };

  const bodyContent = showFullBody
    ? post.body
    : post.body.length > MAX_BODY_LENGTH
    ? post.body.substring(0, MAX_BODY_LENGTH) + "..."
    : post.body;

  const addCommentToPost = (commentText) => {
    // POST to server

    const newComment = {
      // Temp data
      id: comments.length + 1,
      userId: post.userId,
      userName: userName,
      profilePicture: profilePicture,
      comment: commentText,
      timestamp: new Date().toISOString(),
    };
    setComments([...comments, newComment]); // Update comments list
  };

  return (
    <Pressable onPress={onPress}>
      <View style={styles.postContainer}>
        <View style={styles.userContainer}>
          {profilePicture && (
            <Image
              source={{ uri: profilePicture }}
              style={styles.profilePicture}
            />
          )}
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <Text style={styles.title}>{post.title}</Text>
        <ScrollView horizontal={true} style={styles.picturesContainer}>
          {(post.pictures || []).map((picture, index) => (
            <Image
              key={index}
              source={{ uri: picture }}
              style={styles.picture}
            />
          ))}
        </ScrollView>
        <Text style={styles.body}>{bodyContent}</Text>
        {!showFullBody && post.body.length > MAX_BODY_LENGTH && (
          <Pressable onPress={() => setShowFullBody(true)}>
            <Text style={styles.seeMore}>See more</Text>
          </Pressable>
        )}
        <View style={styles.likesContainer}>
          <Pressable onPress={handleLike} style={styles.likeButton}>
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={24}
              color={liked ? "red" : "black"}
            />
          </Pressable>
          <Text style={styles.likeCount}>{post.likes}</Text>
          <Pressable onPress={handleBookmark} style={styles.actionButton}>
            <Ionicons
              name={bookmarked ? "bookmark" : "bookmark-outline"}
              size={24}
              color={bookmarked ? "black" : "black"}
            />
          </Pressable>
        </View>
        <View style={styles.commentsContainer}>
          {renderComments()}
          {comments.length > 2 && !showFullComments && (
            <Pressable onPress={() => setShowFullComments(true)}>
              <Text style={styles.loadMoreComments}>Load more comments</Text>
            </Pressable>
          )}
        </View>
        <CommentInput
          profilePicture={profilePicture}
          onCommentPosted={addCommentToPost}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  body: {
    fontSize: 15,
    color: "#444",
    marginBottom: 7,
  },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  likeButton: {
    marginRight: 5,
    marginBottom: 3,
  },
  likeCount: {
    fontSize: 16,
  },
  bookmark: {
    marginRight: 10,
    padding: 10,
  },
  picturesContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  picture: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
  },
  seeMore: {
    color: "#007BFF",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
  commentsSection: {
    marginTop: 10,
  },
  loadMoreComments: {
    color: "#007BFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Post;
