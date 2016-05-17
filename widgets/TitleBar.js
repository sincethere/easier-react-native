/**
 * Created by wenxucheng@163.com on 16/2/25.
    API:
    extends NavBar API:
       style - (Object, Array) - Style object or array of style objects
       tintColor - (String) - NavigationBar's tint color
       statusBar - (Object):
           style - ('light-content' or 'default') - Style of statusBar
           hidden - (Boolean)
           tintColor - (String) - Status bar tint color
           hideAnimation - ('fade', 'slide', 'none') - Type of statusBar hide animation
           showAnimation - ('fade', 'slide', 'none') - Type of statusBar show animation
       leftButton / rightButton - (Object, React Element) - Either plain object with configuration, or React Element which will be used as a custom left/right button element. Configuration object has following keys:
           title - (String) - Button's title
           tintColor - (String) - Button's text color
           titleStyle - (Object, Array) - Style object or array of style objects
           style - (Object, Array) - Style object or array of style objects
           handler - (Function) - onPress function handler
       title - (Object, React Element) - Either plain object with configuration, or React Element which will be used as a custom title element. Configuration object has following keys:
           title - (String) - Button's title
           tintColor - (String) - Title's text color
           hidden - (Boolean)

    new API：
        leftButton / rightButton：
            hidden - (Boolean) - hidden button
            extends Button all API

        bottomLine - (any) - boolean: Whether show default bottom line
						 - string: show bottom line backgroundColor
						 - object: show bottom line style
						 - element: show bottom view

    method:
        setTitle(props) - update title
        setLeftButton(props) - update leftButton
        setRightButton(props) - update rightButton
        getTitleProps() - get title current props
        getLeftButtonProps - get leftButton current props
        getRightButtonProps - get RightButtonProps current props

 */
'use strict';

import React, {Component} from 'react';

import {
    StyleSheet,
    View,
} from 'react-native';

import {
    NavBar,
    Button
} from 'easier-react-native';

class TitleBar extends Component {

    static NAV_BAR_HEIGHT = NavBar.NAV_BAR_HEIGHT;
    static STATUS_BAR_HEIGHT = NavBar.STATUS_BAR_HEIGHT;
    static NAV_HEIGHT = NavBar.NAV_HEIGHT;

    constructor(props) {
        super(props);console.log("titlebar props", props);

        this._initLeftButton(props);
        this._initRightButton(props);

        this.state = {
            title: this.props.title,
            leftButton: this.leftButton ? this.leftButton : this.props.leftButton,
            rightButton: this.rightButton ? this.rightButton : this.props.rightButton
        }
    }

    render() {
        let bottomLine = null;
        if (this.props.bottomLine) {
            if (typeof(this.props.bottomLine) == 'string') {
                bottomLine = (<View style={[styles.horizonLine, {backgroundColor: this.props.bottomLine}]} />);
            } else if (typeof(this.props.bottomLine) == 'boolean' && this.props.bottomLine == true) {
                bottomLine = (<View style={styles.horizonLine} />);
            } else if (typeof(this.props.bottomLine) == 'object') {
                if (this.props.bottomLine.type) {//if have type, the type is element
                    bottomLine = this.props.bottomLine;
                } else {
                    bottomLine = (<View style={[styles.horizonLine, this.props.bottomLine]} />);
                }
            }
        }
        return (
            <View>
                <NavBar
                    {...this.props}
                    title = {{...this.state.title}}
                    leftButton = {!!this.state.leftButton ? {...this.state.leftButton} : this.state.leftButton}//undefined不能...展开，但必须是state属性，so...
                    rightButton = {!!this.state.rightButton ? {...this.state.rightButton} : this.state.rightButton}
                />
                {bottomLine}
            </View>
        );
    }

    setTitle(props) {
        if (typeof(props) == "string") {
            props = {
                title: props
            };
        } else if (typeof(props) == "element") {
            this.setState({
                title: props,
            });
            return;
        }
        this.setState({
            title: {
                ...this.state.title,
                ...props
            }
        });
    }

    setLeftButton(props) {
        if (props == null) {
            props = (<View />);
        }
        this._initLeftButton({leftButton: {...props}});
        this.setState({
            leftButton: this.leftButton ? this.leftButton : props.leftButton
        });
    }

    setRightButton(props) {
        if (props == null) {
            props = (<View />);
        }
        this._initRightButton({rightButton: {...props}});
        this.setState({
            rightButton: this.rightButton ? this.rightButton : props.rightButton
        });
    }

    getTitleProps() {
        return this.state.title.ptops;
    }

    getLeftButtonProps() {
        return this.state.leftButton.props;
    }

    getRightButtonProps() {
        return this.state.rightButton.props;
    }

    _initLeftButton(props) {
        this.leftButton = !!props && !!props.leftButton ? props.leftButton : undefined;
        //判断leftButton.type是否存在，如果存在，则为自定义view，如果title存在，则为文字按钮
        if(!!props && !!props.leftButton && !this.leftButton.type && !props.leftButton.title) {
            this.leftButton = this._getButton(props.leftButton);
        }

    }

    _initRightButton(props) {
        this.rightButton = !!props && !!props.rightButton ? props.rightButton : undefined;

        if(!!props && !!props.rightButton && !this.rightButton.type && !props.rightButton.title) {
            this.rightButton = this._getButton(props.rightButton);
        }

    }

    _getButton(props) {
        if (props && props.hidden) {
            return (<View />);
        }
        return (
            <Button
               source={{color: 'transparent'}}
               onPress={()=> {
                   if (!!props && !!props.handler) {
                       props.handler();
                   }
               }}
               {...props}
              style={[styles.btnBg, props.style]}
              imgStyle={[styles.btnImage, props.imgStyle]}
            />
        );
    }

}

const styles = StyleSheet.create({
    btnBg: {
        width: 40,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    btnImage: {
        width: 20,
        height: 20
    },
    btnBackImage: {
        width: 12,
        height: 20
    },
    horizonLine: {
        backgroundColor: 'gray',
        height: 1,
        flex: 1,
    },
});

module.exports = TitleBar;
