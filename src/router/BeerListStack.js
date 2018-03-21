import { StackNavigator } from 'react-navigation';
import BeerList from '../components/BeerList';
import Beer from '../components/Beer';

export const BeerListStack = StackNavigator({
    BeerList: {
        screen: BeerList
    },
    Beer: {
        screen: Beer
    }
});
