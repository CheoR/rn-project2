import { Appearance, StyleSheet } from "react-native";

const colorScheme = Appearance.getColorScheme();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    backgroundColor: "orange",
    // width: "100%",
    fadingContainer: {
      padding: 20,
      backgroundColor: "lightgreen",
    },
    fadingText: {
      fontSize: 30,
    },
    buttonRow: {
      justifyContent: "center",
      marginVertical: 20,
    },
  },
  container2: {
    padding: 8,
    backgroundColor: "lightgreen",
    width: "50%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
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
  toggleLightMode: {
    flex: 1,
    padding: 20,
    backgroundColor: colorScheme === "light" ? "white" : "dark",
    textInput: {
      marginTop: 20,
      backgroundColor: colorScheme === "light" ? "black" : "white",
      color: colorScheme === "light" ? "white" : "black",
      padding: 20,
    },
    text: {
      fontSize: 20,
      marginTop: 20,
      color: colorScheme === "light" ? "black" : "white",
      padding: 20,
    },
  },
  osValues: {
    fontWeight: "bold",
    padding: 20,
    marginBottom: 10,
  },
});

export default styles;
