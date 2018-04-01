import React from 'react';
import { connect } from 'react-redux';
import { fetchBeerList } from '../actions/BeerActions';
import RatingItem from './RatingItem';
import { Card, Spinner } from './common';
import { ScrollView, Text } from 'react-native';
import { ERROR_TEXT_STYLE } from '../utlis/constants';

class AdjustableBeerList extends React.Component {

    componentWillMount() {
        this.props.fetchBeerList();
    }

    renderList() {
        const { onPress, getIcon } = this.props;
        return this.props.beerList.map(beer =>
            <RatingItem
                onPress={() => onPress(beer)}
                icon={getIcon(beer)}
                key={beer.id}
                name={beer.name}
            />
        );
    }

    render() {
        const { loading, error } = this.props;

        return (
            <ScrollView>
                <Card>
                    {loading ? <Spinner /> : null}
                    {error ? <Text style={ERROR_TEXT_STYLE}>{error}</Text> : null}
                    {this.renderList()}
                </Card>
            </ScrollView>
        );
    }
}

const mapStateToProps = ({ beerList }) => beerList;

export default connect(mapStateToProps, {
    fetchBeerList
})(AdjustableBeerList);

