import React, { Component } from "react";
import { StyleSheet, Text, FlatList, View, AsyncStorage } from "react-native";
import FriendElement from "./friendElement";

const config = require("../../config/config.json");
var GET_FRIEND_LIST;
if (process.env.NODE_ENV === "development") {
  GET_FRIEND_LIST = config.development + "/get-friend-list";
} else {
  GET_FRIEND_LIST = config.production + "/get-friend-list";
}

export default class FriendList extends Component {
  state = {
    friendList: []
  };
  _keyExtractor = (item, index) => item.friend_id.toString();

  _renderItem = ({ item }) => (
    <FriendElement
      id={item.friend_id}
      name={item.firstname + " " + item.lastname}
      username={item.username}
      navigation={this.props.navigation}
    />
  );
  getFriendList = async () => {
    const token = await AsyncStorage.getItem("token");
    fetch(GET_FRIEND_LIST, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        //console.log("Ress hhmhmm", data);
        this.setState({
          friendList: data.data
        });
      });
  };
  componentDidMount() {
    this.getFriendList();
  }
  render() {
    return (
      <View style={{ margin: 15 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Friends list</Text>
        <FlatList
          style={{
            marginTop: 10
          }}
          contentContainerStyle={{
            alignItems: "stretch",
            justifyContent: "center"
          }}
          data={this.state.friendList}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}
