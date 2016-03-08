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
    ComponentManifest
} from 'easier-react-native'

const styles = StyleSheet.create({
    containerCenter: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

module.exports = {
    init(name) {
        if (!ComponentManifest[name]) {
            return (
                <View style={styles.containerCenter}>
                    <Text>The component {name} is not found!</Text>
                </View>
            );
        }
        return (
            <Navigator
                initialRoute={{ name: name, component: ComponentManifest[name] }}
                renderScene={(route, navigator) => {
                    let Component = route.component;
                    return <Component {...route.props} navigator={navigator} />
            }}/>
        );
    }
};
