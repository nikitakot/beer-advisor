import React from 'react';
import { connect } from 'react-redux';
import { Image, ScrollView } from 'react-native';
import { Card, CardSection } from './common';
import NotAuthorisedProfile from './NotAuthorisedProfile';
import AuthorisedProfile from './AuthorisedProfile';

const logo = require('./../../images/logo.png');


class Profile extends React.Component {
    static navigationOptions = {
        title: 'Profile'
    };

    getImageSource() {
        const { user } = this.props;
        return user && user.photoURL ? { uri: user.photoURL } : logo;
    }

    render() {
        return (
            <ScrollView>
                <Card>
                    <CardSection>
                        <Image
                            style={styles.imageStyle}
                            source={this.getImageSource()}
                        />
                    </CardSection>
                    {this.props.user ? <AuthorisedProfile user={this.props.user} /> :
                        <NotAuthorisedProfile navigation={this.props.navigation} />}
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

const mapStateToProps = ({ auth }) => {
    const { user } = auth;

    return { user };
};


export default connect(mapStateToProps)(Profile);
