import React, { Component } from 'react';
import { APP_BLUE, HEADER_STYLE, TEXT_STYLE } from '../utlis/constants';
import { ScrollView, Text, View } from 'react-native';
import { Button, Card, CardSection } from './common';
import { MapView } from 'expo';
import Map from './Map';
import {
    deleteABarComment,
    deleteABeerComment, getBarComments, getBarsBeers, getBeerComments, leaveABarComment, leaveABarRating,
    leaveABeerComment, leaveABeerRating
} from '../utlis/requests';
import RatingItem from './RatingItem';
import NavigationService from '../utlis/NavigationService';
import { Icon } from 'react-native-elements';
import MyRating from './MyRating';
import { connect } from 'react-redux';

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
        this.getBarsBeers();
    }

    getBarsBeers() {
        const { bar } = this.props.navigation.state.params;
        getBarsBeers(bar.id).then(({ beerList }) => this.setState({ beerList }));
    }

    getIcon() {
        return <Icon name="navigate-next" size={35} color={APP_BLUE}/>;
    }

    getComments() {
        const { bar } = this.props.navigation.state.params;
        return getBarComments(bar.id);
    }

    leaveAComment(comment) {
        const { bar } = this.props.navigation.state.params;
        return leaveABarComment(bar.id, comment);
    }

    deleteComment(id) {
        const { bar } = this.props.navigation.state.params;
        return deleteABarComment(bar.id, id);
    }

    leaveARating(rating) {
        const { bar } = this.props.navigation.state.params;
        return leaveABarRating(bar.id, rating);
    }

    renderBeers() {
        return this.state.beerList.map((beer, key) =>
            <RatingItem
                onPress={() => NavigationService.navigate('Beer', { beer })}
                icon={this.getIcon()}
                key={key}
                name={beer.name}
                avgRating={beer.avgRating}
            />
        );
    }

    renderOpenHours() {
        const { closeTimeH, closeTimeM, openTimeH, openTimeM }
            = this.props.navigation.state.params.bar;
        if (closeTimeH && closeTimeM && openTimeM && openTimeH) {
            return (
                <View>
                    <CardSection>
                        <Text style={HEADER_STYLE}>Open Time</Text>
                    </CardSection>
                    <CardSection>
                        <Text style={TEXT_STYLE}>
                            Open from {openTimeH}:{openTimeM} to {closeTimeH}:{closeTimeM}
                        </Text>
                    </CardSection>
                </View>
            );
        }
        return null;
    }

    renderMarkers() {
        const { bar } = this.props.navigation.state.params;
        return <MapView.Marker coordinate={{ latitude: bar.lat, longitude: bar.lng }}/>;
    }

    renderButtons() {
        const { bar } = this.props.navigation.state.params;
        return this.props.user
            ?
            <View>
                <CardSection>
                    <Button
                        onPress={() => {
                            NavigationService.navigate('AttachABeer',
                                {
                                    bar,
                                    getBarsBeers: () => this.getBarsBeers(),
                                    selectedBeers: this.state.beerList
                                });
                        }}
                    >
                        Add a beer
                    </Button>
                </CardSection>
                <CardSection>
                    <Button
                        onPress={() => {
                            NavigationService.navigate('Rate',
                                {
                                    sub: bar,
                                    onPress: rating => this.leaveARating(rating)
                                });
                        }}
                    >
                        Rate this bar
                    </Button>
                    <Button
                        onPress={() => {
                            NavigationService.navigate('EditBarForm',
                                {
                                    bar
                                });
                        }}
                    >
                        Edit this bar
                    </Button>
                </CardSection>
                <CardSection>
                    <Button
                        onPress={() => {
                            NavigationService.navigate('Comments',
                                {
                                    sub: bar,
                                    onPress: comment => this.leaveAComment(comment),
                                    getComments: () => this.getComments(),
                                    deleteComment: id => this.deleteComment(id)
                                });
                        }}
                    >
                        Open Discussion
                    </Button>
                </CardSection>
            </View>
            : null;
    }

    render() {
        const { bar } = this.props.navigation.state.params;

        return (
            <ScrollView>
                <Card>
                    <CardSection>
                        <MyRating
                            label={bar.name}
                            startingValue={bar.avgRating}
                            readonly
                        />
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
                    {bar.phone ?
                        <View>
                            <CardSection>
                                <Text style={HEADER_STYLE}>Phone</Text>
                            </CardSection>
                            <CardSection>
                                <Text style={TEXT_STYLE}>{bar.phone}</Text>
                            </CardSection>
                        </View>
                        : null}
                    {this.renderOpenHours()}
                    <CardSection>
                        <Text style={HEADER_STYLE}>Bar Menu</Text>
                    </CardSection>
                    <View>
                        {this.renderBeers()}
                    </View>
                    {this.renderButtons()}
                </Card>
            </ScrollView>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    const { user } = auth;
    return { user };
};

export default connect(mapStateToProps, null)(Bar);
