import React, { Component } from "react";
import {
  Dimensions,
  Animated,
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  ScrollView
} from "react-native";
import { Button } from "react-native-elements";
import styles from "../../AppStyle";

import { Input } from "react-native-elements";
import moment from "moment";
import { Calendar } from "react-native-calendars";
import { KeyboardAccessoryView } from "react-native-keyboard-accessory";
import { Ionicons } from "@expo/vector-icons";

export default class PersonalHistory extends Component {
  render() {
    return (
      <React.Fragment>
        <View style={{ flex: 1 }}>
          <Calendar
            style={{ alignSelf: "stretch", paddingTop: 20 }}
            theme={{
              selectedDayBackgroundColor: "#00adf5",
              indicatorColor: "blue"
            }}
          />
          <View
            style={{
              alignSelf: "flex-start",
              backgroundColor: "white",
              flexDirection: "row",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              margin: 20,
              marginHorizontal: 5
            }}
          >
            <View
              style={{
                alignSelf: "flex-start",
                alignItems: "center",
                justifyContent: "center",
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: "white",
                shadowColor: "#000",
                margin: 20,
                shadowOffset: {
                  width: 0,
                  height: 2
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84
              }}
            >
              <Text style={{ fontSize: 25 }}>5</Text>
            </View>
            <View style={{ flex: 3, margin: 20 }}>
              <Text style={{ fontSize: 16 }}>Public</Text>
              <Text style={{ fontSize: 16 }}>456 Ratings</Text>
              <Text style={{ fontSize: 16 }}>Avg Public Score: 8.5</Text>
              <Text style={{ fontSize: 16, marginTop: 10 }}>
                "I don't know"
              </Text>
            </View>
          </View>
          {/* <View style={{ flex: 1.5 }}></View> */}
        </View>
      </React.Fragment>
    );
  }
}
