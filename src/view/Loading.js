/**
 * Created by jmxb on 2017/4/4.
 * 开心每一天
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';

export default class Loading extends Component{
    constructor(props){
        super(props);
    }
    
    
    render(){
        return(
            <View>
                <Text>加载中</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
	
})
