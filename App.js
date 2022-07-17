// import { StatusBar } from "expo-status-bar";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

const DATA = [
  { id: 1, text: "Text1" },
  { id: 2, text: "Text2" },
  { id: 3, text: "Text3" },
  { id: 4, text: "Text4" },
  { id: 5, text: "Text5" },
  { id: 6, text: "Text6" },
  { id: 7, text: "Text7" },
  { id: 8, text: "Text8" },
  { id: 9, text: "Text9" },
  { id: 10, text: "Text10" },
  { id: 11, text: "Text11" },
  { id: 12, text: "Text12" },
  { id: 13, text: "Text13" },
  { id: 14, text: "Text14" },
  { id: 15, text: "Text15" },
  { id: 16, text: "Text16" },
  { id: 17, text: "Text17" },
  { id: 18, text: "Text18" },
  { id: 19, text: "Text19" },
  { id: 20, text: "Text20" },
];

const pressHandler = (text) => {
  console.log(text);
};

export default function App() {
  return (
    <View style={styles.container}>
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
