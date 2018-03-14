import { Button } from 'react-native-elements';
import React from 'react';

export const MyButton = ({ onPress, children }) => {
    const { buttonStyle } = myStyles;

    return (
        <Button
            buttonStyle={buttonStyle}
            fontSize={16}
            title={children}
            onPress={onPress}
        />
    );
};

export const FbButton = ({ onPress, children }) => {
    const { fbButtonStyle } = myStyles;

    return (
        <Button
            buttonStyle={fbButtonStyle}
            fontSize={16}
            title={children}
            onPress={onPress}
        />
    );
};

const myStyles = {
    buttonStyle: {
        backgroundColor: '#007aff',
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 3
    },
    fbButtonStyle: {
        backgroundColor: '#3b5998',
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 3
    }
};
