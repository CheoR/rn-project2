// import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";

import {
  ActionSheetIOS,
  ActivityIndicator,
  Alert,
  Animated,
  BackHandler,
  Button,
  DrawerLayoutAndroid,
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
  Vibration,
  View,
} from "react-native";
import { Avatar, Badge } from "@rneui/themed";
import Slider from "@react-native-community/slider";

import styles from "./styles";

import DATA, {
  inputAccesssoryViewId,
  FOOD_DATA,
  ONE_SECOND_IN_MS,
  PATTERN,
  PATTERN_DESCRIPTION,
  PUG_IMG_LINK,
  RIPPLE_COLORS,
} from "./data/data";

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
  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const drawer = useRef(null);

  const [drawerPosition, setDrawerPosition] = useState("left");
  const [isOpen, setIsOpen] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const [showAnimator, setShowAnimator] = useState(false);
  const [count, setCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [text, setText] = useState("");
  const [number, setNumber] = useState(0);
  const [rippleOverflow, setRippleOverflow] = useState(false);
  const [rippleColor, setRippleColor] = useState("red");

  const changeDrawerPosition = () => {
    if (drawerPosition === "left") {
      setDrawerPosition("right");
    } else {
      setDrawerPosition("left");
    }
  };
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

  const sideDrawer = () => (
    <View style={[styles.container, styles.container.navigationContainer]}>
      <Text style={styles.text}>Side Drawer example</Text>
      <Text style={{ fontSize: 30, fontWeight: "bold" }}>Account</Text>
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.text}>{number}</Text>
      <Button
        title="Close Drawer"
        onPress={() => drawer.current.closeDrawer()}
      />
    </View>
  );

  const onPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        Options: ["Cancel", "Generate Number", "Reset"],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0,
        userInterfaceStyle: "dark",
        title: "Only for IOS",
        message: "generate random number for ios",
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
        } else if (buttonIndex === 1) {
          setText(Math.floor(Math.random() * 100 + 1));
        } else if (buttonIndex === 2) {
          setText("Randome Number");
        }
      }
    );
  };

  const clickMeForPrompt = () => {
    Alert.prompt(
      "Hola",
      "Enter Name",
      [
        {
          text: "Submit",
          onPress: (text) => setText(text),
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel button pressed"),
        },
      ],
      "plain-text",
      "Name"
    );
  };

  const onPressVibrate = () => {
    Vibration.vibrate();
    Alert.alert("Welcom", `hello ${text}, welcome to app`);
  };

  const onLongPressVibrate = () => {
    Vibration.vibrate(2000);
    Alert.alert("Warning", "Confirm clear text?", [
      {
        text: "Yes",
        onPress: () => setText(""),
      },
      {
        text: "Cancel",
        onPress: () => {},
      },
    ]);
  };
  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert("Stop", "Go back?", [
  //       {
  //         text: "Cancel",
  //         onPress: () => null,
  //         style: "cancel",
  //       },
  //       {
  //         text: "Confirm",
  //         onPress: () => BackHandler.exitApp(),
  //       },
  //     ]);
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );
  // }, []);

  return (
    <View style={styles.container}>
      <Avatar
        rounded
        containerStyle={{ height: 100, width: 200 }}
        source={{ uri: PUG_IMG_LINK }}
        size="large"
      />
      <Badge
        status="success"
        value="this is a badge"
        containerStyle={{
          backgroundColor: "red",
          position: "absolute",
          right: 160,
          top: 390,
        }}
      />
      <Text style={styles.text}>Pug</Text>
      {/*
      <Text style={[styles.text, { opacity: number, fontSize: 36 }]}>
        {Math.floor(number * 100)}
      </Text>
      <Slider
        style={styles.slider}
        onValueChange={setNumber}
        minimumValue={0}
        maximumValue={1}
        thumbTintColor={styles.slider.thumbTintColor}
      />
      <TextInput style={styles.input} onChangeText={setText} value={text} />
      <TouchableNativeFeedback
        onPress={onPressVibrate}
        onLongPress={onLongPressVibrate}
      >
        <View style={styles.button}>
          <Text>Submit</Text>
        </View>
      </TouchableNativeFeedback>

      <Text style={styles.container.text}>Vibration API</Text>
      <View>
        <Button title="Vibrate Once" onPress={() => Vibration.vibrate()} />
      </View>
      <View>
        <Button
          title="Vibrate for 10 secons"
          onPress={() => Vibration.vibrate(10 * ONE_SECOND_IN_MS)}
        />
      </View>
      <Text style={styles.container.text}>Pattern: {PATTERN_DESCRIPTION} </Text>

      <View>
        <Button
          title="Vibrate with pattern"
          onPress={() => Vibration.vibrate(PATTERN)}
        />
      </View>
      <View>
        <Button
          title="Vibrate with pattern until cancelled"
          onPress={() => Vibration.vibrate(PATTERN, true)}
        />
        <Button
          title="stop vibration patttern"
          onPress={() => Vibration.cancel()}
          color="red"
        />
      </View>

      <Text style={styles.text}>{text}</Text>
      <Button onPress={onPress} title="Show Action Sheet" />
      <Text style={styles.text}>Click back button</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.box}>
          <Text style={styles.text}>Original Object</Text>
        </View>
        <View style={[styles.box, { transform: [{ scale: 2 }] }]}>
          <Text style={styles.text}>Original Object scaled by 2</Text>
        </View>
        <View style={[styles.box, { transform: [{ scaleX: 2 }] }]}>
          <Text style={styles.text}>Original Object scaledX by 2</Text>
        </View>

        <View style={[styles.box, { transform: [{ scaleY: 2 }] }]}>
          <Text style={styles.text}>Original Object scaledY by 2</Text>
        </View>
        <View style={[styles.box, { transform: [{ rotate: "45deg" }] }]}>
          <Text style={styles.text}>Original Object rotated 45 deg</Text>
        </View>
        <View
          style={
            (styles.box,
            { transform: [{ rotateX: "45deg" }, { rotateZ: "45deg" }] })
          }
        >
          <Text style={styles.text}>
            Original Object rotated x and z by 45 deg
          </Text>
        </View>
        <View
          style={
            (styles.box,
            { transform: [{ rotateX: "45deg" }, { rotateY: "45deg" }] })
          }
        >
          <Text style={styles.text}>
            Original Object rotated x and y by 45 deg
          </Text>
        </View>
        <View style={[styles.box, { transform: [{ skewX: "45deg" }] }]}>
          <Text style={styles.text}>
            Original Object rotated skwedX by 45 deg
          </Text>
        </View>
        <View style={[styles.box, { transform: [{ skewY: "45deg" }] }]}>
          <Text style={styles.text}>
            Original Object rotated skwedY by 45 deg
          </Text>
        </View>
        <View style={[styles.box, { transform: [{ translateX: -50 }] }]}>
          <Text style={styles.text}>Original Object translateX by -50 deg</Text>
        </View>
        <View style={[styles.box, { transform: [{ translateY: 50 }] }]}>
          <Text style={styles.text}>Original Object translateY by 50 deg</Text>
        </View>
      </ScrollView>

<DrawerLayoutAndroid
  ref={drawer}
  drawerWidth={300}
  drawerPosition={drawerPosition}
  renderNavigationView={sideDrawer}
>
  <View style={styles.container}>
    <Text style={styles.text}>Drawer on the {drawerPosition}</Text>
    <Button title="Change Drawer Position" onPress={changeDrawerPosition} />
    <Text style={styles.text}>Swipe from sie or press button</Text>
    <Button
      title="open drawer"
      onPress={() => drawer.current.openDrawer()}
    />
    <TextInput
      placeholder="Input Text"
      onChangeText={setText}
      style={styles.textInput}
    />
    <TextInput
      placeholder="Input Number"
      onChangeText={setNumber}
      style={styles.textInput}
      keyboardType="numeric"
    />
  </View>

  <Text style={styles.container.label}>Native Label Here</Text>
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
  </View> 
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
  </View> 
  <View style={styles.pressible.cntr}>
    <View>
      <Text>{count}</Text>
    </View>
    <Pressable
      onPress={increment}
      style={[{ pressed }) => [
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
  /> 
</DrawerLayoutAndroid>*/}
    </View>
  );
}
