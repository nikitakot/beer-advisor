import { StackNavigator } from 'react-navigation';
import Profile from '../components/Profile';

export const ProfileStack = StackNavigator({
    Profile: {
        screen: Profile
    }
});
