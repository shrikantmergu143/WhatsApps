import { Avatar } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from "react-native";
import { ListItem } from "react-native-elements";
import { db, auth } from "./../../config/firebase";
import { useCollection } from "react-firebase-hooks/firestore";

const Message = ({ navigation, id }) => {
  const [chat, setChat] = useState([]);
  useEffect(() => {
    db.collection("chats")
      .doc(id)
      .collection("message")
      .orderBy("sendAt", "asc")
      .onSnapshot((snapshot) => {
        const user = snapshot.docs.map((doc) => {
          return doc.data();
        });
        setChat(user);
      });
  }, [auth.currentUser.uid]);
  return (
    <View>
      <FlatList
        data={chat}
        renderItem={({ item }) => (
          <View>
            <Text>{item.message}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({});
