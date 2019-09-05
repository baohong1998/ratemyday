import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, Picker } from "react-native";
import { Button } from "react-native-elements";
import styles from "../../AppStyle";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Input } from "react-native-elements";
import DatePicker from "react-native-datepicker";
import RNPickerSelect from "react-native-picker-select";

export default class SignupScreen extends Component {
  constructor() {
    super();
    this.state = {
      first: "",
      last: "",
      email: "",
      phone: "",
      gender: "",
      birthday: "",
      errMess: false
    };
    this.last = React.createRef();
    this.email = React.createRef();
    this.phone = React.createRef();
    this.gender = React.createRef();
    this.birthday = React.createRef();
  }

  goback = () => {
    this.props.navigation.navigate("Home");
  };
  goNext = () => {
    const { first, last, email, phone, gender, birthday } = this.state;
    if (
      first === "" ||
      last === "" ||
      email === "" ||
      phone === "" ||
      gender === "" ||
      birthday === ""
    ) {
      this.setState({ errMess: "Please fill out all the require fields" });
      return;
    }
    this.props.navigation.navigate("UserPass", {
      first,
      last,
      email,
      phone,
      gender,
      birthday
    });
  };
  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="never">
        <View style={styles.container}>
          <Text style={styles.homeLogo}>Logo</Text>
          <Text style={{ color: "red", marginBottom: 20 }}>
            {this.state.errMess}
          </Text>
          <Input
            placeholder="First Name"
            onChange={e => this.setState({ first: e.nativeEvent.text })}
            inputStyle={styles.input}
            onSubmitEditing={() => {
              this.last.current.focus();
            }}
            returnKeyType="next"
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.inputWrapper}
          />
          <Input
            placeholder="Last Name"
            onChange={e => this.setState({ last: e.nativeEvent.text })}
            inputStyle={styles.input}
            onSubmitEditing={() => {
              this.email.current.focus();
            }}
            returnKeyType="next"
            ref={this.last}
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.inputWrapper}
          />
          <Input
            placeholder="Email Address"
            onChange={e => this.setState({ email: e.nativeEvent.text })}
            onSubmitEditing={() => {
              this.phone.current.focus();
            }}
            keyboardType="email-address"
            inputStyle={styles.input}
            ref={this.email}
            returnKeyType="next"
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.inputWrapper}
          />
          <Input
            placeholder="Phone Number"
            inputStyle={styles.input}
            returnKeyType="next"
            keyboardType="number-pad"
            ref={this.phone}
            onChange={e => {
              this.setState({ phone: e.nativeEvent.text });
            }}
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.inputWrapper}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: 333
            }}
          >
            <RNPickerSelect
              onValueChange={value => this.setState({ gender: value })}
              placeholder={{
                label: "Gender",
                value: null
              }}
              style={{
                inputIOS: {
                  ...styles.input,
                  color: "black",
                  marginBottom: 15,
                  width: 150
                }
              }}
              items={[
                { label: "Male", value: "Male", key: "Male" },
                { label: "Female", value: "Female", key: "Female" },
                { label: "Other", value: "Other", key: "Other" }
              ]}
            />
            {/* <Input
            placeholder="Birthday"
            inputStyle={styles.input}
            returnKeyType="done"
            ref={this.birthday}
            onChange={e => this.setState({ birthday: e.nativeEvent.text })}
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.inputWrapper}
          /> */}
            <DatePicker
              date={this.state.birthday}
              confirmBtnText="Confirm"
              customStyles={{
                dateInput: { ...styles.input }
              }}
              showIcon={false}
              placeholder="Birthday"
              cancelBtnText="Cancel"
              onDateChange={date => {
                this.setState({ birthday: date });
              }}
            />
          </View>

          <Button
            onPress={this.goNext}
            title="Next"
            buttonStyle={styles.loginButton}
          />
        </View>
      </ScrollView>
    );
  }
}
