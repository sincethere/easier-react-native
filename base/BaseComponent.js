/**
 * Created by wenxucheng@163.com on 16/3/2.

    BaseComponent 是所有 Component 的基类

 */
'use strict';

import React, {
    Component,
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';

import {
    ComponentManifest,
    TitleBar,
    Loading
} from 'easier-react-native'

class BaseComponent extends Component {

    constructor(props) {
        super(props);

        this.SCREEN_WIDTH = Dimensions.get('window').width;
        this.SCREEN_HEIGHT = Dimensions.get('window').height;

        this.state = {
            body: undefined,
            pointerEvents: false
        }

    }

    render() {
        if (!this.props.navigator) {
            return (
                <View style={styles.containerCenter}>
                    <Text>The component is not init!</Text>
                </View>
            );
        }

        //get TitleBar configuration
        let titleBarConfig = this.titleBarConfig();
        if (this.props.navigator.getCurrentRoutes().length > 1) {
            titleBarConfig.leftButton = {
                ...this._getBackButtonConfig(titleBarConfig.leftButton),
                ...titleBarConfig.leftButton
            };
        }

        return (
            <View style={styles.container}>
                <TitleBar
                    ref = 'title'
                    {...titleBarConfig}
                    title = {{
                            ...titleBarConfig.title,
                            title: this.title ? this.title : titleBarConfig.title && titleBarConfig.title.title ? titleBarConfig.title.title : ''
                    }}
                    navigator={this.props.navigator}
                />
                <View style={styles.body}>
                    {this.state.body === undefined ? this.renderBody() : this.state.body}
                    <Loading ref='loading' />
                </View>
            </View>
        );
    }

    getTitleBar() {
        return this.refs['title'];
    }

    titleBarConfig() {
        return {};
    }

    renderBody() {
        return (<View />);
    }

    setBody(body) {
        this.setState({
            body: body
        });
    }

    setTitle(title) {
        if (this.state.title) {
            this.setState({
                title: title
            });
        }
    }

    startComponent(name, props) {
        if(this.props.navigator) {
            if (!!props && props.isTop) {
                let newRoutes = [];
                this.props.navigator.immediatelyResetRouteStack(newRoutes);
            }
            this.props.navigator.push({
                name: name,
                component: ComponentManifest[name],
                props: props
            })
        }
    }

    finish(name) {
        if(this.props.navigator) {
            this.props.navigator.pop();
        }
    }

    finishToBefore(name, props, index) {
        if(this.props.navigator) {
            let routes = this.props.navigator.getCurrentRoutes();
            let hasRoute = null;
            for (let i in routes) {
                if (routes[i]['name'] == name) {
                    hasRoute = routes[i];
                    break;
                }
            }
            if (hasRoute) {
                this.props.navigator.popToRoute(hasRoute);
            } else {
                let Component = ComponentManifest[name];
                let newRoute = {
                    name: name,
                    component: Component,
                    props: props
                };
                if (!index) {
                    // this.props.navigator.replace(newRoute);
                    index = routes.length > 2 ? routes.length - 2 : 0
                }
                this.props.navigator.replaceAtIndex(newRoute, index);
                this.props.navigator.popToRoute(newRoute);
            }
        }
    }

    getLoading() {
        return this.refs['loading'];
    }

    _getBackButtonConfig(props) {
        return {
            pressSource: require('./images/titlebar_btn_back_press.png'),
            source: require('./images/titlebar_btn_back.png'),
            imgStyle: styles.btnBackImage,
            onPress: ()=> {
                if (props && props.handler) {
                    if (props.handler()) {
                        return;
                    }
                }
                this.finish();
            }
        };
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    containerCenter: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    body: {
        backgroundColor: 'transparent',
        flex: 1
    },
    btnBackImage: {
        width: 12,
        height: 20,
    }
});

module.exports = BaseComponent
