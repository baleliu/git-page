import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.less';
import 'nprogress/nprogress.css'
import HomePage from "./view/HomePage";
import {Provider} from 'react-redux'
import {store} from './redux/store';

ReactDOM.render(
    <Provider store={store}>
        <HomePage/>
        {/* <Counter/>*/}
    </Provider>
    ,
    document.getElementById('root')
);