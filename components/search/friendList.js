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
    friendList: [],
    listName: ""
  };
  componentWillReceiveProps(nextProps) {
    this.setState({
      listName: nextProps.listName
    });
  }
  _keyExtractor = (item, index) => item.uuid;

  _renderItem = ({ item }) => (
    <FriendElement
      id={item.friend_id}
      name={item.firstname + " " + item.lastname}
      username={item.username}
      navigation={this.props.navigation}
    />
  );
  getFriendList = async status => {
    const token = await AsyncStorage.getItem("token");
    fetch(GET_FRIEND_LIST, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        status
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
    if (this.props.listName === "Friends List") this.getFriendList(3);
    else {
      this.getFriendList(1);
    }
  }
  render() {
    return (
      <View style={{ margin: 15 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {this.props.listName}
        </Text>
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
