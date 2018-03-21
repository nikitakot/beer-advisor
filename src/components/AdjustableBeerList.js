import React from 'react';
import { connect } from 'react-redux';
import { fetchBeerList } from '../actions/BeerActions';
import BeerItem from './BeerItem';
import { Card, Spinner } from './common';
import { ScrollView, Text } from 'react-native';
import { ERROR_TEXT_STYLE } from '../utlis/constants';

class AdjustableBeerList extends React.Component {

    componentWillMount() {
        this.props.fetchBeerList();
    }

    renderList() {
        const { icon, onPress } = this.props;
        return this.props.beerList.map(beer =>
            <BeerItem onPress={() => onPress(beer)} icon={icon} key={beer.id} beer={beer} />
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

const mapStateToProps = ({ beerList }) => {
    return beerList;
};

export default connect(mapStateToProps, {
    fetchBeerList
})(AdjustableBeerList);

