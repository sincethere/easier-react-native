/**
    Created by wenxucheng@163.com on 16/2/25.

    API:
        stack - ([Component]) - ViewStack stack array, must be a Component array

    Method:
        replaceStack(index:number, isNew:bool) - Replace the component of the specified index in the stack，isNew said to create a new instance
        getCurrentIndex() - The index to get the current display
        getStack(index:number) - Specify the subscript component instance

*/
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
