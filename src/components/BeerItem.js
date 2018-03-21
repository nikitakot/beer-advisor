import React, { Component } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { CardSection } from './common';
import MyRating from './MyRating';
import { APP_BLUE } from '../utlis/constants';


class BeerItem extends Component {
    render() {
        const { beer, icon, onPress } = this.props;
        // console.log(icon);
        return (
            <TouchableWithoutFeedback
                onPress={onPress}
            >
                <View>
                    <CardSection>
                        <MyRating
                            label={beer.name}
                            startingValue={4}
                            readonly
                        />
                        {icon}
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default BeerItem;
