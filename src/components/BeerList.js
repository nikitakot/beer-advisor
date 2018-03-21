import React from 'react';
import { connect } from 'react-redux';
import { fetchBeerList } from '../actions/BeerActions';
import AdjustableBeerList from './AdjustableBeerList';
import NavigationService from '../utlis/NavigationService';
import { Icon } from 'react-native-elements';
import { APP_BLUE } from '../utlis/constants';

class BeerList extends React.Component {
    static navigationOptions = {
        title: 'BeerList',
    };

    onPress(beer) {
        NavigationService.navigate('Beer', { beer });
    }

    render() {
        return (<AdjustableBeerList
            onPress={this.onPress}
            icon={<Icon name="navigate-next" size={35} color={APP_BLUE} />}
        />);
    }
}

const mapStateToProps = ({ beerList }) => {
    return beerList;
};

export default connect(mapStateToProps, {
    fetchBeerList
})(BeerList);

