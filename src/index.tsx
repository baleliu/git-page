import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Button} from 'antd';
import {ButtonType} from "antd/lib/button";
import MdPage from './component/MdPage';
import Layout from './component/Layout';

const input = require('./static/t.md');

console.log(input);

ReactDOM.render(
    <Layout/>,
    document.getElementById('root')
);