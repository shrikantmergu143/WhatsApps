import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Home from "./components/main/Home";
import { auth } from "./config/firebase";
import { WhatsApp } from "@material-ui/icons";
import AddChat from "./components/main/AddChat";
import Chat from "./components/main/Chat";
import Main from "./components/Main";

const Stack = createStackNavigator();
const globalScreenOptions = {
  headerStyle: { backgroundColor: "#2c6bcd" },
  headerTitleStyle: { color: "white" },
  headerTintColor: "white"
};

export default function App() {
  const [user, setuser] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
      if (!authUser) {
        setuser(false);
        setLoaded(true);
      } else {
        setuser(true);
        setLoaded(true);
      }
    });
  }, []);
  if (!loaded) {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
        >
          <WhatsApp style={{ height: 90, width: 90, color: "green" }} />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: 10
          }}
        >
          <Text style={{ fontWeight: 700 }}>From</Text>
          <Text style={{ fontSize: 22, fontWeight: 700 }}>FaceBook</Text>
        </View>
      </View>
    );
  }
  if (!user)
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="AddChat" component={AddChat} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
