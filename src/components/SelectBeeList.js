import React from 'react';
import AdjustableBeerList from './AdjustableBeerList';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { APP_BLUE } from '../utlis/constants';
import { beerSelected, beerUnselected } from '../actions/BarActions';

class SelectBeeList extends React.Component {
    static navigationOptions = {
        title: 'Select a beer',
    };

    onPress(beer) {
        if (this.props.beerList.some((id) => beer.id === id)) {
            this.props.beerUnselected(beer.id);
        } else {
            this.props.beerSelected(beer.id);
        }
    }

    getIcon(beer) {
        if (this.props.beerList.some((id) => beer.id === id)) {
            return <Icon name="done" size={35} color={APP_BLUE} />;
        }

        return <Icon name="done" size={35} color='#cccccc' />;
    }

    render() {
        return (<AdjustableBeerList
            onPress={this.onPress.bind(this)}
            getIcon={this.getIcon.bind(this)}
        />);
    }
}

const mapStateToProps = ({ addABar }) => {
    const { beerList } = addABar;
    console.log(addABar);
    return { beerList };
};

export default connect(mapStateToProps, { beerSelected, beerUnselected })(SelectBeeList);

