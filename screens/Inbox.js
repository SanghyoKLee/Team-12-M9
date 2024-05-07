import { View, Text, StyleSheet } from "react-native";
const Inbox = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Inbox Screen</Text>
    </View>
  );
};

export default Inbox;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fafafa",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    justifyContent: "center",
  },
});
