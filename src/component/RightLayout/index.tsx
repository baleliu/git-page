import React from "react";
import {Layout} from "antd";
const {Sider} = Layout;
import {connect} from 'react-redux';
import {action} from "../../redux/markdown";


@connect(
    (state) => {
        return {
            category: state.markdown.category
        }
    },
    null
)
export default class RightLayout extends React.Component<any> {
    render(): React.ReactNode {
        console.log('--side category---')
        console.log(this.props.category)
        console.log('------------------')
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
                {this.props.children}
            </Sider>
        )
    }
}