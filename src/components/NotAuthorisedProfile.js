import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, CardSection, FbButton } from './common';

class NotAuthorisedProfile extends Component {
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
                <CardSection>
                    <FbButton>Facebook</FbButton>
                </CardSection>
            </View>
        );
    }
}

export default NotAuthorisedProfile;
