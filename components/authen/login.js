import React, { Component } from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import { Button } from "react-native-elements";
import styles from "../../AppStyle";
import { createStackNavigator, createAppContainer } from "react-navigation";

import { Input } from "react-native-elements";

const config = require("../../config/config.json");
var AUTH_URL;
if (process.env.NODE_ENV === "development") {
  AUTH_URL = config.development + "/authenticate";
} else {
  AUTH_URL = config.production + "/authenticate";
}
export default class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errMess: ""
    };
  }
  goNext = () => {
    const { username, password } = this.state;
    fetch(AUTH_URL, {
      method: "POST",
      body: JSON.stringify({
        username,
        password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data.success) {
          AsyncStorage.setItem("token", data.token);
          this.props.navigation.navigate("App");
        } else {
          console.log(data);
          if (data.err === "No results") {
            this.setState({
              errMess: "Username doesn't exist"
            });
          } else if (data.err === "Wrong password") {
            this.setState({
              errMess: "Incorrect password"
            });
          }
        }
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.homeLogo}>Logo</Text>
        <Input
          placeholder="Username or email"
          inputStyle={styles.input}
          containerStyle={styles.inputContainer}
          onChange={e =>
            this.setState({ username: e.nativeEvent.text, errMess: "" })
          }
          inputContainerStyle={styles.inputWrapper}
        />
        <Input
          placeholder="Password"
          inputStyle={styles.input}
          containerStyle={styles.inputContainer}
          onChange={e =>
            this.setState({ password: e.nativeEvent.text, errMess: "" })
          }
          inputContainerStyle={styles.inputWrapper}
          errorMessage={this.state.errMess}
          secureTextEntry={true}
        />
        <Text>Reset Password</Text>
        <Button
          onPress={this.goNext}
          title="Login"
          buttonStyle={styles.loginButton}
        />
      </View>
    );
  }
}
