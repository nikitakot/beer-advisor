import React from 'react';
import { Text } from 'react-native';
import { Button, Card, CardSection } from './common';
import NavigationService from '../utlis/NavigationService';

class BarList extends React.Component {
    static navigationOptions = {
        title: 'BarList',
    };

    render() {
        return (
            <Card>
                <CardSection>
                    <Button
                        onPress={() => {
                            NavigationService.navigate('AddBar');
                        }}
                    >Add a new bar</Button>
                </CardSection>
                <CardSection>
                    <Text>Beer List</Text>
                </CardSection>
            </Card>
        );
    }
}

export default BarList;

