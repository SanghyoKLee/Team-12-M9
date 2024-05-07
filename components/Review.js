import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const Review = ({ review, onPress, onBookmark }) => {
  const [showFullBody, setShowFullBody] = useState(false);
  const [likes, setLikes] = useState(review.likes);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const MAX_BODY_LENGTH = 250;

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(review.date));

  const bodyContent = showFullBody
    ? review.body
    : review.body.substring(0, MAX_BODY_LENGTH) + "...";

  const handleLike = () => {
    setLikes(likes + (liked ? -1 : 1));
    setLiked(!liked);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    onBookmark({ ...review, bookmarked: !bookmarked });
  };

  return (
    <Pressable onPress={onPress}>
      <View style={styles.reviewContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{review.title}</Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
        <Text style={styles.companyName}>{review.companyName}</Text>
        <Text style={styles.author}>
          {review.firstName} {review.lastName} - Zip Code: {review.zipCode}
        </Text>
        <Text style={styles.body}>{bodyContent}</Text>
        {!showFullBody && review.body.length > MAX_BODY_LENGTH && (
          <Pressable onPress={() => setShowFullBody(true)}>
            <Text style={styles.seeMore}>See more</Text>
          </Pressable>
        )}
        <ScrollView horizontal={true} style={styles.picturesContainer}>
          {(review.pictures || []).map((picture, index) => (
            <Image
              key={index}
              source={{ uri: picture }}
              style={styles.picture}
            />
          ))}
        </ScrollView>
        <View style={styles.likesContainer}>
          <Pressable onPress={handleLike} style={styles.likeButton}>
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={24}
              color={liked ? "red" : "black"}
            />
          </Pressable>
          <Text style={styles.likeCount}>{likes}</Text>
          <Pressable onPress={handleBookmark} style={styles.actionButton}>
            <Ionicons
              name={bookmarked ? "bookmark" : "bookmark-outline"}
              size={24}
              color={bookmarked ? "black" : "black"}
            />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  reviewContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.9,
    shadowRadius: 3.84,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#333333",
  },
  date: {
    fontSize: 14,
    color: "#999999",
  },
  companyName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
    color: "#007BFF",
  },
  author: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 10,
  },
  body: {
    fontSize: 15,
    color: "#444444",
  },
  seeMore: {
    color: "#007BFF",
    fontSize: 13,
    marginTop: 4,
    fontWeight: "bold",
  },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  likeButton: {
    marginRight: 4,
  },
  likeCount: {
    fontSize: 16,
    marginBottom: 1,
  },
  bookmark: {
    marginRight: 10,
  },
  picturesContainer: {},
  picture: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 13,
  },
});

export default Review;
