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
           style - (Object, Array) - Style object or array of style objects
           handler - (Function) - onPress function handler
       title - (Object, React Element) - Either plain object with configuration, or React Element which will be used as a custom title element. Configuration object has following keys:
           title - (String) - Button's title
           tintColor - (String) - Title's text color

    new API：
        leftButton / rightButton：
            hidden - (Boolean) - hidden button
            extends Button all API

    method:
        setTitle(props) - update title
        setLeftButton(props) - update leftButton
        setRightButton(props) - update rightButton
        getTitleProps() - get title current props
        getLeftButtonProps - get leftButton current props
        getRightButtonProps - get RightButtonProps current props

 */
'use strict';

import React, {
    Component,
    StyleSheet,
    View,
} from 'react-native';

import {
    NavBar,
    Button
} from 'easier-react-native';

class TitleBar extends Component {

    constructor(props) {
        super(props);

        this._initLeftButton(props);
        this._initRightButton(props);

        this.state = {
            title: this.props.title,
            leftButton: this.leftButton ? this.leftButton : this.props.leftButton,
            rightButton: this.rightButton ? this.rightButton : this.props.rightButton
        }
    }

    render() {
        return (
            <NavBar
                {...this.props}
                title = {{...this.state.title}}
                leftButton = {!!this.state.leftButton ? {...this.state.leftButton} : this.state.leftButton}//undefined不能...展开，但必须是state属性，so...
                rightButton = {!!this.state.rightButton ? {...this.state.rightButton} : this.state.rightButton}
            />
        );
    }

    setTitle(props) {
        if (typeof(props) == "string") {
            props = {
                title: props
            };
        }
        this.setState({
            title: {
                ...this.state.title,
                ...props
            }
        });
    }

    setLeftButton(props) {
        console.log('--->setLeftButton():', props);
        this._initLeftButton({leftButton: {...props}});
        this.setState({
            leftButton: this.leftButton ? this.leftButton : props.leftButton
        });
    }

    setRightButton(props) {
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

        if(!!props && !!props.leftButton && !props.leftButton.title) {
            this.leftButton = this._getButton(props.leftButton);
        }

    }

    _initRightButton(props) {
        this.rightButton = !!props && !!props.rightButton ? props.rightButton : undefined;

        if(!!props && !!props.rightButton && !props.rightButton.title) {
            this.rightButton = this._getButton(props.rightButton);
        }

    }

    _getButton(props) {
        if (props && props.hidden) {
            return (<View />);
        }
        return (
            <Button
               style={styles.btnBg}
               imgStyle={styles.btnImage}
               source={{color: 'transparent'}}
               onPress={()=> {
                   if (!!props && !!props.handler) {
                       props.handler();
                   }
               }}
               {...props}
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
    }
});

module.exports = TitleBar;
