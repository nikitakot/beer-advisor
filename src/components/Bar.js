import React, { Component } from 'react';
import { APP_BLUE, HEADER_STYLE, TEXT_STYLE } from '../utlis/constants';
import { ScrollView, Text, View } from 'react-native';
import { Card, CardSection } from './common';
import { MapView } from 'expo';
import Map from './Map';
import { getBarsBeers } from '../utlis/requests';
import RatingItem from './RatingItem';
import NavigationService from '../utlis/NavigationService';
import { Icon } from 'react-native-elements';

class Bar extends Component {

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            title: params.bar.name
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            beerList: []
        };
    }

    componentWillMount() {
        const { bar } = this.props.navigation.state.params;
        getBarsBeers(bar.id).then(({ beerList }) => this.setState({ beerList }));
    }

    getIcon() {
        return <Icon name="navigate-next" size={35} color={APP_BLUE} />;
    }

    renderBeers() {
        return this.state.beerList.map((beer, key) =>
            <RatingItem
                onPress={() => NavigationService.navigate('Beer', { beer })}
                icon={this.getIcon()}
                key={key}
                name={beer.name}
            />
        );
    }

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
                    <View>
                        {this.renderBeers()}
                    </View>
                </Card>
            </ScrollView>
        );
    }
}

export default Bar;
