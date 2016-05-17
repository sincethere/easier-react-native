/**
 * 加载中View提取
 * Author:honaf

    API:
    color - (string) - text color
    fontSize - (number) - text size
    style - (Object) - button background style objects
    imgStyle - (Object) - button image style objects
    pressSource - (source, Object) - button press source, image source or {color:''}
    source - (source, Object) - button source, image source or {color:''}
    onPress - (function) - button press listener

 */
'use strict';

import React from 'react';

import {
    Text,
    TouchableHighlight,
    Image,
    StyleSheet,
    TouchableOpacity,
    ImageResizeMode,
    View
} from 'react-native';

class Button extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            onPressed: false
        }

    }

    render() {
        var clickView = [];
        var source = this.props.source;
        var pressSource = this.props.pressSource;
        if(source.color == undefined){
            clickView = (
                <Image
                    resizeMode={Image.resizeMode.stretch}
                    source={this.state.onPressed?pressSource:source}
                    style={[this.props.imgStyle,styles.imgBtn]}>
                    <Text
                        style={[{color:this.state.onPressed?this.props.pressColor:this.props.color,backgroundColor:'transparent'},{fontSize:this.props.fontSize}]}>
                        {this.props.children}
                    </Text>
                </Image>
            )
        }else{
            clickView= (
                <View
                    style={[this.props.imgStyle,styles.viewBtn,
                    {backgroundColor:this.state.onPressed ? pressSource ? pressSource.color : source.color : source.color,
                    borderColor:this.state.onPressed ? pressSource ? pressSource.color : source.color : source.color},
                    ]}>
                    <Text
                        style={[{color:this.state.onPressed?this.props.pressColor:this.props.color,backgroundColor:'transparent'},{fontSize:this.props.fontSize}]}>
                        {this.props.children}
                    </Text>
                </View>
            )
        }
        return (
            <TouchableOpacity
                {...this.props}
                activeOpacity={1}
                onPressIn={()=>{
                    this.setState({
                        onPressed:true
                    })
                }}
                onPressOut={()=>{
                    this.setState({
                        onPressed:false
                    })
                }}
                >
                {clickView}
            </TouchableOpacity>
        );
    }
}
var styles = StyleSheet.create({
    imgBtn: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:5,
        borderWidth:1
    }
});
module.exports = Button;
