import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { CardSection, Input } from './common';
import { ERROR_TEXT_STYLE } from '../utlis/constants';
import { emailChanged, passwordChanged, resetForm } from '../actions/AuthActions';


class AuthForm extends Component {

    componentWillMount() {
        this.props.resetForm();
    }

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }


    render() {
        return (
            <View>
                <CardSection>
                    <Input
                        label="Email"
                        placeholder="email@gmail.com"
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry
                        label="Password"
                        placeholder="password"
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                    />
                </CardSection>
                <Text style={styles.errorTextStyle}>
                    {this.props.error}
                </Text>
            </View>
        );
    }
}

const styles = {
    errorTextStyle: ERROR_TEXT_STYLE
};

const mapStateToProps = ({ auth }) => {
    const { email, password, error } = auth;

    return { email, password, error };
};

export default connect(mapStateToProps, {
    emailChanged, passwordChanged, resetForm
})(AuthForm);

