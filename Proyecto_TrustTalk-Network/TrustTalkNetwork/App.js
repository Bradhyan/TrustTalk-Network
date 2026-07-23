import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ChatItem from "./src/components/ChatItem";
import ChatList from "./src/screens/ChatList";
import ChatScreen from "./src/screens/ChatScreen";
import Navigator from "./src/navigation/index";

export default function App() {
  return (
    <View style={styles.container}>
      <Navigator />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
    justifyContent: "center",
  },
});
