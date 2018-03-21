import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { APP_BLUE, TEXT_STYLE } from '../utlis/constants';
import { Button } from './common';
import NavigationService from '../utlis/NavigationService';
import { connect } from 'react-redux';

class AddBarButton extends Component {
    render() {
        const { beerList } = this.props;

        return (
            <View style={styles.containerStyle}>
                <Text style={TEXT_STYLE}>
                    Added{' '}
                        <Text style={{ color: APP_BLUE, fontWeight: 'bold' }}>
                            {beerList.length}
                        </Text>
                    {' '}beers
                </Text>
                <Button
                    onPress={() => {
                        NavigationService.navigate('SelectBeeList');
                    }}
                >Add a beer</Button>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
};

const mapStateToProps = ({ addABar }) => {
    const { beerList } = addABar;
    return { beerList };
};

export default connect(mapStateToProps, {})(AddBarButton);
