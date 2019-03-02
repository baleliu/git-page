import React from 'react';
import MdPage from '../../component/MdPage';
import doc from './doc.md';

type State = {
    markdown: string,
}

export default class Page1 extends React.Component<object, State> {

    readonly state: State = {
        markdown: "",
    };

    componentWillMount() {
        fetch(doc)
            .then(response => {
                return response.text()
            })
            .then(text => {
                this.setState({
                    markdown: text,
                });
            })
    }

    render() {
        return (
            <div>
                <MdPage src={this.state.markdown}/>
            </div>
        );
    }
}