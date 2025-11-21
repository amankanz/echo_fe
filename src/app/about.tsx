//src/app/index.tsx
import { Link } from "expo-router";
import { View, Text } from "react-native";

export default function AboutScreen() {
  return (
    <View>
      <Text>AboutScreen</Text>
      <Text>Welcome, on the Native Echo!</Text>
      <Link href="/">Go HomeScreen</Link>
    </View>
  );
}
