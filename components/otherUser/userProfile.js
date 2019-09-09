import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, AsyncStorage } from "react-native";

import styles from "../../AppStyle";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, Avatar, Input } from "react-native-elements";
import UserPastPost from "./userPostList";
const config = require("../../config/config.json");
var GET_USER_INFO;
var SEND_FRIEND_REQUEST;
var DELETE_FRIEND;
if (process.env.NODE_ENV === "development") {
  GET_USER_INFO = config.development + "/get-person-info";
  SEND_FRIEND_REQUEST = config.development + "/friend-request";
  DELETE_FRIEND = config.development + "/remove-friend";
} else {
  GET_USER_INFO = config.production + "/get-person-info";
  SEND_FRIEND_REQUEST = config.production + "/friend-request";
  DELETE_FRIEND = config.production + "/remove-friend";
}
export default class UserProfile extends Component {
  state = {
    isFriend: false,
    pending: false,
    firstname: "",
    lastname: "",
    username: "",
    uuid: ""
  };
  removeFriend = async () => {
    const token = await AsyncStorage.getItem("token");
    fetch(DELETE_FRIEND, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        relationid: this.state.uuid
      })
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        //console.log(data);
        if (data.success) this.setState({ pending: false, isFriend: false });
      });
  };
  sendFriendRequest = async () => {
    const token = await AsyncStorage.getItem("token");
    const friendid = this.props.navigation.getParam("id", 0);
    fetch(SEND_FRIEND_REQUEST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        friendid
      }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        //console.log(data);
        if (data.success) {
          this.setState({ pending: true, uuid: data.relation_id });
        }
      });
  };
  getUserInfo = async () => {
    const token = await AsyncStorage.getItem("token");
    const personid = this.props.navigation.getParam("id", 0);
    fetch(GET_USER_INFO, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        personid
      }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        //console.log("Ress hhmhmm", data);
        this.setState({
          firstname: data.data[0].firstname,
          lastname: data.data[0].lastname,
          username: data.data[0].username,
          pending:
            data.status.length == 0
              ? false
              : data.status[0].status == 0
              ? true
              : false,
          isFriend:
            data.status.length == 0
              ? false
              : data.status[0].status == 3
              ? true
              : false,
          uuid: data.status.length > 0 ? data.status[0].uuid : ""
        });
      });
  };
  componentDidMount() {
    this.getUserInfo();
  }
  render() {
    const addIcon = (
      <FontAwesome name="plus" color="white" style={{ marginRight: 10 }} />
    );
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "stretch" }}
      >
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <View
              style={{
                flex: 2,

                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Avatar size="large" rounded title="BH" />
            </View>
            <View
              style={{
                flex: 4,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10
              }}
            >
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                {this.state.firstname + " " + this.state.lastname}
              </Text>
              <Text>@{this.state.username}</Text>
              <Button
                buttonStyle={{
                  borderRadius: 25,
                  width: 150,
                  backgroundColor: "#d95fbe"
                }}
                icon={
                  !this.state.isFriend && !this.state.pending ? addIcon : null
                }
                iconLeft={true}
                title={
                  !this.state.isFriend && !this.state.pending
                    ? "Add friend"
                    : this.state.pending
                    ? "Cancel"
                    : this.state.isFriend
                    ? "Unfriend"
                    : ""
                }
                onPress={() => {
                  !this.state.isFriend && !this.state.pending
                    ? this.sendFriendRequest()
                    : this.state.pending
                    ? this.removeFriend()
                    : this.state.isFriend
                    ? this.removeFriend()
                    : "";
                }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <View
              style={{
                flex: 3,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={{ fontSize: 20 }}>Avg: 7.0</Text>
            </View>
            <View
              style={{
                flex: 3,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={{ fontSize: 20 }}>Public Avg:7.0</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 3.5, paddingTop: 20, flexDirection: "column" }}>
          <View style={{ borderBottomColor: "#b2b2b2", borderBottomWidth: 1 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                paddingLeft: 20,
                paddingBottom: 10
              }}
            >
              Past Public Post
            </Text>
          </View>

          <ScrollView>
            <UserPastPost />
          </ScrollView>
        </View>
      </View>
    );
  }
}
