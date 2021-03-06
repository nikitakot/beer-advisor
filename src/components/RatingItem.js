import React, { Component } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { CardSection } from './common';
import MyRating from './MyRating';


class RatingItem extends Component {
    render() {
        const { name, icon, onPress, avgRating } = this.props;

        return (
            <TouchableWithoutFeedback
                onPress={onPress}
            >
                <View>
                    <CardSection>
                        <MyRating
                            label={name}
                            startingValue={avgRating}
                            readonly
                        />
                        {icon}
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default RatingItem;
