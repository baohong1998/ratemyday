import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import styles from "../../AppStyle";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Input } from "react-native-elements";

const config = require("../../config/config.json");
var REG_URL;
if (process.env.NODE_ENV === "development") {
  REG_URL = config.development + "/create-account";
} else {
  REG_URL = config.production + "/create-account";
}
export default class SubmitSignup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      confirm: "",
      errMess: ""
    };
    this.pass = React.createRef();
    this.confirm = React.createRef();
  }

  register = () => {
    const { navigation } = this.props;
    const first = navigation.getParam("first", "");
    const last = navigation.getParam("last", "");
    const email = navigation.getParam("email", "");
    const gender = navigation.getParam("gender", "");
    const phone = navigation.getParam("phone", "");
    const birthday = navigation.getParam("birthday", "");
    const { username, password, confirm } = this.state;
    console.log(first, last, email, phone, gender, birthday);
    if (username === "" || password === "" || confirm === "") {
      this.setState({ errMess: "Please enter username and password" });
      return;
    }
    if (confirm !== password) {
      this.setState({ errMess: "Password doesn't match" });
      return;
    }
    fetch(REG_URL, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
        email,
        phone,
        first,
        last,
        gender,
        birthday
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        if (data.success) {
          this.props.navigation.navigate("Home");
        } else {
          const errArr = data.err.sqlMessage.split(" ");
          const err = errArr[errArr.length - 1];
          console.log(err);
          if (err === "'email'") {
            this.setState({ errMess: "Email already used" });
          } else if (err === "'username'") {
            this.setState({ errMess: "Username already used" });
          } else if (err === "'phone'") {
            this.setState({ errMess: "Phone number already used" });
          }
        }
      });

    //this.props.navigation.navigate("Home");
  };
  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="never">
        <View style={{ ...styles.container, marginTop: 100 }}>
          <Text style={styles.homeLogo}>Logo</Text>
          <Input
            placeholder="Username"
            inputStyle={styles.input}
            onSubmitEditing={() => this.pass.current.focus()}
            containerStyle={styles.inputContainer}
            onChange={e =>
              this.setState({ username: e.nativeEvent.text, errMess: "" })
            }
            inputContainerStyle={styles.inputWrapper}
            returnKeyType="next"
          />
          <Input
            placeholder="Password"
            ref={this.pass}
            inputStyle={styles.input}
            onChange={e =>
              this.setState({ password: e.nativeEvent.text, errMess: "" })
            }
            onSubmitEditing={() => this.confirm.current.focus()}
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.inputWrapper}
            returnKeyType="next"
            secureTextEntry={true}
          />
          <Input
            placeholder="Confirm"
            ref={this.confirm}
            inputStyle={styles.input}
            containerStyle={styles.inputContainer}
            onChange={e => {
              this.setState({ confirm: e.nativeEvent.text, errMess: "" });
            }}
            returnKeyType="done"
            errorMessage={this.state.errMess}
            secureTextEntry={true}
            inputContainerStyle={styles.inputWrapper}
          />

          <Button
            onPress={this.register}
            title="Submit"
            buttonStyle={styles.loginButton}
          />
        </View>
      </ScrollView>
    );
  }
}
