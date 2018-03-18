import React from 'react';
import { Image, ScrollView } from 'react-native';
import { Button, Card, CardSection, FbButton } from './common';

const logo = require('./../../images/logo.png');


class Profile extends React.Component {
    static navigationOptions = {
        title: 'Profile'
    };

    render() {
        return (
            <ScrollView>
                <Card>
                    <CardSection>
                        <Image
                            style={styles.imageStyle}
                            source={logo}
                        />
                    </CardSection>
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
                </Card>
            </ScrollView>
        );
    }
}

const styles = {
    imageStyle: {
        height: 300,
        flex: 1,
        width: null
    }
};


export default Profile;
