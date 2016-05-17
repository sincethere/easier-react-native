import React, {Component, PropTypes} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';

export default class NavbarButton extends Component {
  render() {
    const { style, titleStyle, tintColor, margin, title, handler } = this.props;

    if (!title) {
        return (<View />)
    }

    return (
      <TouchableOpacity style={styles.navBarButton} onPress={handler}>
        <View style={[,style]}>
          <Text style={[styles.navBarButtonText, { color: tintColor, }, titleStyle]}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    tintColor: PropTypes.string,
    title: PropTypes.string,
    handler: PropTypes.func,
  };

  static defaultProps = {
    style: {},
    title: '',
    tintColor: '#0076FF',
    onPress: () => ({}),
  };
}
