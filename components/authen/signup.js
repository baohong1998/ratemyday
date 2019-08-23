import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Button} from 'react-native-elements'
import styles from '../../AppStyle'
import {createStackNavigator, createAppContainer} from 'react-navigation'
import { Input } from 'react-native-elements';
export default class SignupScreen extends Component {
    goback = ()=>{
        this.props.navigation.navigate('Home')
    }
    goNext = ()=>{
        this.props.navigation.navigate('UserPass')
    }
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.homeLogo}>Logo</Text>
                <Input
                    placeholder='First Name'
                    inputStyle={styles.input}
                    containerStyle={styles.inputContainer}
                    inputContainerStyle={styles.inputWrapper}
                />
                <Input
                    placeholder='Last Name'
                    inputStyle={styles.input}
                    containerStyle={styles.inputContainer}
                    inputContainerStyle={styles.inputWrapper}
                />
                <Input
                    placeholder='Email Address'
                    inputStyle={styles.input}
                    containerStyle={styles.inputContainer}
                    inputContainerStyle={styles.inputWrapper}
                />
                <Input
                    placeholder='Phone Number'
                    inputStyle={styles.input}
                    containerStyle={styles.inputContainer}
                    inputContainerStyle={styles.inputWrapper}
                />
                <Input
                    placeholder='Gender'
                    inputStyle={styles.input}
                    containerStyle={styles.inputContainer}
                    inputContainerStyle={styles.inputWrapper}
                />
                <Input
                    placeholder='Birthday'
                    inputStyle={styles.input}
                    containerStyle={styles.inputContainer}
                    inputContainerStyle={styles.inputWrapper}
                />
               
                <Button onPress={this.goNext} title="Next" buttonStyle={styles.loginButton}/>
            </View>
        )
    }

}