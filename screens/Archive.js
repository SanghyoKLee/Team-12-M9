import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Archive = ({ route }) => {
  const { bookmarkedPosts } = route.params;
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  const navigateToFocusedItem = (item) => {
    const screenName = item.type === "post" ? "FocusedPost" : "FocusedReview";
    navigation.navigate(screenName, { postId: item.id });
  };

  const filteredPosts = bookmarkedPosts.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Archive</Text>
        <View style={styles.searchInputContainer}>
          <FontAwesomeIcon icon={faSearch} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by title"
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
        </View>
      </View>
      {filteredPosts.length === 0 ? (
        <View style={styles.noBookmarksContainer}>
          <Text style={styles.noBookmarksText}>No bookmarks yet</Text>
        </View>
      ) : (
        <View>
          <Text style={styles.bookmarksText}>Bookmarks</Text>
          <FlatList
            data={filteredPosts}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.flatListContent}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigateToFocusedItem(item)}>
                <View style={styles.postContainer}>
                  <ImageBackground
                    source={
                      item.pictures[0]
                        ? { uri: item.pictures[0] }
                        : require("../assets/images/book.jpg")
                    }
                    style={styles.picture}
                  >
                    <View style={styles.bottomHalf} />
                    <View style={styles.titleContainer}>
                      <Text style={styles.title}>{item.title}</Text>
                    </View>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#730001",
  },
  headerContainer: {
    marginBottom: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: "#C1121F",
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 20,
    paddingBottom: 20,
    fontWeight: "bold",
    color: "white",
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    color: "black",
  },
  searchIcon: {
    color: "gray",
  },
  bookmarksText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    paddingHorizontal: 20,
  },
  flatListContent: {
    alignItems: "center",
  },
  postContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    margin: 30,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  titleContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 12,
    color: "black",
    bottom: 30,
    textAlign: "center",
  },
  picture: {
    width: "100%",
    height: "100%",
    borderRadius: 75,
    overflow: "hidden",
  },
  bottomHalf: {
    width: "100%",
    height: "50%",
    backgroundColor: "#FFFDD0",
    position: "absolute",
    bottom: 0,
  },
  noBookmarksContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noBookmarksText: {
    fontSize: 24,
    color: "white",
  },
});

export default Archive;
