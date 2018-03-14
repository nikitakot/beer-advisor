import { StackNavigator } from 'react-navigation';
import BeerList from '../components/BeerList';

export const BeerListStack = StackNavigator({
    BeerList: {
        screen: BeerList
    }
});
