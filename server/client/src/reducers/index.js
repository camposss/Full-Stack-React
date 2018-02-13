import {combineReducers} from 'redux';
import AuthReducer from './auth_reducer';
import {reducer as formReducer} from 'redux-form';
import surveysReducer from './surveys_reducer';

export default combineReducers({
    auth: AuthReducer,
    form: formReducer,
    surveys: surveysReducer
});