import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import BeerListReducer from './BeerListReducer';

export default combineReducers({
    auth: AuthReducer,
    beerList: BeerListReducer
});
