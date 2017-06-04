/**
 * Created by jmxb on 17/4/9.
 * 开心每一天
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

export default class Loading extends Component {

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.textStyle}>加载中...</Text>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },

    textStyle: {
        fontSize:21,
        color:'gray'
    }
});