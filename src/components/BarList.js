import React from 'react';
import { Text } from 'react-native';
import { Button, Card, CardSection } from './common';
import NavigationService from '../utlis/NavigationService';
import MyRating from './MyRating';

class BarList extends React.Component {
    static navigationOptions = {
        title: 'BarList',
    };

    ratingCompleted(rating) {
        console.log(`Rating is: ${rating}`);
    }

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
                <CardSection>
                    <MyRating
                        label={'Rating'}
                        startingValue={4}
                        onFinishRating={this.ratingCompleted}
                    />
                </CardSection>
            </Card>
        );
    }
}

export default BarList;

