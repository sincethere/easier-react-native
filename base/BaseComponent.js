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
    InitUtil,
    Utils,
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

        this.requestPool = [];

        this._didFocusSubscription_ = easierNavigator.navigationContext.addListener('didfocus', () => {
            this._didFocusSubscription_.remove();
            if(this.componentDidFocus) {
                this.componentDidFocus();
            }
        });
    }

    render() {
        if (!easierNavigator) {
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

        if (easierNavigator.getCurrentRoutes().length > 1) {
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
                    navigator={easierNavigator}
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

    getLoading() {
        return this.refs['loading'];
    }

    showLoading(text, pointerEvents) {
        let loading = this.getLoading();
        if (loading) {
            loading.show(text, pointerEvents);
        }
    }

    dismissLoading() {
        let loading = this.getLoading();
        if (loading) {
            loading.dismiss();
        }
    }

    renderBody() {
        return (<View />);
    }

    startComponent(name, props) {
        let component = null;
        if (typeof(name) == 'string') {
            component = Utils.getComponentByName(name);
        } else {
            component = name;
            name = name.name;
        }
        if (component == null) {
            throw new Error('Component is null!');
        }
        if (!!props && props.isTop) {
            let newRoutes = [];
            easierNavigator.immediatelyResetRouteStack(newRoutes);
        }
        easierNavigator.push({
            name,
            component,
            props,
        });
    }

    finish() {
        easierNavigator.pop();
    }

    finishToBefore(name, props, index) {
        let routes = easierNavigator.getCurrentRoutes();
        let hasRoute = null;
        for (let i in routes) {
            if (routes[i]['name'] == name) {
                hasRoute = routes[i];
                break;
            }
        }
        if (hasRoute) {
            easierNavigator.popToRoute(hasRoute);
        } else {
            let component = Utils.getComponentByName(name);
            if (component == null) {
                throw new Error('Component is null!');
            }
            let newRoute = {
                name,
                component,
                props,
            };
            if (!index) {
                // easierNavigator.replace(newRoute);
                index = routes.length > 2 ? routes.length - 2 : 0
            }
            easierNavigator.replaceAtIndex(newRoute, index);
            easierNavigator.popToRoute(newRoute);
        }
    }

    finishToTop() {
        easierNavigator.popToTop();
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
        backgroundColor: '#f3f3f3',
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
