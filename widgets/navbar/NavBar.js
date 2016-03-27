/**
 * API：
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
 */
'use strict';

import React from 'react-native';
const {
  PixelRatio,
  StatusBar,
  Component,
  Text,
  View,
  PropTypes,
  Platform
} = React;
import NavBarButton from './NavBarButton';
import styles from './styles';

const ButtonShape = {
  title: PropTypes.string.isRequired,
  titleStyle: PropTypes.any,
  style: PropTypes.any,
  handler: PropTypes.func,
};

const TitleShape = {
  title: PropTypes.string.isRequired,
  tintColor: PropTypes.string,
};

const StatusBarShape = {
  style: PropTypes.oneOf(['light-content', 'default', ]),
  hidden: PropTypes.bool,
  tintColor: PropTypes.string,
  hideAnimation: PropTypes.oneOf(['fade', 'slide', 'none', ]),
  showAnimation: PropTypes.oneOf(['fade', 'slide', 'none', ])
};

function customizeStatusBar(data) {
  if (Platform.OS === 'ios') {
    if (data.style) {
      StatusBar.setBarStyle(data.style, true);
    }
    const animation = data.hidden ?
    (data.hideAnimation || NavBar.defaultProps.statusBar.hideAnimation) :
    (data.showAnimation || NavBar.defaultProps.statusBar.showAnimation);

    StatusBar.setHidden(data.hidden, animation);
  }
}

class NavBar extends Component {

    static NAV_BAR_HEIGHT = styles.NAV_BAR_HEIGHT;
    static STATUS_BAR_HEIGHT = styles.STATUS_BAR_HEIGHT;
    static NAV_HEIGHT = styles.NAV_HEIGHT;

  componentDidMount() {
    customizeStatusBar(this.props.statusBar);
  }

  componentWillReceiveProps(props) {
    customizeStatusBar(this.props.statusBar);
  }

  getButtonElement(data = {}, style=null) {
    if (!!data.props) {
      return <View style={styles.NavBarButton}>{data}</View>;
    }

    return <NavBarButton
      title={data.title}
      tintColor={data.tintColor}
      titleStyle={data.titleStyle}
      style={[data.style, style, ]}
      handler={data.handler} />;
  }

  getTitleElement(data) {
    if (!!data.props) {
      return <View style={styles.customTitle}>{data}</View>;
    }

    const colorStyle = data.tintColor ? { color: data.tintColor, } : null;
    return (
      <Text
        style={[styles.navBarTitleText, colorStyle, ]}>
        {data.title ? data.title : ''}
      </Text>
    );
  }

  render() {
    const customTintColor = this.props.tintColor ?
      { backgroundColor: this.props.tintColor } : null;

    const customStatusBarTintColor = this.props.statusBar.tintColor ?
      { backgroundColor: this.props.statusBar.tintColor } : null;

    const statusBar = Platform.OS === 'ios' && !this.props.statusBar.hidden ?
      <View style={[styles.statusBar, customStatusBarTintColor ]} /> : null;

    return (
      <View style={[styles.navBarContainer, customTintColor, ]}>
        {statusBar}
        <View style={[styles.navBar, this.props.style, ]}>
          {this.getTitleElement(this.props.title)}
          {this.getButtonElement(this.props.leftButton, { marginLeft: 8, })}
          {this.getButtonElement(this.props.rightButton, { marginRight: 8, })}
        </View>
      </View>
    );
  }

  static propTypes = {
    tintColor: PropTypes.string,
    statusBar: PropTypes.shape(StatusBarShape),
    leftButton: PropTypes.oneOfType([
      PropTypes.shape(ButtonShape),
      PropTypes.element,
    ]),
    rightButton: PropTypes.oneOfType([
      PropTypes.shape(ButtonShape),
      PropTypes.element,
    ]),
    title: PropTypes.oneOfType([
      PropTypes.shape(TitleShape),
      PropTypes.element,
    ]),
  };

  static defaultProps = {
    statusBar: {
      style: 'default',
      hidden: false,
      hideAnimation: 'slide',
      showAnimation: 'slide',
    },
    title: {
      title: '',
    },
  };
}
module.exports = NavBar;
