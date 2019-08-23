import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View, Animated} from 'react-native';
import {Button} from 'react-native-elements'
import styles from '../../AppStyle'
import {createStackNavigator, createAppContainer} from 'react-navigation'
import Interactable from 'react-interactable'


export default class Cursor extends React.PureComponent{
    calRate=(e)=>{
        console.log(e)
        
        this.props.setRate(e.index +1)
    }
    calPos=(e)=>{
        this.props.setPos(e.x)
    }
    render(){
        
        const {x,size,margin} = this.props
        const snapPoints = new Array(10).fill(0).map((e,i)=>({x:i*(size/10)+margin}))
        var endPoints = size-margin;
        return(
            <Interactable.View onSnap={this.calRate} frictionAreas={[{damping: 0.5, influenceArea: {top: 0}}]} onDrag={this.calPos} {...{snapPoints}}  initialPosition={{x:0+margin}} animatedValueX={x} boundaries={{left:0+margin, right:endPoints}} horizontalOnly>
                <Animated.View style={styles.cursor}/>

                
            </Interactable.View>
        )
    }
}