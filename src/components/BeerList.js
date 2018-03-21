import React from 'react';
import AdjustableBeerList from './AdjustableBeerList';
import { Icon } from 'react-native-elements';
import { APP_BLUE } from '../utlis/constants';

class BeerList extends React.Component {
    static navigationOptions = {
        title: 'BeerList',
    };

    onPress(beer) {
        this.props.navigation.navigate('Beer', { beer });
    }

    render() {
        return (<AdjustableBeerList
            onPress={this.onPress.bind(this)}
            icon={<Icon name="navigate-next" size={35} color={APP_BLUE} />}
        />);
    }
}

export default BeerList;

