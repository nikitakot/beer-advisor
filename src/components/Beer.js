import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { Card, CardSection } from './common';
import { HEADER_STYLE, TEXT_STYLE } from '../utlis/constants';
import { Button } from './common/Button';
import NavigationService from '../utlis/NavigationService';

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
                    <CardSection>
                        <Button
                            onPress={() => {
                                NavigationService.navigate('Rate', { sub: beer });
                            }}
                        >
                            Rate this beer
                        </Button>
                    </CardSection>
                </Card>
            </ScrollView>
        );
    }
}

export default Beer;
