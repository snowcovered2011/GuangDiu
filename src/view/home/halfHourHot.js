/**
 * Created by jmxb on 2017/4/5.
 * 开心每一天
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ListView,
    ActivityIndicator
} from 'react-native';
import {PullList} from 'react-native-pull';
import NavBar from '../navBar';
import FetchData from '../../utils/fetchData';
import HotCell from '../components/hotCell';
import Loading from '../components/loading';
import Detail from '../components/detail'

const { width, height } = Dimensions.get('window');

export default class HalfHourHot extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2}),
            loaded: false
        };
        this.getListData();
    }
    getListData = (resolve) =>{
        FetchData.getData('http://guangdiu.com/api/gethots.php', {}, {}).then((res) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(res.data),
                    loaded:true,
                });
                if (resolve !== undefined){
                    setTimeout(() => {
                        resolve();  // 关闭动画
                    }, 1000);
                }
        }).catch((err) => {
            console.log(err);
        })
    }
    // 返回中间按钮
    renderTitleItem() {
        return(
            <Text style={styles.navbarTitleItemStyle}>近半小时热门</Text>
        );
    }
    // 返回右边按钮
    renderRightItem() {
        return(
        <TouchableOpacity
            onPress={()=>{this.popToHome(false)}}
        >
            <Text style={styles.navbarRightItemStyle}>关闭</Text>
        </TouchableOpacity>
        );
    }
    popToHome(data) {
        this.props.removeModal(data);
    }
    pushToDetail(id){
        this.props.navigator.push({
            component:Detail,
            params: {
                url: `https://guangdiu.com/api/showdetail.php?id= ${id}`
            }
        })
    }
    // 根据网络状态决定是否渲染 listview
    renderListView() {
        if (this.state.loaded === false) {
            return(
                <Loading />
            );
        }else {
            return(
                <PullList
                    onPullRelease={(resolve) => {this.getListData(resolve)}}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    showsHorizontalScrollIndicator={false}
                    style={styles.listViewStyle}
                    initialListSize={5}
                    renderHeader={this.renderHeader}
                />
            );
        }
    }
    // 返回 listview 头部
    renderHeader = () => {
        return (
            <View style={styles.headerPromptStyle}>
                <Text>根据每条折扣的点击进行统计,每5分钟更新一次</Text>
            </View>
        );
    }
    // 返回每一行cell的样式
    renderRow = (rowData)  => {
        return(
            <TouchableOpacity
                onPress={() => this.pushToDetail(rowData.id)}
            >
                <HotCell
                    image={rowData.image}
                    title={rowData.title}
                />
            </TouchableOpacity>
        );
    }
    render(){
        return(
            <View style={styles.container}>
                {/* 导航栏样式 */}
                <NavBar
                    titleItem = {() => this.renderTitleItem()}
                    rightItem = {() => this.renderRightItem()}
                />
                {this.renderListView()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
	container: {
        flex:1,
        alignItems: 'center',
    },

    navbarTitleItemStyle: {
        fontSize: 17,
        color: 'black',
        marginLeft: 50
    },
    navbarRightItemStyle: {
        fontSize: 17,
        color: 'rgba(123,178,114,1.0)',
        marginRight: 15
    },

    listViewStyle: {
        width: width,
    },

    headerPromptStyle: {
        height: 44,
        width: width,
        backgroundColor: 'rgba(239,239,239,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
