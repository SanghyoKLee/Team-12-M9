import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

const Notifications = () => {
  const [timeInput, setTimeInput] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filterByComments, setFilterByComments] = useState(false);
  const [filterByPosts, setFilterByPosts] = useState(false);
  const [filterByLikes, setFilterByLikes] = useState(false);
  const [log, setLog] = useState([]);
  const [newNotifications, setNewNotifications] = useState(0);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const filterNotifications = () => {
    const filtered = log.filter((notification) => {
      const timeMatch = notification.timestamp
        .toLowerCase()
        .includes(timeInput.toLowerCase());
      const commentMatch = notification.comment
        .toLowerCase()
        .includes(commentInput.toLowerCase());
      const typeMatch =
        (!filterByComments || notification.type === "comment") &&
        (!filterByPosts || notification.type === "post") &&
        (!filterByLikes || notification.type === "like");
      return timeMatch && commentMatch && typeMatch;
    });
    setLog(filtered);
  };

  const handleNewNotification = () => {
    setNewNotifications((prev) => prev + 1);
  };
  const handleNotificationClick = (notification) => {
    // Assuming 'LocationScreen' is the name of the screen to navigate to
    navigateToScreen("LocationScreen"); // Call the navigation function with the screen name
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.filterLink} onPress={toggleFilter}>
        <Text style={styles.filterText}>Filter</Text>
      </TouchableOpacity>

      {showFilter && (
        <View style={styles.filterOptions}>
          <TextInput
            style={styles.input}
            placeholder="Search by time..."
            value={timeInput}
            onChangeText={(text) => setTimeInput(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Search by comment..."
            value={commentInput}
            onChangeText={(text) => setCommentInput(text)}
          />
          <TouchableOpacity
            style={[
              styles.filterButton,
              filterByComments && styles.activeFilterButton,
            ]}
            onPress={() => setFilterByComments(!filterByComments)}
          >
            <Text style={styles.filterButtonText}>Comments Only</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filterByPosts && styles.activeFilterButton,
            ]}
            onPress={() => setFilterByPosts(!filterByPosts)}
          >
            <Text style={styles.filterButtonText}>Posts Only</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filterByLikes && styles.activeFilterButton,
            ]}
            onPress={() => setFilterByLikes(!filterByLikes)}
          >
            <Text style={styles.filterButtonText}>Likes Only</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.applyFilterButton}
            onPress={filterNotifications}
          >
            <Text style={styles.filterButtonText}>Apply Filter</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.notificationsContainer}>
        <Text style={styles.text}>Notifications</Text>
        {/* Conditional rendering based on new notifications */}
        {newNotifications === 0 ? (
          <Text>No New Notifications</Text>
        ) : (
          // Rendering notifications
          /* log.map((notification, index) => (
            
            <View key={index} style={styles.notification}>
              <Text style={styles.notificationText}>
                <Text style={styles.boldText}>From: </Text>{notification.from}
              </Text>
              <Text style={styles.notificationText}>
                <Text style={styles.boldText}>Time: </Text>{notification.timestamp}
              </Text>
              <Text style={styles.notificationText}>
                <Text style={styles.boldText}>Type: </Text>{notification.type}
              </Text>
              <Text style={styles.notificationText}>
                <Text style={styles.boldText}>Commented: </Text>{notification.comment}
              </Text>
            </View>*/
          log.map((notification, index) => (
            <TouchableOpacity
              key={index}
              style={styles.notification}
              onPress={() => handleNotificationClick(notification)}
            >
              <Text style={styles.notificationText}>
                <Text style={styles.boldText}>From: </Text>
                {notification.from}
              </Text>
              <Text style={styles.notificationText}>
                <Text style={styles.boldText}>Time: </Text>
                {notification.timestamp}
              </Text>
              <Text style={styles.notificationText}>
                <Text style={styles.boldText}>Type: </Text>
                {notification.type}
              </Text>
              <Text style={styles.notificationText}>
                <Text style={styles.boldText}>Commented: </Text>
                {notification.comment}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </View>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fafafa",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  filterLink: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  filterText: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 16,
  },
  filterOptions: {
    position: "absolute",
    top: 50,
    right: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "lightgray",
    zIndex: 1,
  },
  notificationsContainer: {
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  notification: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: "80%",
  },
  notificationText: {
    fontSize: 16,
  },
  boldText: {
    fontWeight: "bold",
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  filterButton: {
    backgroundColor: "lightgray",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  activeFilterButton: {
    backgroundColor: "blue",
  },
  applyFilterButton: {
    backgroundColor: "blue",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  filterButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
