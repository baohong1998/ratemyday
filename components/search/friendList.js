import React, { Component } from "react";
import { StyleSheet, Text, FlatList, View, AsyncStorage } from "react-native";
import FriendElement from "./friendElement";

export default class FriendList extends Component {
  state = {
    list: []
  };
  componentWillReceiveProps(nextProps) {
    this.setState({ list: nextProps.list });
  }
  componentDidMount() {
    this.props.reload();
  }
  _keyExtractor = (item, index) => item.uuid;

  _renderItem = ({ item }) => (
    <FriendElement
      id={item.friend_id}
      uuid={item.uuid}
      name={item.firstname + " " + item.lastname}
      username={item.username}
      navigation={this.props.navigation}
      type={this.props.listName}
      reload={this.reload}
    />
  );
  reload = () => {
    this.props.reload();
  };

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
          data={this.state.list}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}
