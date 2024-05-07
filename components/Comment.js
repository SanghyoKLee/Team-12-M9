// Comment.js
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Comment = ({ comment }) => {
  return (
    <View style={styles.commentContainer}>
      {comment.profilePicture && (
        <Image
          source={{ uri: comment.profilePicture }}
          style={styles.profileImage}
        />
      )}
      <Text style={styles.commentText}>
        <Text style={styles.userName}>{comment.userName}: </Text>
        {comment.comment}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  profileImage: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    marginRight: 7,
  },
  userName: {
    fontWeight: "bold",
  },
  commentText: {
    fontSize: 14,
    color: "#333",
    paddingRight: 35,
    lineHeight: 20,
  },
});

export default Comment;
