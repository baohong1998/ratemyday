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
  AsyncStorage,
  Alert
} from "react-native";
import { Button } from "react-native-elements";
import styles from "../../AppStyle";

import moment from "moment";
import { Interactable } from "react-interactable";
import Cursor from "../rateSlider/cursor";
import { KeyboardAccessoryView } from "react-native-keyboard-accessory";
import { Ionicons } from "@expo/vector-icons";
const config = require("../../config/config.json");
var POST_PERSON_URL;
var GET_TODAY_POST;
var EDIT_TODAY_POST;
if (process.env.NODE_ENV === "development") {
  POST_PERSON_URL = config.development + "/post-personal-rating";
  GET_TODAY_POST = config.development + "/check-today-post";
  EDIT_TODAY_POST = config.development + "/edit-personal-rating";
} else {
  POST_PERSON_URL = config.production + "/post-personal-rating";
  GET_TODAY_POST = config.production + "/check-today-post";
  EDIT_TODAY_POST = config.production + "/edit-personal-rating";
}
export default class PersonalPage extends Component {
  constructor() {
    super();
    this.state = {
      post_id: "undefined",
      date: "",
      snapPoints: [],
      rating: "Give today a rating",
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
  shouldComponentUpdate(nextProps, nextState) {
    const { rating, comment, isPublic } = nextState;
    if (
      rating !== this.state.rating ||
      comment !== this.state.comment ||
      isPublic !== this.state.isPublic
    ) {
      this.setState({
        notEditing: false
      });
    }
    return true;
  }
  getSnapPoints = snapPoints => {
    this.setState({
      snapPoints
    });
  };
  getTodayPost = async () => {
    const token = await AsyncStorage.getItem("token");
    fetch(GET_TODAY_POST, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        if (data.data.length > 0) {
          this.setState({
            post_id: data.data[0].id,
            rating: data.data[0].rating,
            postedComment: data.data[0].reasons,
            isPublic: data.data[0].public === 1 ? true : false,
            mode: data.data[0].public === 1 ? "Public" : "Private",
            cursorPos:
              this.state.snapPoints.length > 0
                ? this.state.snapPoints[data.data[0].rating - 1].x
                : 0
          });
          this.setState({
            notEditing: true
          });
        }
      });
  };
  componentDidMount() {
    this.setState({
      date: moment().format("ddd, MMMM Do YYYY")
    });
    this.getTodayPost();
  }
  setRate = x => {
    this.setState({
      rating: x
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
  postNewPost = async () => {
    const token = await AsyncStorage.getItem("token");
    const { rating, postedComment, isPublic } = this.state;
    fetch(POST_PERSON_URL, {
      method: "POST",
      body: JSON.stringify({
        rating,
        reasons: postedComment,
        public: isPublic ? 1 : 0
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
      });
  };
  editPost = async () => {
    const token = await AsyncStorage.getItem("token");
    const { rating, postedComment, isPublic, post_id } = this.state;
    fetch(EDIT_TODAY_POST, {
      method: "PATCH",
      body: JSON.stringify({
        rating,
        reasons: postedComment,
        public: isPublic ? 1 : 0,
        post_id
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
      });
  };
  savePost = async () => {
    if (this.state.post_id === "undefined") {
      await this.postNewPost();
    } else {
      await this.editPost();
    }
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
              getSnapPoints={this.getSnapPoints}
              {...{ x }}
              setPos={this.setPos}
              val={
                typeof this.state.rating === "string" ? 1 : this.state.rating
              }
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
              onChangeText={value => this.setState({ comment: value })}
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
