'use strict';

import React, {
    Component,
    View,
    PropTypes,
} from 'react-native';

class ViewStack extends Component {
    static defaultProps = {

    };
    static propTypes = {
        stack: PropTypes.array
    };

    constructor(props) {
        super(props);
        this.index = -1;
        this.state = {
            body: (<View />)
        }
    }

    render() {
        return (
            <View style={this.props.style}>
                {this.state.body}
            </View>
        );
    }

    replaceStack(index, isNew) {
        this.index = index ? index : 0;
        this.setState({
            body: this.props.stack[index]
        });
    }

    getCurrentIndex() {
        return this.index;
    }

    getStack(index) {
        return this.props.data[index ? index : this.index];
    }


}


module.exports = ViewStack;
