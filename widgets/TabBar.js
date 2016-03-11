'use strict';

import React, {
    Component,
    PropTypes,
    View,
    StyleSheet,
    Dimensions,
    TouchableHighlight,
    Text,
    Image,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const TAB_HEIGHT = 56;

const itemShape = {
    style: PropTypes.object,
    title: PropTypes.string,
    titleColor: PropTypes.string,
    titleSelected: PropTypes.string,
    image: PropTypes.any,
    selectedImage: PropTypes.any
}

class TabBar extends Component {

    static defaultProps = {
        tabItems: [],
        index: 0,
        tintColor: 'transparent'
    };

    static propTypes = {
        tabItems: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.shape(itemShape), PropTypes.element])),
        tintColor: PropTypes.string,
        style: PropTypes.object,
        handler: PropTypes.func,
        index: PropTypes.number,
    };

    constructor(props) {
        super(props);
        this.state = {
            tabSelectedIndex: this.props.index
        };
    }

    componentDidMount() {
        if (this.props.handler) {
            this.props.handler(this.state.tabSelectedIndex);
        }
    }

    render() {
        const items = this.props.tabItems.map(
            (item,i) => {
                return (
                    <TouchableHighlight
                        key={i}
                        underlayColor='transparent'
                        style={[styles.tabBarItem, item.style]}
                        onPress={() => {
                            this.setState({tabSelectedIndex: i,});
                            this.index = i;
                            if (this.props.handler) {
                                this.props.handler(i);
                            }
                        }}>
                        {this._getItemView(item, i)}
                    </TouchableHighlight>
                );
            }
        );

        return (
            <View style={[styles.tabBar,
                {backgroundColor: this.props.tintColor},
                this.props.style]} >
                {items}
            </View>
        );
    }

    getCurrentIndex() {
        return this.index;
    }

    _getItemView(item, index) {
        if (!!item.props) {
          return <View style={styles.center}>{item}</View>;
        }
        return (
            <View style={styles.center}>
                {item.image ? (
                        <Image style={styles.tabImage}
                            source={this.state.tabSelectedIndex === index ? item.selectedImage : item.image}/>
                    ) : undefined}
                {item.title ? (
                    <Text style={[styles.tabText, {
                            color: this.state.tabSelectedIndex === index ?
                            (item.titleSelected ? item.titleSelected : 'red') :
                            (item.titleColor ? item.titleColor : 'black')
                        }]}>
                        {item.title}
                    </Text>
                ) : undefined}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabBar: {
        flexDirection: 'row',
        width: SCREEN_WIDTH,
        height: TAB_HEIGHT
    },
    tabBarItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabImage: {
        width: 24,
        height: 24,
    },
    tabText: {
        fontSize: 13,
    },
});

module.exports = TabBar;
