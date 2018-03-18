import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardSection, Spinner } from './common';
import { logInUser } from '../actions/AuthActions';
import AuthForm from './AuthForm';


class LogInForm extends Component {
    static navigationOptions = {
        title: 'LogIn'
    };

    onButtonPress() {
        const { email, password } = this.props;

        this.props.logInUser({ email, password });
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner size="large" />;
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                LogIn
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
    logInUser
})(LogInForm);

