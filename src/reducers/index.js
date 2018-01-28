/**
 * @author <a href="mailto:stefanmayer13@gmail.com">Stefan Mayer</a>
 */

import { combineReducers } from 'redux';
import auth from './authReducer';
import translations from './translationsReducer';

const reducers = combineReducers({
    auth, translations
});

export default reducers;
