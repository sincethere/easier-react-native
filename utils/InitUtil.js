/**
 * Created by wen on 16/3/2.
 */
'use strict';

import React, {
    Navigator,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {
    StorageUtil,
    Utils,
} from 'easier-react-native';

const styles = StyleSheet.create({
    containerCenter: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const ComponentManifest = {};

module.exports = {

    ComponentManifest,

    init(name, manifest) {
        //初始化storage
        !global.storage && StorageUtil.init();

        if (!manifest) {
            return (
                <View style={styles.containerCenter}>
                    <Text>The InitUtil.init() must be have component manifest!</Text>
                </View>
            );
        }

        Object.assign(ComponentManifest, manifest);

        let component = null;
        if (typeof(name) == 'string') {
            component = Utils.getComponentByName(name);
        } else {
            component = name;
            name = name.name;
        }

        if (!component) {
            return (
                <View style={styles.containerCenter}>
                    <Text>The component {name} is not found!</Text>
                </View>
            );
        }

        return (
            <Navigator
                initialRoute={{ name, component }}
                renderScene={
                    (route, navigator) => {
                        global.easierNavigator = navigator;
                        let Component = route.component;
                        return <Component {...route.props} navigator={navigator} />
                    }
                }/>
        );
    },

    initStorage(storageConfig) {
        StorageUtil.init(storageConfig);
        return this;
    }
};
