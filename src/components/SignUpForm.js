import React, { Component } from 'react';
import { Button, Card, CardSection, Input } from './common';

export default class SignUpForm extends Component {
    static navigationOptions = {
        title: 'SignUp'
    };
    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label="Email"
                        placeholder="email@gmail.com"
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry
                        label="Password"
                        placeholder="password"
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry
                        label="Repeat password"
                        placeholder="Repeat password"
                    />
                </CardSection>
                <CardSection>
                    <Button>
                        SignUp
                    </Button>
                </CardSection>
            </Card>
        );
    }
}
