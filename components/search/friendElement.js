import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage
} from "react-native";
import { Button, Avatar, Input } from "react-native-elements";
import styles from "../../AppStyle";

//import console = require('console');
const config = require("../../config/config.json");
var POST_REQUEST_RESPONSE;

if (process.env.NODE_ENV === "development") {
  POST_REQUEST_RESPONSE = config.development + "/request-response";
} else {
  POST_REQUEST_RESPONSE = config.production + "/request-response";
}
export default class FriendElement extends Component {
  constructor() {
    super();
  }
  reloadList = async response => {
    const token = await AsyncStorage.getItem("token");
    fetch(POST_REQUEST_RESPONSE, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        relationid: this.props.uuid,
        response
      })
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        //console.log(data);
        this.props.reload();
      });
  };
  render() {
    return (
      <TouchableHighlight
        underlayColor="rgba(0,0,0,0.1)"
        style={{ borderRadius: 5 }}
        onPress={() =>
          this.props.navigation.navigate("UserProfile", {
            id: this.props.id
          })
        }
      >
        <View
          style={{ flexDirection: "row", alignSelf: "stretch", height: 50 }}
        >
          <Avatar
            size="small"
            rounded
            title="BH"
            containerStyle={{ alignSelf: "center", marginRight: 10 }}
          />
          <View style={{ justifyContent: "center", flex: 2 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {this.props.name}
            </Text>
            <Text>{this.props.username}</Text>
          </View>
          {this.props.type === "Pending List" ? (
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",

                justifyContent: "flex-end"
              }}
            >
              <Button
                title="Accept"
                style={{ margin: 5 }}
                buttonStyle={{ backgroundColor: "#d95fbe" }}
                onPress={() => {
                  this.reloadList(3);
                }}
              />
              <Button
                title="Decline"
                style={{ margin: 5 }}
                type="outline"
                onPress={() => {
                  this.reloadList(2);
                }}
                titleStyle={{ color: "#d95fbe" }}
                buttonStyle={{ borderColor: "#d95fbe" }}
              />
            </View>
          ) : null}
        </View>
      </TouchableHighlight>
    );
  }
}
