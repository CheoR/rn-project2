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
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

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

  const register = () => {
    navigation.navigate("ProductCategory", {
      test_name: name,
      test_email: email,
      test_age: age,
    });
  };

  return (
    <View style={styles.container}>
      <Text>Pug Home</Text>
      <Input placeholder="Name" onChangeText={setName} value={name} />
      <Input
        placeholder="Age"
        onChangeText={setAge}
        value={age.toString()}
        keyboardType="numeric"
      />

      <Input
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        type="email"
      />
      <Input
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        type="password"
        secureTextEntry
      />
      <Button title="Register" onPress={register} />

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
