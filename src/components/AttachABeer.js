import React from 'react';
import { connect } from 'react-redux';
import { fetchBeerList } from '../actions/BeerActions';
import { Icon } from 'react-native-elements';
import { APP_BLUE } from '../utlis/constants';
import AdjustableBeerList from './AdjustableBeerList';
import { View } from 'react-native';
import { Button, CardSection } from './common';

class AttachABeer extends React.Component {
    static navigationOptions = {
        title: 'Select a beer',
    };

    constructor(props) {
        super(props);
        this.state = {
            beerList: [],
            selectedBeers: []
        };
    }

    componentWillMount() {
        this.props.fetchBeerList();
        this.setState({
            beerList: this.props.beerList,
            selectedBeers: this.props.navigation.state.params.bar.beerList
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ beerList: nextProps.beerList });
    }

    onPress(beer) {
        if (this.state.selectedBeers.some((id) => beer.id === id)) {
            this.setState((prevState) =>
                ({ selectedBeers: prevState.selectedBeers.filter(id => id !== beer.id) }));
        } else {
            this.setState((prevState) =>
                ({ selectedBeers: [...prevState.selectedBeers, beer.id] }));
        }
    }

    getIcon(beer) {
        if (this.state.selectedBeers.some((id) => beer.id === id)) {
            return <Icon name="done" size={35} color={APP_BLUE} />;
        }

        return <Icon name="done" size={35} color='#cccccc' />;
    }

    updateBeerList() {

    }

    render() {
        return (
            <View>
                <AdjustableBeerList
                    onPress={this.onPress.bind(this)}
                    getIcon={this.getIcon.bind(this)}
                />
                <CardSection>
                    <Button
                        onPress={() => {
                            this.updateBeerList();
                        }}
                    >
                        Save
                    </Button>
                </CardSection>
            </View>
        );
    }
}

const mapStateToProps = ({ beerList }) => beerList;

export default connect(mapStateToProps, { fetchBeerList })(AttachABeer);
