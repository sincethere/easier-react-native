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
    Image,
    Dimensions
} from 'react-native';

import {
    TitleBar,
    Loading,
    InitUtil
} from 'easier-react-native';

class BaseComponent extends Component {

    constructor(props) {
        super(props);

        this.SCREEN_WIDTH = Dimensions.get('window').width;
        this.SCREEN_HEIGHT = Dimensions.get('window').height;

        this.config = this.titleBarConfig();

        this.state = {
            pointerEvents: false
        };

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
        if (!this.config) {
            this.config = {
                title: {
                    title: ''
                }
            }
        }

        if (this.props.navigator.getCurrentRoutes().length > 1) {
            this.config.leftButton = {
                ...this._getBackButtonConfig(this.config.leftButton),
                ...this.config.leftButton
            };
        }

        let backgroundImage = null;
        if (this.backgroundImage) {
            backgroundImage = (<Image style={styles.backgroundImage} source={this.backgroundImage} />);
        }

        let loadingView = (loadingCover, isScreen) => {
            let view = (<Loading ref='loading' loadingStyle={loadingCover === 'full-screen' ? undefined : styles.loadingStyle} />);

            if ((isScreen && loadingCover === 'full-screen') || (!isScreen && loadingCover !== 'full-screen')) {
                return view;
            } else {
                return null;
            }

        }

        return (
            <View style={styles.container}>
                {backgroundImage}
                <TitleBar
                    ref = 'title'
                    {...this.config}
                    title = {{
                            ...this.config.title,
                            title: this.title ? this.title : this.config.title && this.config.title.title ? this.config.title.title : ''
                    }}
                    navigator={this.props.navigator}
                />
                <View style={styles.body}>
                    {this.renderBody()}
                    {loadingView(this.loadingCover, false)}
                </View>
                {loadingView(this.loadingCover, true)}
            </View>
        );
    }

    setBackgroundImage(source) {
        this.backgroundImage = source;
    }

    setLoadingCover(loadingCover) {
        this.loadingCover = loadingCover;
    }

    getTitleBar() {
        return this.refs['title'];
    }

    setTitleBar(props) {
        this.config = props;
    }

    titleBarConfig() {
        return {};
    }

    renderBody() {
        return (<View />);
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
            let isList = name.indexOf('.') != -1;
            let Component = null;
            if (isList) {
                let names = isList ? name.split('.') : '';
                Component = InitUtil.ComponentManifest[names[0]];
                for (let i = 1; i < names.length; i++) {
                    Component = Component[names[i]];
                }
            } else {
                Component = InitUtil.ComponentManifest[name];
            }
            if (!!props && props.isTop) {
                let newRoutes = [];
                this.props.navigator.immediatelyResetRouteStack(newRoutes);
            }
            this.props.navigator.push({
                name: name,
                component: Component,
                props: props
            })
        }
    }

    finish() {
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
                let Component = InitUtil.ComponentManifest[name];
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
        backgroundColor: 'transparent',
        width: Dimensions.get('window').width
    },
    backgroundImage: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
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
    },
    loadingStyle: {
        top: Dimensions.get('window').height / 2 - TitleBar.NAV_HEIGHT - Loading.LOADING_HEIGHT / 2,
    }
});

module.exports = BaseComponent;
