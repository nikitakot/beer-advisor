import React from 'react';
import { Button, Card, CardSection, Spinner } from './common';
import NavigationService from '../utlis/NavigationService';
import { APP_BLUE, ERROR_TEXT_STYLE } from '../utlis/constants';
import { connect } from 'react-redux';
import { ScrollView, Text, View } from 'react-native';
import { fetchBarsList } from '../actions/BarActions';
import { Icon } from 'react-native-elements';
import RatingItem from './RatingItem';
import { getBeersBars } from '../utlis/requests';

class BarList extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: `${navigation.state.params.beer.name} bars`
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            barList: [],
            loading: false
        };
    }

    componentWillMount() {
        const { beer } = this.props.navigation.state.params;
        this.setState({ loading: true });
        getBeersBars(beer.id)
            .then(({ barList }) => this.setState({ barList, loading: false }))
            .catch(e => {
                console.log(e);
                this.setState({ loading: false, error: 'Error fetching beer list' });
            });
    }

    getIcon() {
        return <Icon name="navigate-next" size={35} color={APP_BLUE} />;
    }

    renderList() {
        return this.state.barList.map(bar =>
            <RatingItem
                onPress={() => {
                    this.props.navigation.navigate('Bar', { bar });
                }}
                icon={this.getIcon()}
                key={bar.id}
                name={bar.name}
                avgRating={bar.avgRating}
            />
        );
    }

    render() {
        const { loading, error } = this.state;

        return (
            <ScrollView>
                <Card>
                    <View>
                        {loading ? <Spinner /> : null}
                        {error ? <Text style={ERROR_TEXT_STYLE}>{error}</Text> : null}
                        {this.renderList()}
                    </View>
                </Card>
            </ScrollView>
        );
    }
}

export default BarList;

