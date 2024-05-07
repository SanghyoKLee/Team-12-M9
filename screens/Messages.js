import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";

const Messages = ({ navigation }) => {
  const [search, setSearch] = useState();
  const [filteredUser, setFilteredUser] = useState(messagesData);

  const handleSearch = (text) => {
    setSearch(text);

    const filteredData = messagesData.filter;
  };

  const messagesData = [
    {
      id: "1",
      fullName: "Wife Wife",
      isOnline: false,
      userImg: require("../assets/images/user1.jpg"),
      lastSeen: "2023-11-16T04:52:06.501Z",
      lastMessage: "See you soon!",
      messageInQueue: 2,
      lastMessageTime: "12:25 PM",
    },
    {
      id: "2",
      fullName: "My Friend",
      isOnline: true,
      userImg: require("../assets/images/user2.jpg"),
      lastSeen: "2023-11-18T04:52:06.501Z",
      lastMessage: "I Know. you are so busy man.",
      messageInQueue: 0,
      lastMessageTime: "12:15 PM",
    },
    {
      id: "3",
      fullName: "Jane Doe",
      isOnline: true,
      userImg: require("../assets/images/user3.jpg"),
      lastSeen: "2023-11-20T04:52:06.501Z",
      lastMessage: "Ok, see u soon",
      messageInQueue: 0,
      lastMessageTime: "09:12 PM",
    },
    {
      id: "4",
      fullName: "Joe Joe",
      isOnline: false,
      userImg: require("../assets/images/user4.jpg"),
      lastSeen: "2023-11-18T04:52:06.501Z",
      lastMessage: "Great! Do you Love it.",
      messageInQueue: 0,
      lastMessageTime: "04:12 PM",
    },
    {
      id: "5",
      fullName: "Bill Bill",
      isOnline: false,
      userImg: require("../assets/images/user5.jpg"),
      lastSeen: "2023-11-21T04:52:06.501Z",
      lastMessage: "Thank you !",
      messageInQueue: 2,
      lastMessageTime: "10:30 AM",
    },
    {
      id: "6",
      fullName: "First Last",
      isOnline: false,
      userImg: require("../assets/images/user6.jpg"),
      lastSeen: "2023-11-20T04:52:06.501Z",
      lastMessage: "Do you want to go out dinner",
      messageInQueue: 3,
      lastMessageTime: "10:05 PM",
    },
  ];

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      key={index}
      onPress={() =>
        navigation.navigate("PersonalMessage", { username: item.fullName })
      }
      style={[
        styles.userContainer,
        index % 2 !== 0 ? styles.oddBackground : null,
      ]}
    >
      <View style={styles.userInfoContainer}>
        <View style={styles.userImageContainer}>
          {item.isOnline && item.isOnline === true && (
            <View style={styles.onlineIndicator} />
          )}
          <Image
            source={item.userImg}
            resizeMode="cover"
            style={styles.userImage}
          />
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.username}>{item.fullName}</Text>
          <Text style={styles.lastMessage}>{item.lastMessage}</Text>
        </View>

        <View style={styles.messageDetails}>
          <Text style={styles.lastMessageTime}>{item.lastMessageTime}</Text>
          {item.messageInQueue > 0 && (
            <View style={styles.messageInQueueContainer}>
              <Text style={styles.messageInQueue}>{item.messageInQueue}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderContent = () => {
    return (
      <View>
        <View style={styles.searchBar}>
          <TouchableOpacity>
            <Ionicons name="search-outline" size={20} color="black" />
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <View>
          <FlatList
            data={messagesData}
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>{renderContent()}</View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: "#FFFDD0",
  },
  container: {
    backgroundColor: "#FFFDD0",
    flex: 1,
    padding: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fafafa",
    height: 40,
    width: "100%",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  searchInput: {
    flex: 1,
    height: "100%",
    marginLeft: 10,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  oddBackground: {
    backgroundColor: "#FAF3E0",
  },
  userImageContainer: {
    marginRight: 10,
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#00ff00",
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  userInfo: {
    flex: 1,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  lastMessage: {
    fontSize: 14,
    color: "#888",
  },
  messageDetails: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  lastMessageTime: {
    fontSize: 12,
    color: "#888",
  },
  messageInQueueContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#D3D3D3",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  messageInQueue: {
    fontSize: 12,
    color: "#fff",
  },
});

export default Messages;
