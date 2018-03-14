import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
    const { buttonStyle, textStyle } = styles;

    return (
        <TouchableOpacity onPress={onPress} style={buttonStyle}>
            <Text style={textStyle}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const FbButton = ({ onPress, children }) => {
    const { fbButtonStyle, fbTextStyle } = styles;

    return (
        <TouchableOpacity onPress={onPress} style={fbButtonStyle}>
            <Text style={fbTextStyle}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 3,
        borderWidth: 2,
        borderColor: '#007aff',
        marginLeft: 5,
        marginRight: 5
    },
    fbTextStyle: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    fbButtonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#3b5998',
        borderRadius: 3,
        borderWidth: 2,
        borderColor: '#3b5998',
        marginLeft: 5,
        marginRight: 5
    }
};

export { Button, FbButton };
