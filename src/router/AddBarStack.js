import { StackNavigator } from 'react-navigation';
import AddBar from '../components/AddBar';

export const AddBarStack = StackNavigator({
    AddBar: {
        screen: AddBar
    }
});
