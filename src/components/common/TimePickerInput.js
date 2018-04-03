import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { APP_BLUE, TEXT_STYLE } from '../../utlis/constants';

const TimePickerInput = ({ label, minuteValue, hourValue, keyboardType, onHourChange, onMinuteChange }) => {
    const { inputStyle, labelStyle, containerStyle } = styles;
    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label}</Text>
            <TextInput
                keyboardType={keyboardType || 'numeric'}
                maxLength={2}
                placeholder={'HH'}
                autoCorrect={false}
                style={inputStyle}
                value={hourValue}
                onChangeText={onHourChange}
            />
            <Text style={{ fontSize: 18 }}>:</Text>
            <TextInput
                keyboardType={keyboardType || 'numeric'}
                maxLength={2}
                placeholder={'MM'}
                autoCorrect={false}
                style={inputStyle}
                value={minuteValue}
                onChangeText={onMinuteChange}
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
        flex: 1,
        borderRadius: 3,
        borderWidth: 2,
        borderColor: APP_BLUE,
        marginLeft: 5,
        marginRight: 5
    },
    labelStyle: { ...TEXT_STYLE, flex: 2 },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
};

export { TimePickerInput };
