import React, { Component } from 'react';
import { StyleSheet, Text, FlatList, View } from 'react-native';
import FriendElement from './friendElement';

export default class FriendList extends Component {
  _keyExtractor = (item, index) => item.user_id;

  _renderItem = ({ item }) => (
    <FriendElement
      id={item.user_id}
      name={item.first + ' ' + item.last}
      username={item.username}
      navigation={this.props.navigation}
    />
  );
  render() {
    return (
      <View style={{ margin: 15 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Friends list</Text>
        <FlatList
          style={{
            marginTop: 10
          }}
          contentContainerStyle={{
            alignItems: 'stretch',
            justifyContent: 'center'
          }}
          data={this.props.friendList}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}
