import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBookBookmark } from "@fortawesome/free-solid-svg-icons";
import { Picker } from "@react-native-picker/picker";
import Review from "../components/Review";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [radius, setRadius] = useState(5);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [bookmarked, setBookmarked] = useState(false);
  const navigation = useNavigation();

  const userZipCode = "12345";

  useEffect(() => {
    fetchReviews(userZipCode, radius).then(setReviews);
  }, [radius, userZipCode]);

  const fetchAndSetBookmarkedPosts = (post) => {
    if (post.bookmarked) {
      setBookmarkedPosts([...bookmarkedPosts, post]);
    } else {
      setBookmarkedPosts(bookmarkedPosts.filter((p) => p.id !== post.id));
    }
  };

  const fetchReviews = async (userZipCode, radius) => {
    // Sample data
    const reviews = [
      {
        id: 1,
        userId: 1,
        firstName: "John",
        lastName: "Doe",
        date: "2024-04-10T12:00:00Z",
        zipCode: "10001",
        companyName: "Tech Innovations Inc.",
        title: "Great experience!",
        body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione laborum nesciunt omnis culpa ipsam non at, sint, quas veniam vel nam in et aliquid assumenda earum fugit quod tempora temporibus.",
        pictures: [
          "https://picsum.photos/200/300",
          "https://picsum.photos/200/200",
        ],
      },
      {
        id: 2,
        userId: 2,
        firstName: "Bob",
        lastName: "Ross",
        date: "2024-03-10T12:01:00Z",
        zipCode: "10001",
        companyName: "The Best Company",
        title: "Top 10 Tips",
        body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione laborum nesciunt omnis culpa ipsam non at, sint, quas veniam vel nam in et aliquid assumenda earum fugit quod tempora temporibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione laborum nesciunt omnis culpa ipsam non at, sint, quas veniam vel nam in et aliquid assumenda earum fugit quod tempora temporibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione laborum nesciunt omnis culpa ipsam non at, sint, quas veniam vel nam in et aliquid assumenda earum fugit quod tempora temporibus.",
        pictures: [],
        likes: 3,
      },
      {
        id: 3,
        userId: 2,
        firstName: "Alice",
        lastName: "Ecila",
        date: "2024-03-10T12:01:00Z",
        zipCode: "10001",
        companyName: "Facebook",
        title: "Terrible Management",
        body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione laborum nesciunt omnis culpa ipsam non at, sint, quas veniam vel nam in et aliquid assumenda earum fugit quod tempora temporibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione laborum nesciunt omnis culpa ipsam non at, sint, quas veniam vel nam in et aliquid assumenda earum fugit quod tempora temporibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione laborum nesciunt omnis culpa ipsam non at, sint, quas veniam vel nam in et aliquid assumenda earum fugit quod tempora temporibus.",
        pictures: ["https://picsum.photos/200/334"],
        likes: 23,
      },
      {
        id: 4,
        userId: 2,
        firstName: "LeBron",
        lastName: "James",
        date: "2024-03-10T12:01:00Z",
        zipCode: "10001",
        companyName: "Monsters Inc.",
        title: "The Interview Process",
        body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione laborum nesciunt omnis culpa ipsam non at, sint, quas veniam vel nam in et aliquid assumenda earum fugit quod tempora temporibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione laborum nesciunt omnis culpa ipsam non at, sint, quas veniam vel nam in et aliquid assumenda earum fugit quod tempora temporibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione laborum nesciunt omnis culpa ipsam non at, sint, quas veniam vel nam in et aliquid assumenda earum fugit quod tempora temporibus.",
        pictures: [],
        likes: 6565,
      },
    ];

    // Simulate filtering based on distance
    return reviews.filter(
      (review) => calculateDistance(userZipCode, review.zipCode) <= radius
    );
  };

  const calculateDistance = (zipCode1, zipCode2) => {
    // calculation based on zip codes
    return 0;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.bookmarkContainer}
        onPress={() => navigation.navigate("Archive", { bookmarkedPosts })}
      >
        <FontAwesomeIcon icon={faBookBookmark} size={24} color="black" />
      </TouchableOpacity>

      <Picker
        selectedValue={radius}
        onValueChange={setRadius}
        style={styles.picker}
      >
        <Picker.Item label="Within 5 miles" value={5} />
        <Picker.Item label="Within 10 miles" value={10} />
        <Picker.Item label="Within 25 miles" value={25} />
        <Picker.Item label="Within 50 miles" value={50} />
      </Picker>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Review
            review={item}
            onBookmark={fetchAndSetBookmarkedPosts}
            bookmarked={bookmarked}
            onPress={() =>
              navigation.navigate("FocusedReview", { reviewId: item.id })
            }
          />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  picker: {
    marginBottom: 10,
  },
});

export default Home;
