import { StackNavigator } from 'react-navigation';
import BarList from '../components/BarList';
import AddBarForm from '../components/AddBarForm';

export const BarListStack = StackNavigator({
    BarList: {
        screen: BarList
    },
    AddBar: {
        screen: AddBarForm
    }
});
