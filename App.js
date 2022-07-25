// import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  Animated,
  Button,
  FlatList,
  InputAccessoryView,
  Image,
  Keyboard,
  Modal,
  Platform,
  Pressable,
  RefreshControl,
  SectionList,
  ScrollView,
  Switch,
  Text,
  TextInput,
  ToastAndroid,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styles from "./styles";

import DATA, { FOOD_DATA } from "./data/data";

const inputAccesssoryViewId = "id";
const RIPPLE_COLORS = [
  "red",
  "black",
  "yellow",
  "blue",
  "green",
  "brown",
  "white",
];

const pressHandler = (text) => {
  console.log(text);
  Alert.alert("Are you a pug", "For lunch reasons", [
    { text: "Bark", onPress: () => console.log("bark bark bark") },
    { text: "Moo", onPress: () => console.log("oink oink oink") },
  ]);
};

const Item = ({ title }) => (
  <View style={styles.cntr}>
    <Text style={styles.li.text}>{title}</Text>
  </View>
);

const renderItems = ({ item }) => (
  <View style={styles.li.cntr}>
    <TouchableOpacity onPress={() => pressHandler(item.text)}>
      <Text style={styles.li.text}>{item.text}</Text>
    </TouchableOpacity>
  </View>
);

const randomColor = () =>
  RIPPLE_COLORS[Math.floor(Math.random() * RIPPLE_COLORS.length)];

const showToast = () =>
  ToastAndroid.show("Toast Android example", ToastAndroid.SHORT);
const showToastWithGravity = () =>
  ToastAndroid.showWithGravity(
    "Toast Android with Gravity Example",
    ToastAndroid.SHORT,
    ToastAndroid.CENTER
  );
const showToastWithGravityAndOffset = () =>
  ToastAndroid.showWithGravity(
    "Toast Android with Gravity and Offset Example",
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    30,
    100
  );

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const [showAnimator, setShowAnimator] = useState(false);
  const [count, setCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [text, setText] = useState("");
  const [number, setNumber] = useState(0);
  const [rippleOverflow, setRippleOverflow] = useState(false);
  const [rippleColor, setRippleColor] = useState("red");
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  const increment = () => setCount((prevState) => prevState + 1);
  const toggleSwitch = () => setIsOn((prevState) => !prevState);
  const runAnimator = () => {
    setShowAnimator(true);
    setTimeout(() => {
      setShowAnimator(false);
      Alert.alert("This is how you do a animator");
    }, 2000);
  };
  const tugMe = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 10000);
  };

  const fadeIn = () => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.container.label}>Native Label Here</Text>
      {/*
      <Animated.View
        style={[
          styles.container.fadingContainer,
          {
            opacity: fadeAnimation,
          },
        ]}
      >
        <Text style={styles.container.fadingText}>Fading Text</Text>
      </Animated.View>
      <View style={styles.container.buttonRow}>
        <Button title="Fade In" onPress={fadeIn} />

        <Button title="Fade Out" onPress={fadeOut} />
      </View>

      <Text>OS</Text>
      <Text style={styles.osValues}>{Platform.OS}</Text>

      <Text>OS Version</Text>
      <Text style={styles.osValues}>{Platform.Version}</Text>

      <Text>isTV</Text>
      <Text style={styles.osValues}>{Platform.isTV.toString()}</Text>

      {Platform.OS === "ios" && (
        <>
          <Text>isPad</Text>
          <Text style={styles.osValues}>{Platform.isPad.toString()}</Text>
        </>
      )}

      <Text>Constants</Text>
      <Text style={styles.osValues}>
        {JSON.stringify(Platform.constants, null, 2)}
      </Text>
 
      <View style={styles.toggleLightMode}>
        <TextInput
          style={styles.toggleLightMode.textInput}
          placeholder="Text here"
          onChangeText={setText}
        />
        <TextInput
          style={styles.toggleLightMode.textInput}
          placeholder="Number here"
          onChangeText={setNumber}
        />
        <Text style={styles.toggleLightMode.text}>
          {text} {number}
        </Text>
      </View>
      <View style={styles.container2}>
        <Button onPress={showToast} title="Show Toast" />
        <Button
          onPress={showToastWithGravity}
          title="Show Toast with Gravity"
        />
        <Button
          onPress={showToastWithGravityAndOffset}
          title="Show Toast with Gravity and offset"
        />
      </View> */}

      {/* 
        <TouchableNativeFeedback
          onPress={() => {
            setRippleOverflow((prevState) => !prevState.rippleOverflow);
            setRippleColor(randomColor);
          }}
          background={TouchableNativeFeedback.Ripple(
            rippleColor,
            rippleOverflow
          )}
        >
          <View>
            <Text style={styles.li.text}>Touch here</Text>
          </View>
        </TouchableNativeFeedback>
      </View>

      <View style={styles.img}>
        <Image source={require("./assets/icon.png")} style={styles.img2} />
      </View>
      <ActivityIndicator size="large" color="green" animating={showAnimator} />
      <Button title="Show Animator" onPress={runAnimator} />
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
      <View style={styles.customBtn}>
        <Switch
          trackColor={{
            true: "green",
            false: "red",
          }}
          thumbColor={isOn ? "red" : "green"}
          onValueChange={toggleSwitch}
          value={isOn}
          ios_backgroundColor="orange"
        />
      </View>
      <View>
        <TextInput
          placeholder="Press Here"
          onChangeText={(text) => setText(text)}
          value={text}
          inputAccesssoryViewId={inputAccesssoryViewId}
        />
        <InputAccessoryView nativeID={InputAccessoryView}>
          <Button title="Clear" onPress={() => setText("")} />
        </InputAccessoryView>
      </View> */}
      {/* 
      <View style={styles.pressible.cntr}>
        <View>
          <Text>{count}</Text>
        </View>
        <Pressable
          onPress={increment}
          style={({ pressed }) => [
            { backgroundColor: pressed ? "pink" : "lightgreen" },
            styles.pressible.text2,
          ]}
        >
          {({ pressed }) => (
            <Text style={styles.pressible.text}>
              {pressed ? "Unpress" : "Press Down"}
            </Text>
          )}
        </Pressable>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={tugMe} />
        }
      >
        <Text>Tug to Refresh</Text>
      </ScrollView>


      <SectionList
        sections={FOOD_DATA}
        keyExtractor={(item, idx) => item + idx}
        // Default renderer for every item in every section.
        // Can be over-ridden on a per-section basis.
        // Should return a React element.
        // find in FOOD_DATA as data
        //  { id: Number: data : [String, String]}
        renderItem={({ item }) => <Item title={item} />}
        renderSectionHeader={({ section: { title } }) => <Text>{title}</Text>}
      />
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItems}
        style={styles.flatList}
      /> */}
    </View>
  );
}
