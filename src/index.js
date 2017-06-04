/**
 * Created by jmxb on 2017/04/4
 * 开心每一天
 */

import { AppRegistry } from 'react-native';
import GuangDiu from './view/tabBar';

if (!__DEV__) {
    global.console = {
        info: () => {},
        log: () => {},
        warn: () => {},
        error: () => {},
    };
}


AppRegistry.registerComponent('GuangDiu', () => GuangDiu);