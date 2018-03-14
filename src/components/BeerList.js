import React from 'react';
import { Text, View } from 'react-native';

class Home extends React.Component {
    static navigationOptions = {
        title: 'BeerList',
    };

    render() {
        return (
            <View>
                <Text>Beer List</Text>
            </View>
        );
    }
}

export default Home;

