import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { Button, CardSection } from './common';
import { APP_BLUE, TEXT_STYLE } from '../utlis/constants';
import { resetForm } from '../actions/AuthActions';


class AuthorisedProfile extends Component {
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
                            this.props.resetForm();
                        }}
                    >LogOut</Button>
                </CardSection>
            </View>
        );
    }
}

export default connect(null, { resetForm })(AuthorisedProfile);
