/**
 * Created by jmxb on 2017/4/4.
 * 开心每一天
 */

import React, { Component, PropTypes } from 'react';
import {
    Text,
    View,
    Dimensions,
    StyleSheet,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default class Feed extends Component{
    static propTypes = {
        leftItem:PropTypes.func,
        titleItem:PropTypes.func,
        rightItem:PropTypes.func,
    };

    // 左边
    renderLeftItem() {
        if (this.props.leftItem === undefined) return;
        return this.props.leftItem();
    }

    // 中间
    renderTitleItem() {
        if (this.props.titleItem === undefined) return;
        return this.props.titleItem();
    }

    // 右边
    renderRightItem() {
        if (this.props.rightItem === undefined) return;
        return this.props.rightItem();
    }

    render() {
        return (
            <View style={styles.container}>
                {/* 左边 */}
                <View>
                    {this.renderLeftItem()}
                </View>
                {/* 中间 */}
                <View>
                    {this.renderTitleItem()}
                </View>
                {/* 右边 */}
                <View>
                    {this.renderRightItem()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
	container: {
        width: width,
        height: global.__IOS__ ? 64 : 44,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        paddingTop: global.__IOS__  ? 15 : 0,
    },
})
