import {counter, testCounter} from './counter/action';
import {markdown} from './markdown'
import {combineReducers} from 'redux';


export default combineReducers({
    markdown,
    counter,
    testCounter,
});