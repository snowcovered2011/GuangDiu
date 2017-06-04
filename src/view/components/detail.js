/**
 * Created by jmxb on 2017/4/9.
 * 开心每一天
 */

import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    WebView,
    View,
    Text,
    TouchableOpacity,
    DeviceEventEmitter,
} from 'react-native';
import NavBar from '../navBar';

export default class Detail extends Component{
    constructor(props){
        super(props);
    }
    static propTypes = {
        url:PropTypes.string,
    };
        componentWillMount() {
        // 发送通知
        DeviceEventEmitter.emit('isHiddenTabBar', true);
    }

    componentWillUnmount() {
        // 发送通知
        DeviceEventEmitter.emit('isHiddenTabBar', false);
    }
        // 返回
    pop() {
        this.props.navigator.pop();
    }
        // 返回左边按钮
    renderLeftItem() {
        return(
            <TouchableOpacity
                onPress={() => {this.pop()}}
            >
                <Text>返回</Text>
            </TouchableOpacity>
        );
    }
    render() {
        return(
            <View style={styles.container}>
                {/* 导航栏 */}
                <NavBar
                    leftItem = {() => this.renderLeftItem()}
                />

                {/* 初始化WebView */}
                <WebView
                    style={styles.webViewStyle}
                    source={{url:this.props.url, method: 'GET' }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    scalesPageToFit={false}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1
    },

    webViewStyle: {
        flex:1
    }
});