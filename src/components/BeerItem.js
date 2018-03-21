import React, { Component } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { CardSection } from './common';
import MyRating from './MyRating';
import NavigationService from '../utlis/NavigationService';

class BeerItem extends Component {
    render() {
        const { beer } = this.props;

        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    NavigationService.navigate('Beer', { beer });
                }}
            >
                <View>
                    <CardSection>
                        <MyRating
                            label={beer.name}
                            startingValue={4}
                        />
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default BeerItem;
