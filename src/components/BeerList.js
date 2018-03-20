import React from 'react';
import { connect } from 'react-redux';
import { fetchBeerList } from '../actions/BeerActions';
import BeerItem from './BeerItem';
import { Card } from './common';

class BeerList extends React.Component {
    static navigationOptions = {
        title: 'BeerList',
    };

    componentWillMount() {
        this.props.fetchBeerList();
    }

    renderList() {
        return this.props.beerList.map(beer => <BeerItem beer={beer} />);
    }

    render() {
        return (
            <Card>
                {this.renderList()}
            </Card>
        );
    }
}

const mapStateToProps = ({ beerList }) => {
    return beerList;
};

export default connect(mapStateToProps, {
    fetchBeerList
})(BeerList);

