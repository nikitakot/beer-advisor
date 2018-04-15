import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert, Text, View } from 'react-native';
import { Button, CardSection } from './common';
import { APP_BLUE, TEXT_STYLE } from '../utlis/constants';
import { resetForm } from '../actions/AuthActions';
import { logOut } from '../config/firebase';
import NavigationService from '../utlis/NavigationService';


class AuthorisedProfile extends Component {

    logOut() {
        logOut()
            .then(() => {
                this.props.resetForm();
                NavigationService.reset();
            })
            .catch(() => {
                Alert.alert(
                    'Error',
                    'Error while logging out',
                    [
                        { text: 'OK' }
                    ],
                    { cancelable: false }
                );
            });
    }

    render() {
        return (
            <View>
                <CardSection>
                    <Text style={TEXT_STYLE}>
                        Logged in as{' '}
                        <Text style={{ color: APP_BLUE }}>
                            {this.props.user.email}
                        </Text>
                    </Text>
                </CardSection>
                <CardSection>
                    <Button
                        onPress={() => {
                            this.logOut();
                        }}
                    >LogOut</Button>
                </CardSection>
            </View>
        );
    }
}

export default connect(null, { resetForm })(AuthorisedProfile);
