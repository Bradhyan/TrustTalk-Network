import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import NotImplementedScreen from "../screens/NotImplementedScreen";
import ChatList from "../screens/ChatList";
import { Ionicons, Entypo } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import Login from "../screens/Login"
import GroupList from "../screens/GroupList";
import EstadosList from "../screens/EstadosList";

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Chats"
      screenOptions={{
        tabBarStyle: { backgroundColor: "black" },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        headerStyle: { backgroundColor: "black" },
        headerTintColor: "white",
      }}
    >
      <Tab.Screen
        name="Estados"
        component={EstadosList}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="logo-whatsapp" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Grupos"
        component={GroupList}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="group" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatList}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-chatbubbles-sharp" size={size} color={color} />
          ),
          headerRight: () => (
            <Entypo
              onPress={() => navigation.navigate("Contacts")}
              name="new-message"
              size={18}
              color={"royalblue"}
              style={{ marginRight: 15 }}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Mi Perfil"
        component={NotImplementedScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabNavigator