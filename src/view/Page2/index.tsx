import React from 'react';

import MdPage from '../../component/MdPage';

const doc = require('./doc.md');

export default class Page1 extends React.Component {
    render() {
        return (
            <div>
                <MdPage src={doc}/>
            </div>
        );
    }
}