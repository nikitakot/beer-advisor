import { StackNavigator, TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import React from 'react';
import { HomeStack } from './HomeStack';
import { ProfileStack } from './ProfileStack';
import { BeerListStack } from './BeerListStack';
import { AddBarStack } from './AddBarStack';


const Tabs = TabNavigator({
    Home: {
        screen: HomeStack,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor }) =>
                <Icon name="map" size={35} color={tintColor} />,
        },
    },
    BeerList: {
        screen: BeerListStack,
        navigationOptions: {
            tabBarLabel: 'BeerList',
            tabBarIcon: ({ tintColor }) =>
                <Icon name="local-drink" size={35} color={tintColor} />
        }
    },
    AddBar: {
        screen: AddBarStack,
        navigationOptions: {
            tabBarLabel: 'Add a bar',
            tabBarIcon: ({ tintColor }) =>
                <Icon name="add" size={35} color={tintColor} />
        },
    },
    Profile: {
        screen: ProfileStack,
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({ tintColor }) =>
                <Icon name="account-circle" size={35} color={tintColor} />
        },
    },
});

const RootStack = StackNavigator(
    {
        Tabs: {
            screen: Tabs,
        }
    },
    {
        mode: 'modal',
        headerMode: 'none'
    }
);

export default RootStack;
