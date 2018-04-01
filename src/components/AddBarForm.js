import React from 'react';
import { MapView } from 'expo';
import { KeyboardAvoidingView, ScrollView, Text } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';
import Map from './Map';
import AddBarButton from './AddBarButton';
import { connect } from 'react-redux';
import { barUpdate, createABar, fetchAddress, fetchCurrentAddress } from '../actions/BarActions';
import { ERROR_TEXT_STYLE } from '../utlis/constants';


class AddBarForm extends React.Component {
    static navigationOptions = {
        title: 'Add a bar',
    };

    componentDidMount() {
        this.props.fetchCurrentAddress();
    }

    submit() {
        this.props.createABar(this.props);
    }

    renderMarkers() {
        const { lat, lng } = this.props;
        return lat && lng ? <MapView.Marker coordinate={{ latitude: lat, longitude: lng }} />
            : null;
    }

    renderAddressInput() {
        return this.props.addressLoading ?
            <Spinner size="large" /> :
            <Input
                label="Address"
                placeholder="Enter the bar address"
                value={this.props.address}
                onBlur={() => {
                    this.props.fetchAddress(this.props.address);
                }}
                onChangeText={value =>
                    this.props.barUpdate({ prop: 'address', value })}
            />;
    }

    render() {
        const { lat, lng } = this.props;
        return (
            <KeyboardAvoidingView
                keyboardVerticalOffset={60}
                behavior="padding"
            >
                <ScrollView>
                    <Card>
                        <CardSection>
                            <Input
                                label="Bar Name"
                                placeholder="Enter the bar name"
                                value={this.props.name}
                                onChangeText={value =>
                                    this.props.barUpdate({ prop: 'name', value })}
                            />
                        </CardSection>
                        <CardSection>
                            <Map
                                lat={lat}
                                lng={lng}
                                style={{ height: 300, flex: 1, width: null }}
                            >
                                {this.renderMarkers()}
                            </Map>
                        </CardSection>
                        <Text style={ERROR_TEXT_STYLE}>
                            {this.props.error}
                        </Text>
                        <CardSection>
                            {this.renderAddressInput()}
                        </CardSection>
                        <CardSection>
                            <Input
                                label="Phone"
                                placeholder="Enter the bar phone number"
                                value={this.props.phone}
                                onChangeText={value =>
                                    this.props.barUpdate({ prop: 'phone', value })}
                            />
                        </CardSection>
                        <CardSection>
                            <AddBarButton />
                        </CardSection>
                        <CardSection>
                            <Button onPress={this.submit.bind(this)}>
                                Add
                            </Button>
                        </CardSection>
                    </Card>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = ({ addABar }) => {
    const { name, phone, address, lat, lng, error, addressLoading } = addABar;

    return { name, phone, address, lat, lng, error, addressLoading };
};

export default connect(mapStateToProps,
    { barUpdate, fetchAddress, fetchCurrentAddress, createABar })(AddBarForm);

