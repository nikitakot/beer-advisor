import React from 'react';
import { View } from 'react-native';
import { FbButton, MyButton } from './common/MyButtons';

class Profile extends React.Component {
    static navigationOptions = {
        title: 'Profile'
    };

    render() {
        const { profileContainer } = styles;
        return (
            <View style={profileContainer}>
                <MyButton>LogIn</MyButton>
                <MyButton>SignUp</MyButton>
                <FbButton>Facebook</FbButton>
            </View>
        );
    }
}

const styles = {
    profileContainer: {
        flex: 1,
        justifyContent: 'flex-start'
    }
};

export default Profile;
