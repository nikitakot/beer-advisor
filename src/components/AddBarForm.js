import React from 'react';
import { MapView } from 'expo';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { Button, Card, CardSection, Input } from './common';
import Map from './Map';
import AddBarButton from './AddBarButton';
import { connect } from 'react-redux';
import { barUpdate, fetchAddress, fetchCurrentAddress } from '../actions/BarActions';


class AddBarForm extends React.Component {
    static navigationOptions = {
        title: 'Add a bar',
    };

    componentDidMount() {
        this.props.fetchCurrentAddress();
    }

    renderMarkers() {
        const { lat, lng } = this.props;
        return lat && lng ? <MapView.Marker coordinate={{ latitude: lat, longitude: lng }} />
            : null;
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
                        <CardSection>
                            <Input
                                label="Address"
                                placeholder="Enter the bar address"
                                value={this.props.address}
                                onBlur={() => {
                                    this.props.fetchAddress(this.props.address);
                                }}
                                onChangeText={value =>
                                    this.props.barUpdate({ prop: 'address', value })}
                            />
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
                            <Button>
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
    const { name, phone, address, lat, lng } = addABar;

    return { name, phone, address, lat, lng };
};

export default connect(mapStateToProps, { barUpdate, fetchAddress, fetchCurrentAddress })(AddBarForm);

