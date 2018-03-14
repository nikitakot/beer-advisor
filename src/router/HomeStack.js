import { StackNavigator } from 'react-navigation';
import Home from '../components/Home';

export const HomeStack = StackNavigator({
    Home: {
        screen: Home
    }
});
