import React from 'react';
import { Text, View } from 'react-native';

class Profile extends React.Component {
    static navigationOptions = {
        title: 'Profile'
    };

    render() {
        return (
            <View>
                <Text>Profile</Text>
            </View>
        );
    }
}

export default Profile;
