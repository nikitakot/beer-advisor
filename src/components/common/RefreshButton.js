import React from 'react';
import { APP_BLUE } from '../../utlis/constants';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';

export const RefreshButton = ({ onPress }) => {
    const { buttonStyle } = styles;
    return (
        <TouchableOpacity onPress={onPress} style={buttonStyle}>
            <Icon name="cached" size={35} color={APP_BLUE} />
        </TouchableOpacity>
    );
};

const styles = {
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        marginRight: 10,
        marginTop: 5
    }
};
