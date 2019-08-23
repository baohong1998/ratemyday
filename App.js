import React, {Component} from 'react';
import { StyleSheet, Text, View , Button} from 'react-native';
import styles from './AppStyle'
import {createStackNavigator, createAppContainer, createSwitchNavigator, createBottomTabNavigator} from 'react-navigation'
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import HomeScreen from './components/authen/Homescreen'
import LoginScreen from './components/authen/login'
import SignupScreen from './components/authen/signup'
import SubmitSignup from './components/authen/submitSignup'
import PersonalPage from './components/personal/personalPage'
import PublicPage from './components/public/publicPage'
import SearchPage from './components/search/searchPage'
import SettingPage from './components/setting/settingPage'
import {FontAwesome} from '@expo/vector-icons'
export default class App extends Component {
  render(){
    return (
   
        <AppContainer/>
      
      
    );
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
})
const PageNavigator = createBottomTabNavigator({
  Personal: {
    screen: PersonalPage,
    navigationOptions: ()=>({
      tabBarIcon:()=>(<FontAwesome name="user" size={26}/>)
    })
  },
  Public: {
    screen: PublicPage,
    navigationOptions: ()=>({
      tabBarIcon:()=>(
        <FontAwesome name="group" size={26}/>
      )
    })
  },
  Search: {
    screen: SearchPage,
    navigationOptions: ()=>({
      tabBarIcon:()=>(
        <FontAwesome name="search" size={26}/>
      )
    })
  },
  Settings:{
    screen: SettingPage,
    navigationOptions: ()=>({
      tabBarIcon:()=>(
        <FontAwesome name="cog" size={26}/>
      )
    })
  } 
})
const AuthNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ()=>({
      header: null
    })
  },

  Auth: {
    screen: LoginScreen,
    navigationOptions: ()=>({
      header: null
    })
  },
  BasicInfo: {
    screen: SignupScreen,
    navigationOptions: ()=>({
      header: null
    })
  },
  UserPass: {
    screen: SubmitSignup,
    navigationOptions: ()=>({
      header: null
    })
  },
})
const AppNavigator = createSwitchNavigator({
 
  Auth: AuthNavigator,
  App: PageNavigator,
  Logout: LogoutNavigator
  
})


const AppContainer = createAppContainer(AppNavigator)

