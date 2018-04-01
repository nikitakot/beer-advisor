import React from 'react';
import { Button, Card, CardSection, Spinner } from './common';
import NavigationService from '../utlis/NavigationService';
import { APP_BLUE, ERROR_TEXT_STYLE } from '../utlis/constants';
import { connect } from 'react-redux';
import { ScrollView, Text } from 'react-native';
import { fetchBarsList } from '../actions/BarActions';
import { Icon } from 'react-native-elements';
import RatingItem from './RatingItem';

class BarList extends React.Component {
    static navigationOptions = {
        title: 'BarList',
    };

    componentWillMount() {
        this.props.fetchBarsList();
    }

    getIcon() {
        return <Icon name="navigate-next" size={35} color={APP_BLUE} />;
    }

    renderList() {
        return this.props.barList.map((bar, k) =>
            <RatingItem
                onPress={() => {
                }}
                icon={this.getIcon()}
                key={k}
                name={bar.name}
            />
        );
    }

    render() {
        const { loading, error } = this.props;

        return (
            <ScrollView>
                <Card>
                    <CardSection>
                        <Button
                            onPress={() => {
                                NavigationService.navigate('AddBar');
                            }}
                        >Add a new bar</Button>
                    </CardSection>
                    <Card>
                        {loading ? <Spinner /> : null}
                        {error ? <Text style={ERROR_TEXT_STYLE}>{error}</Text> : null}
                        {this.renderList()}
                    </Card>
                </Card>
            </ScrollView>
        );
    }
}

const mapStateToProps = ({ barList }) => barList;

export default connect(mapStateToProps, { fetchBarsList })(BarList);

