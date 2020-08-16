import {combineReducers} from 'redux';
import {currentUser} from './currentUser';
import {profile} from './profile';
import {home} from './home';
import {search} from './search';
import {helper} from './helper';


export const reducers = combineReducers({
    currentUser,
    profile,
    home,
    search,
    helper
})