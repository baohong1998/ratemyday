import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TextInput,
  ScrollView,
  TouchableHighlight
} from "react-native";
import { Button, Input } from "react-native-elements";
import styles from "../../AppStyle";
import { createStackNavigator, createAppContainer } from "react-navigation";

import moment from "moment";
import { Ionicons } from "@expo/vector-icons";

import FriendList from "./friendList";
import SearchList from "./searchList";
export default class SearchPage extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      isSearch: false,
      friendList: [
        {
          user_id: "8",
          username: "hmmNice",
          first: "Bao",
          last: "Hong"
        },
        {
          user_id: "9",
          username: "hmmNice",
          first: "Bao",
          last: "Hong"
        },
        {
          user_id: "2",
          username: "hmmNice",
          first: "Bao",
          last: "Hong"
        },
        {
          user_id: "3",
          username: "hmmNice",
          first: "Bao",
          last: "Hong"
        },
        {
          user_id: "10",
          username: "hmmNice",
          first: "Bao",
          last: "Hong"
        },
        {
          user_id: "11",
          username: "hmmNice",
          first: "Bao",
          last: "Hong"
        },
        {
          user_id: "15",
          username: "hmmNice",
          first: "Bao",
          last: "Hong"
        }
      ]
    };
  }

  render() {
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
            onChangeText={value => this.setState({ query: value })}
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
          <SearchList searchList={this.state.friendList} />
        ) : (
          <FriendList friendList={this.state.friendList} />
        )}
      </ScrollView>
    );
  }
}
