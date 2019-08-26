import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { Button, Avatar, Input } from "react-native-elements";
import styles from "../../AppStyle";
import { createStackNavigator, createAppContainer } from "react-navigation";

import moment from "moment";

export default class FriendElement extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <TouchableHighlight>
        <View
          style={{ flexDirection: "row", alignSelf: "stretch", height: 50 }}
        >
          <Avatar
            size="small"
            rounded
            title="BH"
            containerStyle={{ alignSelf: "center", marginRight: 10 }}
          />
          <View style={{ justifyContent: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {this.props.name}
            </Text>
            <Text>{this.props.username}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
