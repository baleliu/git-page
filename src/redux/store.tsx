import {createStore} from 'redux';
import reducer from './reducer';


const s = createStore(reducer);

// 监听store中的state
s.subscribe(() => {
    // console.log(s.getState());
});

export const store = s;