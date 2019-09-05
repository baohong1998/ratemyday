import React, { Component } from "react";
import { StyleSheet, Text, View, Button, AsyncStorage } from "react-native";
import styles from "./AppStyle";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
  NavigationEvents
} from "react-navigation";
import createAnimatedSwitchNavigator from "react-navigation-animated-switch";
import Loading from "./components/authen/loading";
import HomeScreen from "./components/authen/Homescreen";
import LoginScreen from "./components/authen/login";
import SignupScreen from "./components/authen/signup";
import SubmitSignup from "./components/authen/submitSignup";
import PersonalPage from "./components/personal/personalPage";
import PublicPage from "./components/public/publicPage";
import SearchPage from "./components/search/searchPage";
import SettingPage from "./components/setting/settingPage";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import PersonalHistory from "./components/history/personalHistory";
import UserProfile from "./components/otherUser/userProfile";
import NotificationPage from "./components/notification/notificationPage";

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
// const SignupNavigator = createStackNavigator({
//   BasicInfo: {
//       screen : SignupScreen,
//       navigationOptions: ()=>({
//         header: null,

//       })
//   },
//   UserPass: SubmitSignup
// })
const LogoutNavigator = createSwitchNavigator({
  Home: HomeScreen
});
const SearchNavigtor = createStackNavigator({
  SearchPage: {
    screen: SearchPage,
    navigationOptions: () => ({
      header: null
    })
  },
  UserProfile: {
    screen: UserProfile,
    navigationOptions: () => ({
      header: null
    })
  }
});
const PublicNavigator = createStackNavigator({
  PublicPage: {
    screen: PublicPage,
    navigationOptions: () => ({
      header: null
    })
  },
  UserProfile: {
    screen: UserProfile,
    navigationOptions: () => ({
      header: null
    })
  }
});
const PageNavigator = createBottomTabNavigator({
  Personal: {
    screen: PersonalPage,
    navigationOptions: () => ({
      tabBarIcon: () => <FontAwesome name="user" size={26} />
    })
  },

  Public: {
    screen: PublicNavigator,
    navigationOptions: () => ({
      tabBarIcon: () => <FontAwesome name="group" size={26} />
    })
  },
  History: {
    screen: PersonalHistory,
    navigationOptions: () => ({
      tabBarIcon: () => (
        <MaterialCommunityIcons name="calendar-clock" size={26} />
      )
    })
  },
  Search: {
    screen: SearchNavigtor,
    navigationOptions: () => ({
      tabBarIcon: () => <FontAwesome name="search" size={26} />
    })
  },
  Notifications: {
    screen: NotificationPage,
    navigationOptions: () => ({
      tabBarIcon: () => <FontAwesome name="bell" size={26} />
    })
  }
});
const StackPageNavigator = createStackNavigator(
  {
    Settings: {
      screen: SettingPage,
      navigationOptions: () => ({
        title: "Moodometer"
      })
    },
    PageNavigator: {
      screen: PageNavigator,
      navigationOptions: ({ navigation }) => {
        return {
          title: "Moodometer",
          headerBackTitle: null,
          headerBackImage: null,
          headerRight: (
            <FontAwesome
              name="cog"
              size={26}
              style={{ marginRight: 20 }}
              onPress={() => {
                navigation.navigate("Settings");
              }}
            />
          )
        };
      }
    }
  },
  {
    initialRouteName: "PageNavigator"
  }
);
const AuthNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      header: null
    })
  },

  Auth: {
    screen: LoginScreen,
    navigationOptions: () => ({
      header: null
    })
  },
  BasicInfo: {
    screen: SignupScreen,
    navigationOptions: () => ({
      header: null
    })
  },
  UserPass: {
    screen: SubmitSignup,
    navigationOptions: () => ({
      header: null
    })
  }
});

const AppNavigator = createSwitchNavigator({
  Load: Loading,
  Authen: AuthNavigator,
  App: StackPageNavigator,
  Logout: LogoutNavigator
});

const AppContainer = createAppContainer(AppNavigator);
