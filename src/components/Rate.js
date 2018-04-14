import React, { Component } from 'react';
import { Card, CardSection } from './common';
import { Button } from './common/Button';
import MyRating from './MyRating';

class Rate extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `Rate ${navigation.state.params.sub.name}`
    });

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            rating: props.navigation.state.params.sub.rating
        };
    }

    render() {
        const { sub } = this.props.navigation.state.params;
        return (
            <Card>
                <CardSection>
                    <MyRating
                        label={sub.name}
                        startingValue={sub.rating}
                    />
                </CardSection>
                <CardSection>
                    <Button>
                        Leave a rating
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

export default Rate;
