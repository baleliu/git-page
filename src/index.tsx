import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.less';
import 'nprogress/nprogress.css'
import LoginPage from "./view/LoginPage";
import {Provider} from 'react-redux'
import {store} from './redux/store';

ReactDOM.render(
    <Provider store={store}>
        <LoginPage/>
    </Provider>
    ,
    document.getElementById('root')
);