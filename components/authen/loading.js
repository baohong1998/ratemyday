import React, { Component } from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";

export default class Loading extends Component {
  componentDidMount() {
    this.checkToken();
  }
  checkToken = async () => {
    const userToken = await AsyncStorage.getItem("token");
    this.props.navigation.navigate(userToken ? "App" : "Authen");
  };
  render() {
    return <View></View>;
  }
}
