import React from 'react';
import { Text, View } from 'react-native';

class AddBar extends React.Component {
    static navigationOptions = {
        title: 'Add a bar',
    };

    render() {
        return (
            <View>
                <Text>Add a Bar</Text>
            </View>
        );
    }
}

export default AddBar;

