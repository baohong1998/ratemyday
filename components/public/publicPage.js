import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Button } from "react-native-elements";
import styles from "../../AppStyle";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Input } from "react-native-elements";
import moment from "moment";
import PostElement from "./postElement";

export default class PublicPage extends Component {
  constructor() {
    super();
    this.state = {
      peopleList: [
        {
          post_id: "1",
          user_id: 3,
          username: "hongbao",
          first: "Bao",
          last: "Hong",
          rating: 5,
          comment: "I don't know",
          numPublicRatings: 155,
          avgPublicRatings: 8.5
        },
        {
          post_id: "2",
          user_id: 3,
          username: "hongbao",
          first: "Bao",
          last: "Hong",
          rating: 5,
          comment: "I don't know",
          numPublicRatings: 155,
          avgPublicRatings: 8.5
        },
        {
          post_id: "3",
          user_id: 3,
          username: "hongbao",
          first: "Bao",
          last: "Hong",
          rating: 5,
          comment: "I don't know",
          numPublicRatings: 155,
          avgPublicRatings: 8.5
        }
      ]
    };
  }
  _keyExtractor = (item, index) => item.post_id;

  _renderItem = ({ item }) => (
    <PostElement
      id={item.post_id}
      name={item.first + " " + item.last}
      username={item.username}
      rating={item.rating}
      comment={item.comment}
      numPublicRatings={item.numPublicRatings}
      avgPublicRatings={item.avgPublicRatings}
    />
  );
  render() {
    return (
      <React.Fragment>
        <FlatList
          style={{
            marginTop: 10
          }}
          contentContainerStyle={{
            alignItems: "stretch",
            justifyContent: "center"
          }}
          data={this.state.peopleList}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </React.Fragment>
    );
  }
}
