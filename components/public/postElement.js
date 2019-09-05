import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { Button, Avatar } from "react-native-elements";
import styles from "../../AppStyle";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Input } from "react-native-elements";
import moment from "moment";

export default class PostElement extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          height: 300,
          margin: 5,
          paddingVertical: 5,

          backgroundColor: "white",
          flexDirection: "column",
          //   borderColor: "#e0e0e0",
          //   borderWidth: 1,
          borderRadius: 5,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84
        }}
      >
        <TouchableHighlight
          underlayColor="rgba(0,0,0,0)"
          style={{
            flex: 1
          }}
          onPress={() => this.props.navigation.navigate("UserProfile")}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              paddingHorizontal: 10,
              flexDirection: "row",
              alignSelf: "flex-start"
            }}
          >
            <Avatar
              size="small"
              rounded
              title="BH"
              containerStyle={{ alignSelf: "center", marginRight: 10 }}
            />
            <View style={{ justifyContent: "center" }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {this.props.name}
              </Text>
              <Text style={{ fontSize: 12, fontWeight: "100" }}>
                {this.props.username}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
        <View
          style={{
            flex: 3,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#d95fbe"
          }}
        >
          <Text style={{ color: "white", fontSize: 26 }}>
            {this.props.rating}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            paddingHorizontal: 10
          }}
        >
          <Text>{this.props.comment}</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderTopColor: "#e0e0e0",
            borderTopWidth: 1,
            paddingHorizontal: 10
          }}
        >
          <Text>{this.props.numPublicRatings} Ratings</Text>
          <Text>Avg rate {this.props.avgPublicRatings}</Text>
        </View>
      </View>
    );
  }
}
