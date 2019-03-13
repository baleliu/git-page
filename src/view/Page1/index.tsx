import React from 'react';
import MdPage from '../../component/MdPage';
import doc from './doc.md';
import nprogress from 'nprogress';
// @ts-ignore
import {SubProps} from "Util/LazyLoad";
import {action} from "../../redux/markdown";
import {connect} from 'react-redux';


type State = {
    markdown: string,
}


@connect(
    null,
    (dispatch) => {
        return {
            addCategory: (category) => dispatch(action.addCategory(category)),
            clearCategory: () => dispatch(action.clearCategory()),
            openMdPage: () => dispatch(action.openMdPage())
        }
    }
)
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
        const {openMdPage} = this.props;
        openMdPage();
    }

    render() {
        return (
            <div>
                <MdPage
                    src={this.state.markdown}
                    addCategory={this.props.addCategory}
                    clearCategory={this.props.clearCategory}
                />
            </div>
        );
    }
}