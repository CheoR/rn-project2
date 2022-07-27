import { useRoute } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";

const ProductCategory = () => {
  const route = useRoute();
  return (
    <View>
      <Text>ProductCategory Page</Text>
      <Text>Data Fetched From Other Pages</Text>
      <Text>{route.params.test_name}</Text>
      <Text>{route.params.test_email}</Text>
      <Text>{route.params.test_age}</Text>
    </View>
  );
};

export default ProductCategory;
