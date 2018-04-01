import React from 'react';
import AdjustableBeerList from './AdjustableBeerList';
import { Icon } from 'react-native-elements';
import { APP_BLUE } from '../utlis/constants';
import { RefreshButton } from './common/RefreshButton';
import { fetchBeerList } from '../actions/BeerActions';
import { connect } from 'react-redux';

class BeerList extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            title: 'BeerList',
            headerRight: (
                <RefreshButton
                    onPress={params.fetchBeerList}
                />
            ),
        };
    };

    componentWillMount() {
        this.props.navigation.setParams({ fetchBeerList: this.props.fetchBeerList });
    }

    onPress(beer) {
        this.props.navigation.navigate('Beer', { beer });
    }

    getIcon() {
        return <Icon name="navigate-next" size={35} color={APP_BLUE} />;
    }

    render() {
        return (<AdjustableBeerList
            onPress={this.onPress.bind(this)}
            getIcon={this.getIcon}
        />);
    }
}

export default connect(null, { fetchBeerList })(BeerList);

