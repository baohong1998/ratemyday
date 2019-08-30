import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TextInput,
  ScrollView
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import styles from '../../AppStyle';
import FriendElement from './friendElement';
export default class SearchList extends Component {
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
      <FlatList
        contentContainerStyle={{
          alignItems: 'stretch',
          justifyContent: 'center',
          marginHorizontal: 10,
          marginTop: 10
        }}
        data={this.props.searchList}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}
