import React from "react";
import {Layout, Switch, Card, Menu, Anchor} from "antd";
import {connect} from 'react-redux';
import {action} from "../../redux/markdown";

const {Link} = Anchor;
const {Sider} = Layout;

type State = {
    children: any
    category: any
    showCategory: boolean
}

/**
 * todo 搬家到 view 中
 */
@connect(
    (state) => {
        return {
            category: state.markdown.category,
            showCategory: state.markdown.isOpen,
            pageContainerRef: state.markdown.pageContainerRef
        }
    },
    (dispatch) => {
        return {
            addPageContainerRef: (ref) => dispatch(action.addPageContainerRef(ref))
        }
    }
)
export default class RightLayout extends React.Component<any, State> {

    anchorContainerRef;

    readonly state = {
        children: null,
        category: null,
        showCategory: false
    };

    constructor(props){
        super(props);
    }

    componentWillReceiveProps(nextProps: Readonly<any>, nextContext: any): void {
        this.setState({
            ...this.state,
            showCategory: nextProps.showCategory
        });
    }

    renderMdCategory = (category) => {
        let key = 0;
        return (
            <Anchor
                getContainer={()=>document.getElementById('liuwentao')}
            >
                {
                    category.map(c => {
                        return (
                            <Link key={key++} href={`#${c.content}`} title={c.content}/>
                        )
                    })
                }
            </Anchor>
        )
    };

    render(): React.ReactNode {
        return (
            <Sider
                theme={"light"}
                breakpoint={'xs'}
                onBreakpoint={this.props.onBreakpoint}
                collapsed={this.props.collapsed}
                collapsedWidth={'0'}
                width={'300'}
                onCollapse={this.props.onCollapse}
                style={this.props.style}
            >
                <Card>
                    <Switch defaultChecked
                            checked={this.state.showCategory}
                            onChange={
                                () => {
                                    this.setState({
                                        ...this.state,
                                        showCategory: !this.state.showCategory
                                    })
                                }
                            }/>
                </Card>
                {
                    this.state.showCategory ?
                        this.renderMdCategory(this.props.category)
                        : this.props.children
                }
            </Sider>
        )
    }
}