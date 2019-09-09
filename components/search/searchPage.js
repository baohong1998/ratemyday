import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TextInput,
  ScrollView,
  TouchableHighlight,
  AsyncStorage,
  RefreshControl
} from "react-native";
import { Button, Input } from "react-native-elements";
import styles from "../../AppStyle";
import { createStackNavigator, createAppContainer } from "react-navigation";

import moment from "moment";
import { Ionicons } from "@expo/vector-icons";

import FriendList from "./friendList";
import SearchList from "./searchList";
const config = require("../../config/config.json");
var GET_SEARCH_LIST;
var GET_FRIEND_LIST;
if (process.env.NODE_ENV === "development") {
  GET_SEARCH_LIST = config.development + "/search-user";
  GET_FRIEND_LIST = config.development + "/get-friend-list";
} else {
  GET_SEARCH_LIST = config.production + "/search-user";
  GET_FRIEND_LIST = config.production + "/get-friend-list";
}

export default class SearchPage extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      isSearch: false,
      searchList: [],
      friendList: [],
      pendList: [],
      refreshing: false
    };
  }
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
        if (status === 3)
          this.setState({
            friendList: data.data
          });
        else if (status === 1)
          this.setState({
            pendList: data.data
          });
      });
  };

  getSearchList = async query => {
    const token = await AsyncStorage.getItem("token");

    fetch(GET_SEARCH_LIST, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        query
      }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({
          searchList: data.data
        });
      });
  };
  componentDidMount() {
    this.getFriendList(3);

    this.getFriendList(1);
  }
  reload = () => {
    this.getFriendList(3);

    this.getFriendList(1);
    this.setState({ refreshing: false });
  };
  _onRefresh = onRefresh => {
    this.setState({ refreshing: true });
    this.reload();
  };
  render() {
    //console.log(this.props);
    return (
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        <View
          style={{
            height: 50,
            backgroundColor: "#fff",
            borderBottomColor: "#ededed",
            borderBottomWidth: 1,
            flexDirection: "row"
          }}
        >
          <Ionicons
            name="ios-search"
            color="#000"
            size={32}
            style={{ marginVertical: 7, marginLeft: 7 }}
          />
          <TextInput
            placeholder="Search"
            onFocus={() => this.setState({ isSearch: true })}
            onChangeText={value => this.getSearchList(value)}
            style={{
              flex: 1,
              backgroundColor: "#ededed",
              alignItems: "center",
              borderRadius: 20,
              margin: 7,
              paddingHorizontal: 10
            }}
            returnKeyType="done"
            editable={true}
          />
          {this.state.isSearch ? (
            <TouchableHighlight
              onPress={() => this.setState({ isSearch: false })}
              style={{ justifyContent: "center" }}
            >
              <Text style={{ fontSize: 18, marginEnd: 10 }}>Cancel</Text>
            </TouchableHighlight>
          ) : null}
        </View>
        {this.state.isSearch ? (
          <SearchList
            navigation={this.props.navigation}
            searchList={this.state.searchList}
          />
        ) : (
          <View>
            <FriendList
              listName={"Pending List"}
              navigation={this.props.navigation}
              list={this.state.pendList}
              reload={this.reload}
            />
            <FriendList
              listName={"Friends List"}
              navigation={this.props.navigation}
              list={this.state.friendList}
              reload={this.reload}
            />
          </View>
        )}
      </ScrollView>
    );
  }
}
