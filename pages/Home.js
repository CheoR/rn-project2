import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";

function Home() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Pug Home</Text>
      {/* Need to match STACK.Screen name="ProductCategory" */}
      <Button
        title="Product Category Page"
        onPress={() => navigation.navigate("ProductCategory")}
      />
    </View>
  );
}

export default Home;
