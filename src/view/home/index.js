/**
 * Created by jmxb on 2017/4/4.
 * 开心每一天
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    Modal,
    ListView,
    Navigator,
    ActivityIndicator
} from 'react-native';
import NavBar from '../navBar';
import HalfHourHot from './halfHourHot';
import FetchData from '../../utils/fetchData';
import HomeCell from '../components/homeCell';
import {PullList} from 'react-native-pull';
import Loading from '../components/loading';
import Detail from '../components/detail'

const { width, height } = Dimensions.get('window');

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2}),
            loaded: false,
            isHalfHourHotModal: false,
            isSiftModal: false,
        };
        this.data = [];
        this.getHomeList();
        
    }
    getHomeList(resolve){
        FetchData.getData('https://guangdiu.com/api/getlist.php', {"count" : 10}, {}).then((res) => {
            console.log(res)
            // 清空数组
            this.data = [];
            // 拼接数据
            this.data = this.data.concat(res.data);
            // 重新渲染
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.data),
                loaded:true,
            });
            // 关闭刷新动画
            if (resolve !== undefined){
                setTimeout(() => {
                    resolve();
                }, 1000);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    loadMoreData(value){
        FetchData.getData('https://guangdiu.com/api/getlist.php', {"count" : 10, "sinceid" : value}, {}).then((res) => {
            console.log(res)
            // 清空数组
            this.data = [];
            // 拼接数据
            this.data = this.data.concat(res.data);
            // 重新渲染
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.data),
                loaded:true,
            });
        }).catch((err) => {
            console.log(err);
        })
    }
    // 显示筛选菜单
    showSiftMenu() {
        console.log('筛选')
        this.setState({
            isSiftModal:true,
        })
    }
    pushToHalfHourHot(){
        this.setState({
            isHalfHourHotModal: true
        })
    }
    // 返回左边按钮
    renderLeftItem() {
        return(
            <TouchableOpacity
                onPress={() => {this.pushToHalfHourHot()}}
            >
                <Image source={{uri:'hot_icon_20x20'}} style={styles.navbarLeftItemStyle} />
            </TouchableOpacity>
        );
    }
    // 返回中间按钮
    renderTitleItem() {
        return(
            <TouchableOpacity
                onPress={() => {this.showSiftMenu()}}
            >
                <Image source={{uri:'navtitle_home_down_66x20'}} style={styles.navbarTitleItemStyle} />
            </TouchableOpacity>
        );
    }
    // 返回右边按钮
    renderRightItem() {
        return(
            <TouchableOpacity
                onPress={()=>{}}
            >
                <Image source={{uri:'search_icon_20x20'}} style={styles.navbarRightItemStyle} />
            </TouchableOpacity>
        );
    }

    closeModal(data){
        this.setState({
            isHalfHourHotModal: data
        })
    }
    pushToDetail(id){
        console.log(id);
        this.props.navigator.push({
            component: Detail,
            params: {
                url: `https://guangdiu.com/api/showdetail.php?id=${id}`
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
                    onPullRelease={(resolve) => this.getHomeList(resolve)}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    showsHorizontalScrollIndicator={false}
                    style={styles.listViewStyle}
                    initialListSize={5}
                    renderHeader={this.renderHeader}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={60}
                    renderFooter={this.renderFooter}
                />
            );
        }
    }
    // 返回每一行cell的样式
    renderRow(rowData) {
        return(
            <TouchableOpacity
                onPress={() => this.pushToDetail(rowData.id)}
            >
                <HomeCell
                    image={rowData.image}
                    title={rowData.title}
                    mall={rowData.mall}
                    pubTime={rowData.pubtime}
                    fromSite={rowData.fromsite}
                />
            </TouchableOpacity>
        );
    }
    // ListView尾部
    renderFooter() {
        return (
            <View style={{height: 100}}>
                <ActivityIndicator />
            </View>
        );
    }
    render(){
        return(
            <View style={styles.container}>
                <Modal
                    animationType='slide'
                    transparent={false}
                    visible={this.state.isHalfHourHotModal}
                    onRequestClose={() => this.onRequestClose()}
                >
                    <Navigator
                        initialRoute={{
                            name: 'halfHourHot',
                            component: HalfHourHot
                        }}
                        renderScene={(route, navigator) => {
                            let Component = route.component;
                            return <Component
                                removeModal={(data) => this.closeModal(data)}
                                {...route.params}
                                navigator={navigator} />
                        }} />
                </Modal>
                <NavBar
                    leftItem = {() => this.renderLeftItem()}
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
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },

    navbarLeftItemStyle: {
        width: 20,
        height: 20,
        marginLeft: 15,
    },
    navbarTitleItemStyle: {
        width: 66,
        height: 20,
    },
    navbarRightItemStyle: {
        width: 20,
        height: 20,
        marginRight: 15,
    },

    listViewStyle: {
        width: width,
    },
})
