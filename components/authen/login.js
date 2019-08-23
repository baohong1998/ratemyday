import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Button} from 'react-native-elements'
import styles from '../../AppStyle'
import {createStackNavigator, createAppContainer} from 'react-navigation'

import { Input } from 'react-native-elements';

export default class LoginScreen extends Component {
    goNext = ()=>{
       this.props.navigation.navigate('App')
    }
    render(){
        
        return(
            <View style={styles.container}>
                <Text style={styles.homeLogo}>Logo</Text>
                <Input
                    placeholder='Username or email'
                    inputStyle={styles.input}
                    containerStyle={styles.inputContainer}
                    inputContainerStyle={styles.inputWrapper}
                />
                <Input
                    placeholder='Password'
                    inputStyle={styles.input}
                    containerStyle={styles.inputContainer}
                    inputContainerStyle={styles.inputWrapper}
                />
                <Text>Reset Password</Text>
                <Button onPress={this.goNext} title="Login" buttonStyle={styles.loginButton}/>
            </View>
        )
    }

}