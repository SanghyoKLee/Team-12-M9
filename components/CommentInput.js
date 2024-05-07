import React, { useState } from "react";
import { View, TextInput, Image, StyleSheet } from "react-native";
import CustomButton from "./CustomButton";

const CommentInput = ({ profilePicture, onCommentPosted }) => {
  const [commentText, setCommentText] = useState("");
  const [inputHeight, setInputHeight] = useState(35);

  const handlePostComment = () => {
    if (commentText.trim()) {
      onCommentPosted(commentText);
      setCommentText("");
      setInputHeight(35);
    }
  };

  const updateSize = (height) => {
    setInputHeight(Math.max(35, height));
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
      <TextInput
        style={[styles.input, { height: inputHeight }]}
        value={commentText}
        onChangeText={setCommentText}
        placeholder="Write a comment..."
        multiline={true}
        textAlignVertical="top"
        onContentSizeChange={(event) =>
          updateSize(event.nativeEvent.contentSize.height)
        }
      />
      {commentText && (
        <CustomButton
          text="Post"
          onPress={handlePostComment}
          type="PRIMARY"
          width={60}
          height={35}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 5,
  },
  profilePicture: {
    width: 35,
    height: 35,
    borderRadius: 17,
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    marginRight: 7,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingTop: 7,
    paddingBottom: 7,
    minHeight: 10,
  },
});

export default CommentInput;
