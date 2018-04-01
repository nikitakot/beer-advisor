import React, { Component } from 'react';
import { HEADER_STYLE, TEXT_STYLE } from '../utlis/constants';
import { ScrollView, Text } from 'react-native';
import { Card, CardSection } from './common';
import { MapView } from 'expo';
import Map from './Map';

class Bar extends Component {

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            title: params.bar.name
        };
    };

    renderMarkers() {
        const { bar } = this.props.navigation.state.params;
        return <MapView.Marker coordinate={{ latitude: bar.lat, longitude: bar.lng }} />;
    }

    render() {
        const { bar } = this.props.navigation.state.params;

        return (
            <ScrollView>
                <Card>
                    <CardSection>
                        <Text style={HEADER_STYLE}>Bar Name</Text>
                    </CardSection>
                    <CardSection>
                        <Text style={TEXT_STYLE}>{bar.name}</Text>
                    </CardSection>
                    <CardSection>
                        <Text style={HEADER_STYLE}>Address</Text>
                    </CardSection>
                    <CardSection>
                        <Map
                            lat={bar.lat}
                            lng={bar.lng}
                            style={{ height: 300, flex: 1, width: null }}
                        >
                            {this.renderMarkers()}
                        </Map>
                    </CardSection>
                    <CardSection>
                        <Text style={TEXT_STYLE}>{bar.address}</Text>
                    </CardSection>
                    <CardSection>
                        <Text style={HEADER_STYLE}>Phone</Text>
                    </CardSection>
                    <CardSection>
                        <Text style={TEXT_STYLE}>{bar.phone}</Text>
                    </CardSection>
                </Card>
            </ScrollView>
        );
    }
}

export default Bar;
