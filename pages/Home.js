import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert } from "react-native";
import { Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import styles from "../styles";

function Home() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if (email === "pug@pug.com" && password === "pug") {
      // disallow clicking back button
      navigation.reset({
        index: 0,
        routes: [{ name: "ProductCategory" }],
      });
      // navigation.navigate("ProductCategory");
    } else {
      Alert.alert("Error", "Login Credendtials Brah");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Pug Home</Text>
      <Input placeholder="Email" onChangeText={setEmail} value={email} />
      <Input
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        type="password"
        secureTextEntry
      />
      <Button title="Login" onPress={login} />
      {/* Need to match STACK.Screen name="ProductCategory" */}
      <Button
        title="Product Category Page"
        onPress={() => navigation.navigate("ProductCategory")}
      />
    </View>
  );
}

export default Home;
