import React from 'react';
import { TextInput, View } from 'react-native';

const TextArea = ({ placeholder, value, onChangeText }) => {
    const { inputStyle, containerStyle } = styles;

    return (
        <View style={containerStyle}>
            <TextInput
                underlineColorAndroid='transparent'
                multiline
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                style={inputStyle}
                editable
                maxLength={100}
                numberOfLines={5}
            />
        </View>
    );
};

const styles = {
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 1
    },
    containerStyle: {
        height: 100,
        flex: 1
    }
};

export { TextArea };
