/**
 * Created by wen on 16/2/25.
 */
'use strict';

import React, {
    Component,
    PropTypes,
    StyleSheet,
    Dimensions,
    Image,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

import CircleProgress from './CircleProgress'

//屏幕宽度
const SCREEN_WIDTH = Dimensions.get('window').width;
//屏幕高度
const SCREEN_HEIGHT = Dimensions.get('window').height;
const NAV_BAR_HEIGHT = 39;
const STATUS_BAR_HEIGHT = 20;
const NAV_HEIGHT = NAV_BAR_HEIGHT + STATUS_BAR_HEIGHT;

class Loading extends Component {

    static defaultProps = {
        pointerEvents: false
    };
    static propTypes = {
        text: PropTypes.string,
        pointerEvents: PropTypes.bool,
        bottomStyle: PropTypes.any,
        loadingStyle: PropTypes.any,
    };

    constructor(props) {
        super(props);
        this.isShow = false;
        this.state = {
            loading: (<View />)
        }

    }

    render() {
        return this.state.loading;
    }

    show(text, pointerEvents) {
        if (typeof(text) == 'boolean') {
            pointerEvents = text;
            text = '';
        }
        text = text ? text : this.props.text;
        if (!this.isShow) {
            this.setState({
                loading: this._getLoading({
                    text: text,
                    pointerEvents: pointerEvents
                })
            });
            this.isShow = true;
        }
    }

    dismiss() {
        this.setState({
            loading: (<View />)
        });
        this.isShow = false;
    }

    isShow() {
        return this.isShow;
    }

    _getLoading(props) {
        return (
            <View pointerEvents={!!props && props.pointerEvents ? 'none' : 'auto'} style={styles.container}>
                <Image
                    source={require('./images/loading_bottom_bg.png')}
                    pointerEvents={'none'}
                    style={[styles.loadingBg, props.bottomStyle]} />
                <Image
                    source={require('./images/loading_bg.png')}
                    style={[styles.loadingBody, props.loadingStyle]}/>
                <View
                    style={[styles.loadingBody, props.loadingStyle]}>
                    <CircleProgress />
                    <Text style={styles.loadingText}>{!!props && props.text ? props.text : '加载中...'}</Text>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT
    },
    loadingBg: {
        position: 'absolute',
        top: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: 'transparent'
    },
    loadingBody: {
        width: 100,
        height: 80,
        position: 'absolute',
        top: SCREEN_HEIGHT / 2 - NAV_HEIGHT - 80 / 2,
        left: SCREEN_WIDTH / 2 - 120 / 2,
        borderRadius: 5,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingText: {
        color: 'white',
        backgroundColor: 'transparent'
    }
});

module.exports = Loading
