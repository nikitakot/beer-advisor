import React from 'react';
import { Button, Card, CardSection, Spinner } from './common';
import NavigationService from '../utlis/NavigationService';
import { APP_BLUE, ERROR_TEXT_STYLE } from '../utlis/constants';
import { connect } from 'react-redux';
import { ScrollView, Text, View } from 'react-native';
import { fetchBarsList } from '../actions/BarActions';
import { Icon } from 'react-native-elements';
import RatingItem from './RatingItem';
import { RefreshButton } from './common/RefreshButton';

class BarList extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            title: 'BarList',
            headerRight: (
                <RefreshButton
                    onPress={params.fetchBarsList}
                />
            ),
        };
    };

    componentWillMount() {
        this.props.fetchBarsList();
        this.props.navigation.setParams({ fetchBarsList: this.props.fetchBarsList });
    }

    getIcon() {
        return <Icon name="navigate-next" size={35} color={APP_BLUE}/>;
    }

    renderList() {
        return this.props.barList.map((bar, k) =>
            <RatingItem
                onPress={() => {
                    this.props.navigation.navigate('Bar', { bar });
                }}
                icon={this.getIcon()}
                key={k}
                name={bar.name}
                avgRating={bar.avgRating}
            />
        );
    }

    renderAddBarButton() {
        return this.props.user
            ?
            <CardSection>
                <Button
                    onPress={() => {
                        NavigationService.navigate('AddBar');
                    }}
                >Add a new bar</Button>
            </CardSection>
            : null;
    }

    render() {
        const { loading, error } = this.props;

        return (
            <ScrollView>
                <Card>
                    {this.renderAddBarButton()}
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

const mapStateToProps = ({ barList, auth }) => {
    const { user } = auth;
    return { ...barList, user };
};

export default connect(mapStateToProps, { fetchBarsList })(BarList);

