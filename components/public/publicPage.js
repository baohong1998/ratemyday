import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Button} from 'react-native-elements'
import styles from '../../AppStyle'
import {createStackNavigator, createAppContainer} from 'react-navigation'
import { Input } from 'react-native-elements';
import moment from 'moment'

export default class PublicPage extends Component{
    render(){
        return(
            <React.Fragment>
                <View style={styles.container}>
                    <Text>Public</Text>
                    
                </View>
            </React.Fragment>
        )
    }
}