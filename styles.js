import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
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
  pressible: {
    cntr: {
      backgroundColor: "lightblue",
      width: "100%",
      alignItems: "center",
      borderColor: "green",
      borderWidth: 8,
      marginVertical: 8,
    },
    text2: {
      color: "blue",
    },
    text: {
      color: "red",
      fontSize: 20,
    },
  },
  img: {
    height: 200,
    width: 200,
    marginBottom: 20,
  },
  img2: {
    height: "100%",
    width: "100%",
  },
  input: {
    backgroundColor: "lightgreen",
    padding: 8,
    marginTop: 8,
  },
  customBtn: {
    backgroundColor: "lightgray",
    borderColor: "black",
    padding: 20,
    marginTop: 20,
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 25,
  },
});

export default styles;
