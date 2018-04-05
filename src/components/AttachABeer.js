import React from 'react';
import { Icon } from 'react-native-elements';
import { APP_BLUE } from '../utlis/constants';
import AdjustableBeerList from './AdjustableBeerList';
import { View } from 'react-native';
import { Button, CardSection } from './common';
import { updateBarsBeers } from '../utlis/requests';

class AttachABeer extends React.Component {
    static navigationOptions = {
        title: 'Select a beer',
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedBeers: []
        };
    }

    componentWillMount() {
        this.setState({
            selectedBeers: this.props.navigation.state.params.selectedBeers.map(beer => beer.id)
        });
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
        const { bar, getBarsBeers } = this.props.navigation.state.params;
        updateBarsBeers(bar.id, this.state.selectedBeers)
            .then(() => {
                console.log(`Bar ${bar.id} was updated.`);
                getBarsBeers();
            })
            .catch(e => {
                console.error(e);
            });
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

export default AttachABeer;
