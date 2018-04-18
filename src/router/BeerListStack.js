import { StackNavigator } from 'react-navigation';
import BeerList from '../components/BeerList';
import Beer from '../components/Beer';
import Rate from '../components/Rate';
import Comments from '../components/Comments';
import BeersBarsList from '../components/BeersBarsList';
import Bar from '../components/Bar';
import AttachABeer from '../components/AttachABeer';
import EditBarForm from '../components/EditBarForm';

export const BeerListStack = StackNavigator({
    BeerList: {
        screen: BeerList
    },
    Beer: {
        screen: Beer
    },
    Rate: {
        screen: Rate
    },
    Comments: {
        screen: Comments
    },
    BeersBarsList: {
        screen: BeersBarsList
    },
    Bar: {
        screen: Bar
    },
    AttachABeer: {
        screen: AttachABeer
    },
    EditBarForm: {
        screen: EditBarForm
    },
});
