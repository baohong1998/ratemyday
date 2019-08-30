import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import styles from '../../AppStyle';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Button, Avatar, Input } from 'react-native-elements';
import UserPastPost from './userPostList';
export default class UserProfile extends Component {
  state = {
    isFriend: false,
    pending: false
  };
  render() {
    const addIcon = (
      <FontAwesome name="plus" color="white" style={{ marginRight: 10 }} />
    );
    return (
      <View
        style={{ flex: 1, justifyContent: 'center', alignItems: 'stretch' }}
      >
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center'
            }}
          >
            <View
              style={{
                flex: 2,

                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Avatar size="large" rounded title="BH" />
            </View>
            <View
              style={{
                flex: 4,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10
              }}
            >
              <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                First Last
              </Text>
              <Text>@Username</Text>
              <Button
                buttonStyle={{
                  borderRadius: 25,
                  width: 150,
                  backgroundColor: '#d95fbe'
                }}
                icon={
                  !this.state.isFriend && !this.state.pending ? addIcon : null
                }
                iconLeft={true}
                title={
                  !this.state.isFriend && !this.state.pending
                    ? 'Add friend'
                    : this.state.pending
                    ? 'Cancel'
                    : this.state.isFriend
                    ? 'Unfriend'
                    : ''
                }
                onPress={() => {
                  !this.state.isFriend && !this.state.pending
                    ? this.setState({ pending: true })
                    : this.state.pending
                    ? this.setState({ pending: false })
                    : this.state.isFriend
                    ? this.setState({ isFriend: false })
                    : '';
                }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <View
              style={{
                flex: 3,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={{ fontSize: 20 }}>Avg: 7.0</Text>
            </View>
            <View
              style={{
                flex: 3,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={{ fontSize: 20 }}>Public Avg:7.0</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 3.5, paddingTop: 20, flexDirection: 'column' }}>
          <View style={{ borderBottomColor: '#b2b2b2', borderBottomWidth: 1 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
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
