import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { Card, CardSection } from './common';
import { TEXT_STYLE } from '../utlis/constants';
import { Button } from './common/Button';
import NavigationService from '../utlis/NavigationService';
import { getBeerComments, leaveABeerComment, leaveABeerRating } from '../utlis/requests';
import MyRating from './MyRating';
import { connect } from 'react-redux';

class Beer extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.beer.name
        };
    };


    getComments() {
        const { beer } = this.props.navigation.state.params;
        return getBeerComments(beer.id);
    }

    leaveARating(rating) {
        const { beer } = this.props.navigation.state.params;
        return leaveABeerRating(beer.id, rating);
    }

    leaveAComment(comment) {
        const { beer } = this.props.navigation.state.params;
        return leaveABeerComment(beer.id, comment);
    }

    renderRatingButton() {
        const { beer } = this.props.navigation.state.params;
        return this.props.user
            ?
            <CardSection>
                <Button
                    onPress={() => {
                        NavigationService.navigate('Rate',
                            {
                                sub: beer,
                                onPress: rating => this.leaveARating(rating)
                            });
                    }}
                >
                    Rate this beer
                </Button>
            </CardSection>
            : null;
    }

    renderCommentButton() {
        const { beer } = this.props.navigation.state.params;
        return this.props.user
            ?
            <CardSection>
                <Button
                    onPress={() => {
                        NavigationService.navigate('Comments',
                            {
                                sub: beer,
                                onPress: comment => this.leaveAComment(comment),
                                getComments: () => this.getComments()
                            });
                    }}
                >
                    Open Discussion
                </Button>
            </CardSection>
            : null;
    }

    render() {
        const { beer } = this.props.navigation.state.params;
        return (
            <ScrollView>
                <Card>
                    <CardSection>
                        <MyRating
                            label={beer.name}
                            startingValue={beer.avgRating}
                            readonly
                        />
                    </CardSection>
                    <CardSection>
                        <Text style={TEXT_STYLE}>{beer.description}</Text>
                    </CardSection>
                </Card>
                {this.renderRatingButton()}
                {this.renderCommentButton()}
            </ScrollView>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    const { user } = auth;
    return { user };
};

export default connect(mapStateToProps, null)(Beer);
