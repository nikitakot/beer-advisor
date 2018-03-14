import { StackNavigator } from 'react-navigation';
import Profile from '../components/Profile';
import LogInForm from '../components/LogInForm';
import SignUpForm from '../components/SignUpForm';

export const ProfileStack = StackNavigator({
    Profile: {
        screen: Profile
    },
    LogIn: {
        screen: LogInForm
    },
    SignUp: {
        screen: SignUpForm
    }
});
