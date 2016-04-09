/**
 * 统一log和toast
 */
'use strict';
import React, {
    Alert
} from 'react-native';
module.exports = {
    alert: (message, title, callbackArray) => {
        if(!title){
            title = '温馨提示';
        }
        Alert.alert(title, message, callbackArray);
    }
};