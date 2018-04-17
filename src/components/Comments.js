import React, { Component } from 'react';
import { KeyboardAvoidingView, ScrollView, Text } from 'react-native';
import { Button, Card, CardSection, TextArea } from './common';
import { APP_BLUE, HEADER_STYLE, TEXT_STYLE } from '../utlis/constants';

class Comments extends Component {

    render() {
        return (
            <KeyboardAvoidingView
                keyboardVerticalOffset={60}
                behavior="padding"
            >
                <ScrollView>
                    <Card>
                        <CardSection>
                            <Text style={TEXT_STYLE}>
                                <Text style={{ color: APP_BLUE }}>qwe@qwe.cz</Text>
                                {' '}12:30 17.04.2018
                            </Text>
                        </CardSection>
                        <CardSection>
                            <Text style={TEXT_STYLE}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </Text>
                        </CardSection>
                    </Card>
                    <Card>
                        <CardSection>
                            <Text style={TEXT_STYLE}>
                                <Text style={{ color: APP_BLUE }}>qwe@qwe.cz</Text>
                                {' '}12:30 17.04.2018
                            </Text>
                        </CardSection>
                        <CardSection>
                            <Text style={TEXT_STYLE}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </Text>
                        </CardSection>
                    </Card>
                    <Card>
                        <CardSection>
                            <Text style={TEXT_STYLE}>
                                <Text style={{ color: APP_BLUE }}>qwe@qwe.cz</Text>
                                {' '}12:30 17.04.2018
                            </Text>
                        </CardSection>
                        <CardSection>
                            <Text style={TEXT_STYLE}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </Text>
                        </CardSection>
                    </Card>
                    <Card>
                        <CardSection>
                            <Text style={HEADER_STYLE}>Leave a comment</Text>
                        </CardSection>
                        <CardSection>
                        <TextArea
                            placeholder={'Enter your comment here'}
                        />
                        </CardSection>
                        <CardSection>
                            <Button>
                                Submit
                            </Button>
                        </CardSection>
                    </Card>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

export default Comments;
