import React from 'react';
import MdPage from '../../component/MdPage';
import doc from './doc.md';
import nprogress from 'nprogress';
// @ts-ignore
import {SubProps} from "Util/LazyLoad";


type State = {
    markdown: string,
}

export default class Page1 extends React.Component<SubProps, State> {

    constructor(props) {
        super(props);
    }

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
        const {appendMdPageCategory, clearMdPageCategory} = this.props.attribute;
        return (
            <div>
                <MdPage
                    src={this.state.markdown}
                    appendCategory={appendMdPageCategory}
                    clearCategory={clearMdPageCategory}
                />
            </div>
        );
    }
}