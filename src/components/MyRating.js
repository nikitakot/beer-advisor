import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Rating } from 'react-native-elements';
import { TEXT_STYLE } from '../utlis/constants';

export default class MyRating extends Component {

    render() {
        const { label, startingValue, onFinishRating, readonly } = this.props;
        const { ratingStyle, containerStyle, labelStyle } = styles;

        return (
            <View style={containerStyle}>
                <Text style={labelStyle}>{label}</Text>
                <Rating
                    key={startingValue}
                    style={ratingStyle}
                    startingValue={startingValue || 0}
                    fractions={1}
                    readonly={readonly}
                    imageSize={35}
                    onFinishRating={onFinishRating}
                />
            </View>
        );
    }
}

const styles = {
    ratingStyle: {
        flex: 3
    },
    labelStyle: TEXT_STYLE,
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
};
