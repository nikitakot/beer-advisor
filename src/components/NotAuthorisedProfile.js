import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button, CardSection, FbButton, Spinner } from './common';
import { loginFaceBook } from '../config/firebase';
import { connect } from 'react-redux';
import { initUserToStore } from '../actions/AuthActions';
import { ERROR_TEXT_STYLE } from '../utlis/constants';

class NotAuthorisedProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: ''
        };
    }

    facebookLogin() {
        this.setState({ loading: true, error: '' });
        loginFaceBook()
            .then(user => {
                this.setState({ loading: false });
                console.log(`Logged in as ${user.displayName}`);
                this.props.initUserToStore(user);
            })
            .catch(e => {
                console.log(e);
                this.setState({ loading: false, error: 'Error Facebook login' });
            });
    }

    render() {
        return (
            <View>
                <CardSection>
                    <Button
                        onPress={() => {
                            this.props.navigation.navigate('LogIn');
                        }}
                    >LogIn</Button>
                </CardSection>
                <CardSection>
                    <Button
                        onPress={() => {
                            this.props.navigation.navigate('SignUp');
                        }}
                    >SignUp</Button>
                </CardSection>
                {this.state.error
                    ?
                    <Text style={ERROR_TEXT_STYLE}>{this.state.error}</Text>
                    :
                    null}
                <CardSection>
                    {this.state.loading
                        ?
                        <Spinner size="large" />
                        :
                        <FbButton onPress={() => this.facebookLogin()}>
                            Facebook
                        </FbButton>
                    }
                </CardSection>
            </View>
        );
    }
}

export default connect(null, { initUserToStore })(NotAuthorisedProfile);
