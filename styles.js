import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    backgroundColor: "orange",
    width: "100%",
  },
  flatList: {
    backgroundColor: "green",
    width: "100%",
    borderColor: "red",
    borderWidth: 8,
    padding: 0,
    margin: 0,
  },
  li: {
    cntr: {
      backgroundColor: "blue",
      width: "100%",
      alignItems: "center",
      borderColor: "yellow",
      borderWidth: 8,
      marginVertical: 8,
    },
    text: {
      color: "yellow",
    },
  },
});

export default styles;
