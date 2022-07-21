// import { StatusBar } from "expo-status-bar";
import { useState } from "react";

import {
  Alert,
  Button,
  FlatList,
  Image,
  Keyboard,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styles from "./styles";

import DATA from "./data/data";

const pressHandler = (text) => {
  console.log(text);
  Alert.alert("Are you a pug", "For lunch reasons", [
    { text: "Bark", onPress: () => console.log("bark bark bark") },
    { text: "Moo", onPress: () => console.log("oink oink oink") },
  ]);
};

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.img}>
        <Image source={require("./assets/icon.png")} style={styles.img2} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Doesn't use TouchableWithoutFeedback"
      />
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          console.log("Keyboard dismissed");
        }}
      >
        <View>
          <TextInput
            style={styles.input}
            placeholder="Uses TouchableWithoutFeedback"
          />
        </View>
      </TouchableWithoutFeedback>
      <TouchableOpacity onPress={() => console.log("custom button pressed")}>
        <View style={styles.customBtn}>
          <Text>Custom Button</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log("modal button pressed");
          setIsOpen(true);
        }}
      >
        <View style={styles.customBtn}>
          <Text>Click for Modal</Text>
        </View>
      </TouchableOpacity>
      <Modal visible={isOpen}>
        <View style={styles.customBtn}>
          <Text>Modal Pressed</Text>
          <Button title="Close" onPress={() => setIsOpen(false)} />
        </View>
      </Modal>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItems}
        style={styles.flatList}
      />
    </View>
  );
}

const renderItems = ({ item }) => (
  <View style={styles.li.cntr}>
    <TouchableOpacity onPress={() => pressHandler(item.text)}>
      <Text style={styles.li.text}>{item.text}</Text>
    </TouchableOpacity>
  </View>
);
