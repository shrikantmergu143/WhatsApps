import React, { useState, useLayoutEffect, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Image, Text } from "react-native-elements";
import { db, auth } from "../../config/firebase";
import CustomListItems from "./CustomListItems";
import { Avatar, IconButton } from "@material-ui/core";
import {
  KeyboardAvoidingView,
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput
} from "react-native";

import MoreVertRoundedIcon from "@material-ui/icons/MoreVertRounded";
import InsertEmoticon from "@material-ui/icons/InsertEmoticon";
import firebase from "firebase";
import { ListItem } from "react-native-elements";
import SendIcon from "@material-ui/icons/Send";
import { useCollection } from "react-firebase-hooks/firestore";
import GetFriendEmail from "../user/GetFriendEmail";
import { AttachFile } from "@material-ui/icons";
import Message from "./Message";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default function Chat(props) {
  const [user, setUser] = useState(auth.currentUser);
  const [users, setUsers] = useState(props.route.params.users);

  const recipient = props.route.params.users;
  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: users,
      headerStyle: { backgroundColor: "#FFF" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerBackTitleVisible: false,
      headerTitleAlign: "left",
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            color: "black"
          }}
        >
          <Avatar scr={recipient?.photoURL} />
          <ListItem.Content style={{ margin: 10 }}>
            <ListItem.Title style={{ fontWeight: 600, fontSize: 12 }}>
              {recipient?.email ? recipient.username : props.route.params.email}
            </ListItem.Title>
            <ListItem.Subtitle
              style={{ fontSize: 10 }}
              numberOfLines={1}
              ellipsizeMode={"tail"}
            >
              Last active:{recipient?.email ? recipient?.lastSeen : null}
            </ListItem.Subtitle>
          </ListItem.Content>
          <View style={{ marginRight: 15 }} style={{ flexDirection: "row" }}>
            <TouchableOpacity style={{ margin: 10 }}>
              <AttachFile style={{ fontSize: 20 }} />
            </TouchableOpacity>
            <TouchableOpacity style={{ margin: 10 }}>
              <MoreVertRoundedIcon style={{ fontSize: 20 }} />
            </TouchableOpacity>
          </View>
        </View>
      )
    });
  });

  return (
    <View style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
      <Message
        navigation={props.navigation}
        id={props.route.params.id}
        users={users}
      />
      <View
        style={{
          flexDirection: "row",
          height: screenHeight,
          alignItems: "center",
          width: "100%"
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: 45,
            paddingHorizontal: 10
          }}
        >
          <IconButton
            color="secoundary"
            size="small"
            style={{ backgroundColor: "white" }}
          >
            <InsertEmoticon
              style={{
                bottom: 0,
                alignItems: "stretch",
                fontSize: 30,
                margin: 5,
                padding: 1
              }}
            />
          </IconButton>
          <TextInput
            style={{
              flex: 1,
              paddingTop: 10,
              paddingRight: 10,
              paddingBottom: 10,
              paddingLeft: 10,
              color: "#424242",
              width: 10
            }}
          />
        </View>
        <IconButton
          size="small"
          style={{ backgroundColor: "white", color: "blue" }}
        >
          <SendIcon style={{ fontSize: 30, margin: 5 }} />
        </IconButton>
      </View>
    </View>
  );
}
