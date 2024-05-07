import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import Review from "../components/Review";

const FocusedReview = ({ route }) => {
  const { reviewId } = route.params;
  const [review, setReview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadReview = async () => {
      setIsLoading(true);
      const data = await fetchReviewDetails(reviewId);
      setReview(data);

      setIsLoading(false);
    };
    loadReview();
  }, [reviewId]);

  const fetchReviewDetails = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      id: 1,
      userId: 1,
      title: "Great experience!",
      body: "I had a wonderful time working with this company...",
      companyName: "Tech Innovations Inc.",
      zipCode: "10001",
      date: "2024-04-10T12:00:00Z",
      likes: 15,
      pictures: [
        "https://picsum.photos/200/200",
        "https://picsum.photos/200/200",
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

  if (!review) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Error</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Review review={review} />
    </ScrollView>
  );
};

export default FocusedReview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
