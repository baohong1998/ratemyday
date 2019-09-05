import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TextInput,
  ScrollView,
  TouchableHighlight,
  AsyncStorage
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
if (process.env.NODE_ENV === "development") {
  GET_SEARCH_LIST = config.development + "/search-user";
} else {
  GET_SEARCH_LIST = config.production + "/search-user";
}

export default class SearchPage extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      isSearch: false,
      searchList: []
    };
  }
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

  render() {
    //console.log(this.props);
    return (
      <ScrollView style={{ flex: 1 }}>
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
          <FriendList navigation={this.props.navigation} />
        )}
      </ScrollView>
    );
  }
}
