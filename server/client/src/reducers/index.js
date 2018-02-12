import {combineReducers} from 'redux';
import AuthReducer from './auth_reducer';
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
    auth: AuthReducer,
    form: formReducer
});