import { StackNavigator } from 'react-navigation';
import Home from '../components/Home';
import Bar from '../components/Bar';
import Beer from '../components/Beer';

export const HomeStack = StackNavigator({
    Home: {
        screen: Home
    },
    Bar: {
        screen: Bar
    },
    Beer: {
        screen: Beer
    }

});
