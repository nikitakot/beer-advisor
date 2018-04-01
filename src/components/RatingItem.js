import React, { Component } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { CardSection } from './common';
import MyRating from './MyRating';
import { APP_BLUE } from '../utlis/constants';


class RatingItem extends Component {
    render() {
        const { name, icon, onPress } = this.props;

        return (
            <TouchableWithoutFeedback
                onPress={onPress}
            >
                <View>
                    <CardSection>
                        <MyRating
                            label={name}
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

export default RatingItem;
