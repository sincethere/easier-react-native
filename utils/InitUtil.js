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

    ComponentManifest: ComponentManifest,

    init(name, manifest) {
        if (!manifest) {
            return (
                <View style={styles.containerCenter}>
                    <Text>Parameters must be passed in the component list</Text>
                </View>
            );
        }

        Object.assign(ComponentManifest, manifest);

        let isList = name.indexOf('.') != -1;
        let component = null;
        if (isList) {
            let names = isList ? name.split('.') : '';
            component = ComponentManifest[names[0]];
            for (let i = 1; i < names.length; i++) {
                component = component[names[i]];
            }
        } else {
            component = ComponentManifest[name];
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
                initialRoute={{ name: name, component: component }}
                renderScene={
                    (route, navigator) => {
                        let Component = route.component;
                        return <Component {...route.props} navigator={navigator} />
                    }
                }
                configureScene={
                    (route) => {
                        if (route.sceneConfig) {
                            return route.sceneConfig;
                        }
                        return Navigator.SceneConfigs.FloatFromRight;
                    }
                }
            />
        );
    }
};
