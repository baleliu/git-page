import {counter, testCounter} from './counter/action';
import {global} from './global';
import {combineReducers} from 'redux';


export default combineReducers({
    global,
    counter,
    testCounter
});