/**
 * Created by jmxb on 2017/4/4.
 * 开心每一天
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Navigator,
    Image
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Home from '../home';
import HT from '../ht';
import HourList from '../hourList';

const INT_ROUTER = {
  component: Home,
};

export default class TabBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedTab:'home',
        };
    }
    // 返回TabBar的Item
    renderTabBarItem = (title, selectedTab, image, selectedImage, component) => {
        return(
            <TabNavigator.Item
                selected={this.state.selectedTab === selectedTab}
                title={title}
                selectedTitleStyle={{color:'black'}}
                renderIcon={() => <Image source={{uri:image}} style={styles.tabbarIconStyle} />}
                renderSelectedIcon={() => <Image source={{uri:selectedImage}} style={styles.tabbarIconStyle} />}
                onPress={() => this.setState({ selectedTab: selectedTab })}>
                <Navigator
                    initialRoute={{
                        name:selectedTab,
                        component:component
                    }}
                    renderScene={(route, navigator) => {
                        let Component = route.component;
                        return <Component {...route.params} navigator={navigator} />
                    }}
                />
            </TabNavigator.Item>
        );
    }
    
    render(){
        return(
            <TabNavigator>
                {/* 首页 */}
                {this.renderTabBarItem("首页", 'home', 'tabbar_home_30x30', 'tabbar_home_selected_30x30', Home)}
                {/* 海淘 */}
                {this.renderTabBarItem("海淘", 'ht', 'tabbar_abroad_30x30', 'tabbar_abroad_selected_30x30', HT)}
                {/* 小时风云榜 */}
                {this.renderTabBarItem("小时风云榜", 'hourlist', 'tabbar_rank_30x30', 'tabbar_rank_selected_30x30', HourList)}
            </TabNavigator>
        )
    }
}

const styles = StyleSheet.create({
	container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    tabbarIconStyle: {
        width: global.__IOS__? 30 : 25,
        height:global.__IOS__? 30 : 25,
    }
})
