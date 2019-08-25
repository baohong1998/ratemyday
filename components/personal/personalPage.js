import React, { Component } from "react";
import {
  Dimensions,
  Animated,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableHighlight,
  Switch,
  Alert
} from "react-native";
import { Button } from "react-native-elements";
import styles from "../../AppStyle";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Input } from "react-native-elements";
import moment from "moment";
import { Interactable } from "react-interactable";
import Cursor from "../rateSlider/cursor";
import { KeyboardAccessoryView } from "react-native-keyboard-accessory";
import { Ionicons } from "@expo/vector-icons";

export default class PersonalPage extends Component {
  constructor() {
    super();
    this.state = {
      date: "",
      rating: 1,
      cursorPos: 0,
      comment: "",
      postedComment: "",
      inputHeight: 100,
      mode: "Private",
      isPublic: false,
      notEditing: true
    };
    this.inputKeyboard = React.createRef();
  }

  componentDidMount() {
    this.setState({
      date: moment().format("ddd, MMMM Do YYYY")
    });
  }
  setRate = x => {
    this.setState({
      rating: x,
      notEditing: false
    });
  };
  setPos = x => {
    this.setState({
      cursorPos: x
    });
  };
  activateKeyboard = () => {
    this.inputKeyboard.current.focus();
  };
  submitComment = e => {
    console.log(this.inputKeyboard);
    this.setState({
      postedComment: this.state.comment
    });
    Keyboard.dismiss();
  };
  updateSize = height => {
    this.setState({
      inputHeight: height
    });
  };
  savePost = () => {
    this.setState({
      notEditing: true
    });
  };
  render() {
    const x = new Animated.Value(this.state.cursorPos);
    const { height, width } = Dimensions.get("window");
    const sliderBarWidth = width - 50.0;

    return (
      <View style={styles.personalContainer}>
        <View style={styles.dateRateContainer}>
          <View style={styles.dateContainer}>
            <Text style={{ fontSize: 25, alignSelf: "center" }}>
              {this.state.date}
            </Text>
          </View>
          <View style={styles.rateContainer}>
            <Text style={{ fontSize: 25, alignSelf: "center" }}>
              {this.state.rating}
            </Text>
          </View>
        </View>
        <View style={styles.slideRateContainer}>
          <View style={styles.sliderContainer}>
            <Animated.View
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: "#d95fbe",
                borderRadius: 50 / 2,
                width: sliderBarWidth,
                height: 50,
                marginLeft: 25,
                marginRight: 25
              }}
            />

            <Cursor
              size={sliderBarWidth}
              margin={25}
              {...{ x }}
              setPos={this.setPos}
              setRate={this.setRate}
            />
          </View>
        </View>
        {/* <View>
                    <Text>{this.state.comment}</Text>
                </View> */}
        <ScrollView>
          <View style={styles.postButtonContainer}>
            <Text style={{ marginStart: 25, fontSize: 16 }}>
              Your post is currently{" "}
              {this.state.isPublic ? "Public" : "Private"}
            </Text>

            <Switch
              onChange={() => {
                Alert.alert(
                  "Are you sure?",
                  this.state.isPublic
                    ? "Your post will be Private"
                    : "Your post will be Public",
                  [
                    {
                      text: "Yes",
                      onPress: () =>
                        this.setState({ isPublic: !this.state.isPublic })
                    },
                    { text: "No" }
                  ]
                );
              }}
              value={this.state.isPublic}
              style={{ marginRight: 25 }}
            />
          </View>
          <View style={styles.commentContainer}>
            {this.state.postedComment !== "" ? (
              <View style={styles.postedComment}>
                <Text style={{ fontSize: 20 }}>{this.state.postedComment}</Text>
              </View>
            ) : null}
            <Button
              title={
                this.state.postedComment !== ""
                  ? "Edit your thoughts"
                  : "+ Add your thoughts on the rating"
              }
              titleStyle={{ color: "white" }}
              onPress={this.activateKeyboard}
              buttonStyle={styles.historyButton}
              containerStyle={styles.historyButtonContainer}
            />
          </View>
          <View style={styles.historyButtonContainer}>
            <Button
              disabled={this.state.notEditing}
              title="Save"
              buttonStyle={styles.historyButton}
              onPress={this.savePost}
            />
          </View>
        </ScrollView>
        <KeyboardAccessoryView bumperHeight={0}>
          <View
            style={{
              height: 50,
              backgroundColor: "white",
              flexDirection: "row",
              alignItems: "space-between",
              justifyContent: "center"
            }}
          >
            <TextInput
              placeholder="Thoughts on the rating?"
              onChangeText={value =>
                this.setState({ comment: value, notEditing: false })
              }
              style={{ ...styles.commentInput }}
              editable={true}
              multiline={true}
              ref={this.inputKeyboard}
              onContentSizeChange={e =>
                this.updateSize(e.nativeEvent.contentSize.height)
              }
            />
            <Ionicons
              name="md-send"
              style={{ margin: 5 }}
              color="#0e90ed"
              size={40}
              onPress={this.submitComment}
            />
          </View>
        </KeyboardAccessoryView>
      </View>
    );
  }
}
