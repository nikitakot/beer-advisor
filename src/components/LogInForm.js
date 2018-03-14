import React, { Component } from 'react';
import { Button, Card, CardSection, Input } from './common';

export default class LogInForm extends Component {
    static navigationOptions = {
        title: 'LogIn'
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
                    <Button>
                        LogIn
                    </Button>
                </CardSection>
            </Card>
        );
    }
}
