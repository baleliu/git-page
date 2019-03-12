import React from "react";
import {Layout, Switch, Card, Menu} from "antd";

const {Sider} = Layout;
import {connect} from 'react-redux';
import {action} from "../../redux/markdown";

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
            category: state.markdown.category
        }
    },
    null
)
export default class RightLayout extends React.Component<any, State> {

    readonly state = {
        children: null,
        category: null,
        showCategory: false
    };

    renderMdCategory = (category) => {
        let key = 0;
        return (
            <Menu
                mode="inline"
            >{
                category.map(c => {
                    return (
                        <Menu.Item key={key++}>
                            <span>{c.content}</span>
                        </Menu.Item>
                    )
                })
            }
            </Menu>
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
                    <Switch defaultChecked onChange={
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