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

import {
  Avatar,
  Badge,
  Button as RNButton,
  Icon as RNIcon,
} from "@rneui/themed";

import { CheckBox as RNCheckbox, Input } from "@rneui/base";

import Slider from "@react-native-community/slider";
import Icon from "react-native-vector-icons/FontAwesome";

import {
  BottomSheet,
  Button as RNEButton,
  FAB,
  Input as RNEInput,
  ListItem,
  Overlay,
  PricingCard,
  SpeedDial,
  SocialIcon,
  Tile,
} from "react-native-elements";

import { Ionicons } from "@expo/vector-icons";

import styles from "./styles";

import {
  DATA,
  inputAccesssoryViewId,
  FOOD_DATA,
  ONE_SECOND_IN_MS,
  PATTERN,
  PATTERN_DESCRIPTION,
  PUG_IMG_LINK,
  RIPPLE_COLORS,
} from "./data/data";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import Home from "./pages/Home";
import ProductCategory from "./pages/ProductCategory";

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

const handlePricingCardPress = () => {
  Alert.alert("Stop", "Go back?", [
    {
      text: "Cancel",
      onPress: () => null,
      style: "cancel",
    },
    {
      text: "Confirm",
      onPress: () => BackHandler.exitApp(),
    },
  ]);
  return true;
};

const handleGenericPress = () => {
  Alert.alert("Stop", "Go back?", [
    {
      text: "Cancel",
      onPress: () => null,
      style: "cancel",
    },
    {
      text: "Confirm",
      onPress: () => BackHandler.exitApp(),
    },
  ]);
  return true;
};

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
  const [isChecked, setIsChecked] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

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

  const toggleOverlay = () => setIsVisible((prevState) => !prevState);

  const clearText = () => setText("");
  const lst = [
    {
      title: "Submit",
      onPress: handleGenericPress,
    },
    {
      title: "Clear Text",
      onPress: clearText,
    },
    {
      title: "Cancel",
      containerStyle: {
        backgroundColor: "red",
        fontSize: 36,
        titleStyle: { color: "white" },
      },
      onPress: () => setIsVisible(false),
    },
  ];

  // useEffect(() => {
  //   const backAction = () => {
  // Alert.alert("Stop", "Go back?", [
  //   {
  //     text: "Cancel",
  //     onPress: () => null,
  //     style: "cancel",
  //   },
  //   {
  //     text: "Confirm",
  //     onPress: () => BackHandler.exitApp(),
  //   },
  // ]);
  // return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );
  // }, []);

  const STACK = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <STACK.Navigator
        screenOptions={{
          // so all screens  have these layouts
          title: "ScreenName",
          // does not show up
          headerBackTitle: "Go Home",
          fontSize: 24,
          color: "red",
          headerStyle: {
            backgroundColor: "lightgreen",
          },
          headerTintColor: "blue",
          // headerShown: false,
          headerTitleStyle: {
            color: "red",
            fontSize: 15,
          },
          headerTextAlign: "right",
        }}
      >
        <STACK.Screen
          name="Home"
          component={Home}
          options={{
            title: "Register",
          }}
        />
        <STACK.Screen
          name="ProductCategory"
          component={ProductCategory}
          options={{
            title: "ProductCategory Screen",
            // headerBackVisible: false,
            // does not show up
            headerBackTitle: "Go Home",
            fontSize: 24,
            color: "red",
            headerTintColor: "green",
            // headerShown: false,
            headerTitleStyle: {
              color: "white",
              fontSize: 20,
            },
            headerTextAlign: "right",
            headerStyle: {
              backgroundColor: "black",
            },
          }}
        />
      </STACK.Navigator>

      {/*
        <View style={styles.container}>
      <RNEInput placeholder="Name" value={text} onChangeText={setText} />
      <Button title="Click" onPress={() => setIsVisible(true)} />

      <BottomSheet
        isVisible={isVisible}
        containerStyle={{ backgroundColor: "lightblue" }}
      >
        {lst.map((item, idx) => (
          <ListItem
            key={idx}
            containerStyle={item.containerStyle}
            onPress={item.onPress}
          >
            <ListItem.Content>
              <ListItem.Title style={item.titleStyle}>
                {item.title}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>


      <Tile
        imageSrc={require("./assets/adaptive-icon.png")}
        title="Tile Image1"
        caption="Caption for Image1"
        featured
      />
      <Tile
        imageSrc={require("./assets/icon.png")}
        title="Tile Image2"
        caption="Caption for Image2"
        icon={{
          name: "play-circle",
          type: "font-awesome",
          color: "red",
          size: 30,
        }}
        featured
        onPress={handleGenericPress}
      />
      <SocialIcon type="twitter" light />
      <SocialIcon type="whatsapp" dark />

      <SocialIcon
        title="Signin with F"
        type="facebook"
        button
        onPress={handleGenericPress}
      />

      <SpeedDial
        isOpen={isOpen}
        icon={{ name: "edit", color: "red" }}
        openIcon={{ name: "close", color: "pink" }}
        onOpen={() => setIsOpen((prevState) => !prevState)}
        onClose={() => setIsOpen((prevState) => !prevState)}
        buttonStyle={{ backgroundColor: "green" }}
      >
        <SpeedDial.Action
          icon={{ name: "add", color: "blue" }}
          title="Add"
          buttonStyle={{ backgroundColor: "yellow" }}
          onPress={handleGenericPress}
        />
        <SpeedDial.Action
          icon={{ name: "delete", color: "orange" }}
          title="Delete"
          buttonStyle={{ backgroundColor: "black" }}
          onPress={handleGenericPress}
        />
      </SpeedDial>

      <FAB
        title="Add Title"
        placement="right"
        size="large"
        upperCase={true}
        icon={<Ionicons name="add-circle" size={24} color="blue" />}
        buttonStyle={{ backgroundColor: "red" }}
        onPress={handlePressFAB}
      />

      <PricingCard
        color="green"
        title="Pricing Card 1"
        price="$0"
        info={["line 1", "line2", "line3"]}
        button={{ title: "button Title", icon: "flight-takeoff" }}
        onButtonPress={handlePricingCardPress}
      />
      <PricingCard
        color="blue"
        title="Pricing Card 2"
        price="$10"
        info={["line 1", "line2", "line3"]}
        button={{ title: "button Title", icon: "flight-takeoff" }}
        onButtonPress={handlePricingCardPress}
      />

      <RNEInput placeholder=" Name" value={text} onChangeText={setText} />
      <RNEInput
        placeholder=" Age"
        value={text}
        keyboardType="numeric"
        onChangeText={setText}
      />
      <Button title="Click" onPress={toggleOverlay} />
      <Overlay
        isVisible={isVisible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.overlay}
        backdropStyle={styles.overlay.backdrop}
      >
        <Text>Name: {text} </Text>
        <Text>Age: {number}</Text>
      </Overlay>

      <Input
        placeholder="RN Email"
        type="email"
        secureTextEntry
        onChangeText={(text) => setText(text)}
        onSubmitEditing={() => {
          console.log(text);
        }}
      />

      <RNCheckbox
        title="IsNotChecked1"
        checked={isChecked}
        checkedTitle="IsChecked1"
        onPress={() => setIsChecked((prevState) => !prevState)}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
      />

      <RNCheckbox
        title="IsNotChecked2"
        checked={!isChecked}
        checkedTitle="IsChecked2"
        onPress={() => setIsChecked((prevState) => !prevState)}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
      />

      <Input
        placeholder="RN input"
        type="password"
        secureTextEntry
        onChangeText={(text) => setText(text)}
        onSubmitEditing={() => {
          console.log(text);
        }}
      />
      <Button
        title="Click"
        type="outline"
        onPress={() => {
          console.log("button clicked");
        }}
      />

      <RNCheckbox
        title="IsNotChecked"
        checked={isChecked}
        checkedTitle="IsChecked"
        onPress={() => setIsChecked((prevState) => !prevState)}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
      />

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
      <RNButton
        title="React Elements Solid Butons"
        type="solid"
        titleStyle={{ color: "red" }}
        containerStyle={{ backgroundColor: "blue" }}
      />
      <Button
        title="React-Native Solid Butons"
        type="solid"
        titleStyle={{ color: "blue" }}
        containerStyle={{ backgroundColor: "red" }}
      />
      <Button
        title="Click Icon"
        // loading
        icon={<Icon name="arrow-right" size={20} color="white" />}
        type="solid"
        titleStyle={{ color: "orange" }}
        containerStyle={{ backgroundColor: "black" }}
      />

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
     Text placeholder="Input Number"
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
</DrawerLayoutAndroid>
    </View>
    */}
    </NavigationContainer>
  );
}
