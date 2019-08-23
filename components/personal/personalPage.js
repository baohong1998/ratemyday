import React, {Component} from 'react';
import {Dimensions,Animated, StyleSheet, Text, View } from 'react-native';
import {Button} from 'react-native-elements'
import styles from '../../AppStyle'
import {createStackNavigator, createAppContainer} from 'react-navigation'
import { Input } from 'react-native-elements';
import moment from 'moment';
import {Interactable} from 'react-interactable'
import Cursor from '../rateSlider/cursor'
export default class PersonalPage extends Component{
    constructor(){
        super()
        this.state={
            date: moment().format('ddd, MMMM Do YYYY'),
            rating: 1,
            cursorPos: 0,
            comment: ""
        }
    }
    setRate= (x)=>{
        this.setState({
            rating:x,
            
        })
    }
    setPos= (x)=>{
        this.setState({
            cursorPos: x
        })
    }
    submitComment=(e)=>{
        console.log(e)
        this.setState({
            comment: e.nativeEvent.text
        })
    }
    render(){
        const x = new Animated.Value(this.state.cursorPos)
        const {height, width} = Dimensions.get('window')
        const sliderBarWidth = width -50.0;
        return(
            <React.Fragment>
        
                <View style={styles.dateRateContainer}>
                    <View style={styles.dateContainer}>
                        <Text style={{fontSize: 25, alignSelf:"center"}}>{this.state.date}</Text>
                    </View>
                    <View style={styles.rateContainer}> 
                        <Text style={{fontSize: 25, alignSelf:"center"}}>{this.state.rating}</Text>
                    </View>
                   
                </View>
                <View style={styles.slideRateContainer}>
                    <View style={styles.sliderContainer}>
                        <Animated.View 
                            style={{
                                ...StyleSheet.absoluteFillObject,
                                backgroundColor:'#d95fbe',
                                borderRadius: 50/2,
                                width: sliderBarWidth,
                                height: 50,
                                marginLeft: 25,
                                marginRight:25
                            }}
                        />
                            
                        <Cursor size={sliderBarWidth} margin={25} {...{x}} setPos={this.setPos} setRate={this.setRate}/>
                    </View>
                </View>
                {/* <View>
                    <Text>{this.state.comment}</Text>
                </View> */}
                <View style={styles.commentContainer}>
                  
                    <Input
                        placeholder='Thoughts on the rating?'
                        inputStyle={styles.input}
                        containerStyle={styles.commentInputContainer}
                        inputContainerStyle={styles.inputWrapper}
                        onSubmitEditing={this.submitComment}
                    />
                </View>
                <View style={styles.postButtonContainer}>
                    <Button title="Private" buttonStyle={styles.postButton}/>
                    <Button title="Public" buttonStyle={styles.postButton}/>
                </View>
                <View style={styles.historyButtonContainer}>
                    <Button title="View your history" buttonStyle={styles.historyButton}/>
                    
                </View>
                
       
            </React.Fragment>
        )
    }
}