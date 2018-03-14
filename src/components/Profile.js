import React from 'react';
import NavigationService from '../utlis/NavigationService';
import { Button, Card, CardSection, FbButton } from './common';

class Profile extends React.Component {
    static navigationOptions = {
        title: 'Profile'
    };

    render() {
        return (
            <Card>
                <CardSection>
                    <Button
                        onPress={() => {
                            NavigationService.navigate('LogIn');
                        }}
                    >LogIn</Button>
                </CardSection>
                <CardSection>
                    <Button
                        onPress={() => {
                            NavigationService.navigate('SignUp');
                        }}
                    >SignUp</Button>
                </CardSection>
                <CardSection>
                    <FbButton>Facebook</FbButton>
                </CardSection>
            </Card>
        );
    }
}


export default Profile;
