import { Avatar } from "@material-ui/core";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ListItem } from "react-native-elements";
import { db, auth } from "./../../config/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import GetFriendEmail from "../user/GetFriendEmail";

const CustomListItems = ({ navigation, users, id }) => {
  const recipientEmail = GetFriendEmail(users, auth.currentUser);
  const [recipientSnapshot] = useCollection(
    db
      .collection("users")
      .where("email", "==", GetFriendEmail(users, auth.currentUser))
  );
  const recipient = recipientSnapshot?.docs?.[0]?.data();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Chat", {
          id: id,
          users: recipient,
          email: recipientEmail
        })
      }
    >
      <ListItem bottomDivider>
        <Avatar scr={recipient?.photoURL} />
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: 800 }}>
            {recipientEmail}
          </ListItem.Title>
          <ListItem.Subtitle numberOfLines={1} ellipsizeMode={"tail"}>
            Clear Chat
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );
};

export default CustomListItems;

const styles = StyleSheet.create({});
