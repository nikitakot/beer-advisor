import React, { Component } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { CardSection } from './common';
import MyRating from './MyRating';

class BeerItem extends Component {
    render() {
        const { name } = this.props.beer;

        return (
            <TouchableWithoutFeedback>
                <View>
                    <CardSection>
                        <MyRating
                            label={name}
                            startingValue={4}
                        />
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default BeerItem;
