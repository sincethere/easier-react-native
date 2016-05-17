'use strict';

import React, {Component} from 'react';

import {
    Dimensions,
    StyleSheet,
    View,
    Platform,
    ActivityIndicatorIOS,
    ProgressBarAndroid
} from 'react-native';

class CircleProgress extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (Platform.OS === 'ios') {
            return (
                <ActivityIndicatorIOS
                    animating={true}
                    color='white'
                    style={styles.centering}
                    size='small'
                />
            );
        } else {
            return (
                <ProgressBarAndroid styleAttr="Inverse" color='white' />
            );
        }
    }

}

const styles = StyleSheet.create({
    container: {

    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: 40
    }

});

module.exports = CircleProgress;
