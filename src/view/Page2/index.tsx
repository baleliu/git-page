import React from 'react';
import MdPage from '../../component/MdPage';
import doc from './doc.md';
import nprogress from 'nprogress';

type State = {
    markdown: string,
}

export default class Page2 extends React.Component<object, State> {

    readonly state: State = {
        markdown: "",
    };

    componentWillMount(): void {
        nprogress.start();
        fetch(doc)
            .then(response => {
                return response.text()
            })
            .then(text => {
                this.setState({
                    markdown: text,
                });
                nprogress.done();
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