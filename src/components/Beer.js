import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { Card, CardSection } from './common';
import { HEADER_STYLE, TEXT_STYLE } from '../utlis/constants';

class Beer extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.beer.name
        };
    };

    render() {
        const { beer } = this.props.navigation.state.params;
        return (
            <ScrollView>
                <Card>
                    <CardSection>
                        <Text style={HEADER_STYLE}>{beer.name}</Text>
                    </CardSection>
                    <CardSection>
                        <Text style={TEXT_STYLE}>{beer.description}</Text>
                    </CardSection>
                </Card>
            </ScrollView>
        );
    }
}

export default Beer;
