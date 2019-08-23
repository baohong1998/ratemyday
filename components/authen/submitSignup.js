import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Button} from 'react-native-elements'
import styles from '../../AppStyle'
import {createStackNavigator, createAppContainer} from 'react-navigation'
import { Input } from 'react-native-elements';
export default class SubmitSignup extends Component {
    register = ()=>{
        this.props.navigation.navigate("Home")
    }
    render(){
        
        return(
            <View style={styles.container}>
                <Text style={styles.homeLogo}>Logo</Text>
                <Input
                    placeholder='Username'
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
                <Input
                    placeholder='Confirm'
                    inputStyle={styles.input}
                    containerStyle={styles.inputContainer}
                    inputContainerStyle={styles.inputWrapper}
                />
                
                <Button onPress={this.register} title="Submit" buttonStyle={styles.loginButton}/>
            </View>
        )
        
    }
}
