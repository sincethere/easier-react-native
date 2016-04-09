/**
 * Created by apple on 16/3/29.
 */
'use strict';

import {
    InitUtil,
    BaseComponent,
} from 'easier-react-native';

module.exports = {
    getComponentByName(name) {
        if (!name) {
            return null;
        }
        let component = null;
        let isList = name.indexOf('.') != -1;
        if (isList) {
            let names = isList ? name.split('.') : '';
            component = InitUtil.ComponentManifest[names[0]];
            for (let i = 1; i < names.length; i++) {
                component = component[names[i]];
            }
        } else {
            component = InitUtil.ComponentManifest[name];
        }
        return component;
    },
    getNavigator() {
        return global.easierNavigator;
    }
};
