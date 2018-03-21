import React from 'react';
import AdjustableBeerList from './AdjustableBeerList';
import { Icon } from 'react-native-elements';

class SelectBeeList extends React.Component {
    static navigationOptions = {
        title: 'Select a beer',
    };

    onPress(beer) {
        console.log(beer);
    }

    render() {
        return (<AdjustableBeerList
            onPress={this.onPress}
            icon={<Icon name="done" size={35} color='#cccccc' />}
        />);
    }
}

export default SelectBeeList;

