import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardSection, Spinner } from './common';
import { signUpUser } from '../actions/AuthActions';
import AuthForm from './AuthForm';


class SignUpForm extends Component {
    static navigationOptions = {
        title: 'SignUp'
    };

    onButtonPress() {
        const { email, password } = this.props;

        this.props.signUpUser({ email, password });
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner size="large" />;
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                SignUp
            </Button>
        );
    }


    render() {
        return (
            <Card>
                <AuthForm />
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    const { email, password, loading } = auth;

    return { email, password, loading };
};

export default connect(mapStateToProps, {
    signUpUser
})(SignUpForm);

