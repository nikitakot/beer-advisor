import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { TEXT_STYLE } from '../../utlis/constants';

const Input = ({ label, onBlur, value, onChangeText, placeholder, secureTextEntry, maxLength, keyboardType }) => {
    const { inputStyle, labelStyle, containerStyle } = styles;
    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label}</Text>
            <TextInput
                keyboardType={keyboardType || 'default'}
                maxLength={maxLength}
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                autoCorrect={false}
                style={inputStyle}
                value={value}
                onChangeText={onChangeText}
                onBlur={onBlur}
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
        flex: 2
    },
    labelStyle: TEXT_STYLE,
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
};

export { Input };
