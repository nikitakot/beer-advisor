import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { TEXT_STYLE } from '../utlis/constants';
import { Button } from './common';
import NavigationService from '../utlis/NavigationService';

class AddBarButton extends Component {
    render() {
        return (
            <View style={styles.containerStyle}>
                <Text style={TEXT_STYLE}>Added 0 beers</Text>
                <Button
                    onPress={() => {
                        NavigationService.navigate('SelectBeeList');
                    }}
                >Add a beer</Button>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
};

export default AddBarButton;
