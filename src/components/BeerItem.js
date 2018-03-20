import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { CardSection } from './common';
import { TEXT_STYLE } from '../utlis/constants';

class BeerItem extends Component {
    render() {
        const { name } = this.props.beer;

        return (
            <TouchableWithoutFeedback>
                <View>
                    <CardSection>
                        <Text style={TEXT_STYLE}>
                            {name}
                        </Text>
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default BeerItem;
