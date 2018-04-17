import React from 'react';
import { Icon } from 'react-native-elements';
import { APP_BLUE } from '../utlis/constants';
import AdjustableBeerList from './AdjustableBeerList';
import { Alert, View } from 'react-native';
import { Button, CardSection, Spinner } from './common';
import { updateBarsBeers } from '../utlis/requests';
import NavigationService from '../utlis/NavigationService';

class AttachABeer extends React.Component {
    static navigationOptions = {
        title: 'Select a beer',
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedBeers: [],
            loading: false
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
        this.setState({ loading: true });
        updateBarsBeers(bar.id, this.state.selectedBeers)
            .then(() => {
                this.setState({ loading: false });
                getBarsBeers();
                NavigationService.goBack();
            })
            .catch(e => {
                this.setState({ loading: false });
                Alert.alert(
                    'Fail',
                    'Server error',
                    [
                        { text: 'OK' },
                    ],
                    { cancelable: false }
                );
                console.error(e);
            });
    }

    renderSubmitBtn() {
        return this.state.loading ?
            <Spinner size="large" /> :
            <Button
                onPress={() => {
                    this.updateBeerList();
                }}
            >
                Save
            </Button>;
    }

    render() {
        return (
            <View>
                <AdjustableBeerList
                    onPress={this.onPress.bind(this)}
                    getIcon={this.getIcon.bind(this)}
                />
                <CardSection>
                    {this.renderSubmitBtn()}
                </CardSection>
            </View>
        );
    }
}

export default AttachABeer;
