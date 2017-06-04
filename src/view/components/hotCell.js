/**
 * Created by jmxb on 2017/4/9.
 * 开心每一天
 */

import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
} from 'react-native';
const {width, height} = Dimensions.get('window');

export default class HotCell extends Component{

    static propTypes = {
        image:PropTypes.string,
        title:PropTypes.string,
    };

    constructor(props){
        super(props);
    }
    
    render() {
        return (
            <View style={styles.container}>
                {/* 左边图片 */}
                <Image source={{uri:this.props.image === '' ? 'defaullt_thumb_83x83' : this.props.image}} style={styles.imageStyle} />
                {/* 中间的文中 */}
                <View>
                    <Text numberOfLines={3} style={styles.titleStyle}>{this.props.title}</Text>
                </View>
                {/* 右边的箭头 */}
                <Image source={{uri:'icon_cell_rightArrow'}} style={styles.arrowStyle} />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'white',
        height:100,
        width:width,
        borderBottomWidth:0.5,
        borderBottomColor:'gray',
        marginLeft:15

    },

    imageStyle: {
        width:70,
        height:70,
    },
    titleStyle: {
        width:width * 0.65,
    },
    arrowStyle: {
        width:10,
        height:10,
        marginRight:30
    }
});
