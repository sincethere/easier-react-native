/**
 *  Tab
 */
'use strict'

import React, {
    StyleSheet,
    Component,
    View,
    Dimensions,
} from 'react-native';

class ViewStack extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        this.views = this.props.children.map(
            (child,i) => {
                var style = this.props.index === i ? styles.base : [styles.base,styles.gone];
                return (
                    <View
                        key={'view_' + i}
                        style={style}>
                        {child}
                    </View>
                );
            }
        );

        return (
            <View style={[styles.container,this.props.style]}>
                {this.views}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden'
    },
    base: {
        position: 'absolute',
        overflow: 'hidden',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    gone: {
        top: Dimensions.get('window').height,
        bottom: -Dimensions.get('window').height,
    }
});

module.exports = ViewStack;
