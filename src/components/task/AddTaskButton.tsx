import React from "react";
import { Button, Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const AddTaskButton = ({ getExpand }) => {
  return (
    <Button style={styles.button} textColor='white' icon="plus" onPress={() => getExpand(true)}>
      <Text style={styles.text}>Add Task</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0000002b",
    borderColor: "white",
    borderWidth: 2,
    opacity: 0.6,
  },
  content: {
    height: "100%",
    justifyContent: "center",
  },
  text: {
    paddingVertical: 10,
    textTransform: "capitalize",
    fontWeight: "bold",
    fontSize: 15,
    color: "#ffffff",
  },
});

export default AddTaskButton;
