import { StackNavigator } from 'react-navigation';
import Home from '../components/Home';
import Bar from '../components/Bar';
import Beer from '../components/Beer';
import AttachABeer from '../components/AttachABeer';
import Rate from '../components/Rate';
import EditBarForm from '../components/EditBarForm';

export const HomeStack = StackNavigator({
    Home: {
        screen: Home
    },
    Bar: {
        screen: Bar
    },
    Beer: {
        screen: Beer
    },
    AttachABeer: {
        screen: AttachABeer
    },
    Rate: {
        screen: Rate
    },
    EditBarForm: {
        screen: EditBarForm
    }
});
