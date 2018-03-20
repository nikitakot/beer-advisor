import React from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import { fetchBeerList } from '../actions/BeerActions';
import BeerItem from './BeerItem';

class BeerList extends React.Component {
    static navigationOptions = {
        title: 'BeerList',
    };

    componentWillMount() {
        this.props.fetchBeerList();

        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ beerList }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(beerList);
    }

    renderRow(beer) {
        return <BeerItem beer={beer} />;
    }

    render() {
        return (
            <ListView
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
            />
        );
    }
}

const mapStateToProps = ({ beerList }) => {
    return beerList;
};

export default connect(mapStateToProps, {
    fetchBeerList
})(BeerList);

