import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { APP_BLUE } from '../../utlis/constants';

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
        color: APP_BLUE,
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
        borderColor: APP_BLUE,
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
