import React, { Component } from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import { Button } from "react-native-elements";
import styles from "../../AppStyle";

export default class HomeScreen extends Component {
  toLogin = () => {
    this.props.navigation.navigate("Auth");
  };
  toSignUp = () => {
    this.props.navigation.navigate("BasicInfo");
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.homeLogo}>Logo</Text>

        <Button
          onPress={this.toLogin}
          title="Get started"
          buttonStyle={styles.homeButton}
        />

        <Button
          onPress={this.toSignUp}
          title="Sign up"
          buttonStyle={styles.homeButton}
        />
      </View>
    );
  }
}
