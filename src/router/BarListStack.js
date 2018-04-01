import { StackNavigator } from 'react-navigation';
import BarList from '../components/BarList';
import AddBarForm from '../components/AddBarForm';
import SelectBeeList from '../components/SelectBeeList';
import Bar from '../components/Bar';

export const BarListStack = StackNavigator({
    BarList: {
        screen: BarList
    },
    AddBar: {
        screen: AddBarForm
    },
    SelectBeeList: {
        screen: SelectBeeList
    },
    Bar: {
        screen: Bar
    }
});
