import React, { Component } from 'react';
import { Card, CardSection } from './common';
import { Button } from './common/Button';
import MyRating from './MyRating';
import { Spinner } from './common/Spinner';
import { Text } from 'react-native';
import { ERROR_TEXT_STYLE } from '../utlis/constants';

class Rate extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `Rate ${navigation.state.params.sub.name}`
    });

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            rating: props.navigation.state.params.sub.rating,
            error: ''
        };
    }

    onPress(sub) {
        const { onPress } = this.props.navigation.state.params;
        this.setState({ loading: true });
        onPress(sub)
            .then(() => {
                this.props.navigation.goBack();
                this.setState({ loading: false });
            })
            .catch(() => {
                this.setState({ loading: false, error: 'Error while adding rating' });
            });
    }

    renderButton() {
        const { sub } = this.props.navigation.state.params;

        if (this.state.loading) {
            return <Spinner size="large"/>;
        }

        return (
            <Button onPress={() => this.onPress(sub)}>
                Leave a rating
            </Button>
        );
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
                <Text style={ERROR_TEXT_STYLE}>
                    {this.props.error}
                </Text>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

export default Rate;
