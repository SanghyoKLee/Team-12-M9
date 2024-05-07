import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const Thread = ({ route }) => {
  // Get the selected message from navigation params
  const { message } = route.params;

  // Dummy conversation data
  const conversation = [
    {
      id: 1,
      sender: "John",
      recipient: "Jane",
      content: "Hello, Jane!",
      timestamp: "9:00 AM",
    },
    {
      id: 2,
      sender: "Jane",
      recipient: "John",
      content: "Hi John! How are you?",
      timestamp: "9:05 AM",
    },
    {
      id: 3,
      sender: "John",
      recipient: "Jane",
      content: "I am doing well, thank you!",
      timestamp: "9:10 AM",
    },
    // Add more messages as needed
  ];

  // Filter messages based on the selected sender's name and recipient's name
  const selectedConversation = conversation.filter(
    (msg) =>
      (msg.sender === message.sender && msg.recipient === message.recipient) ||
      (msg.sender === message.recipient && msg.recipient === message.sender)
  );

  // Render function for each message item
  const renderMessageItem = ({ item }) => (
    <View style={styles.messageContainer}>
      <Text style={styles.sender}>{item.sender}</Text>
      <Text style={styles.content}>{item.content}</Text>
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.threadHeader}>
        Conversation between {message.sender} and {message.recipient}
      </Text>
      <FlatList
        data={selectedConversation}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDD0",
    padding: 10,
  },
  threadHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  messageContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
    marginBottom: 10,
  },
  sender: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  content: {
    marginBottom: 4,
  },
  timestamp: {
    color: "#666",
  },
});

export default Thread;
