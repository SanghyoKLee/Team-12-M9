import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import CreateReview from "../components/CreateReview";
import CreatePost from "../components/CreatePost";
import { useRoute } from "@react-navigation/native";

const Create = () => {
  const [formType, setFormType] = useState("review"); // Default to 'review'
  const route = useRoute();

  useEffect(() => {
    if (route.params?.formType && route.params.formType !== formType) {
      setFormType(route.params.formType);
    }
  }, [route.params?.formType]);

  const toggleFormType = () => {
    setFormType(formType === "review" ? "post" : "review");
  };

  return (
    <View style={styles.container}>
      {formType === "review" ? (
        <CreateReview toggleFormType={toggleFormType} />
      ) : (
        <CreatePost toggleFormType={toggleFormType} />
      )}
    </View>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
});
