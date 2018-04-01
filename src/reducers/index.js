import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import BeerListReducer from './BeerListReducer';
import AddABarReducer from './AddABarReducer';
import BarListReducer from './BarListReducer';

export default combineReducers({
    auth: AuthReducer,
    beerList: BeerListReducer,
    addABar: AddABarReducer,
    barList: BarListReducer
});
