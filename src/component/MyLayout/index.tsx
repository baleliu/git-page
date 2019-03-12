import React from 'react';

import {
    Layout, Menu, Breadcrumb, Icon,
} from 'antd';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import RightLayout from '../RightLayout'

const {
    Header, Content, Footer, Sider,
} = Layout;

const MenuItemGroup = Menu.ItemGroup;
const SubMenu = Menu.SubMenu;

const backgroundColor = {
    backgroundColor: "#ffffff",
    // position: 'fixed',
    overflow: 'auto'
};

const styleConstant = {
    boxShadow: "0 0 0.5em 0 rgba(0, 0, 0, 0.28)"
};

type Props = {
    menu: any
}

class MyLayout extends React.Component<Props> {
    state = {
        collapsed: false,
        contentStyle: {marginRight: '300px'}
    };

    toggle = (currentStatus: boolean) => {
        if (currentStatus) {
            this.setState({
                collapsed: !this.state.collapsed,
                contentStyle: {marginRight: '300px'}
            });
        } else {
            this.setState({
                collapsed: !this.state.collapsed,
                contentStyle: {marginRight: '0px'}
            });
        }
    };

    onBreakpoint = (broken) => {
        if (broken) {
            this.setState({
                contentStyle: {marginRight: '0px'}
            });
        } else {
            this.setState({
                contentStyle: {marginRight: '300px'}
            });
        }
    };


    onCollapse = (collapsed: boolean) => {
        this.setState({collapsed});
    };

    render() {
        return (
            <Layout style={{minHeight: '100vh',}}>
                <Layout style={this.state.contentStyle}>
                    <Header style={{
                        background: '#fff',
                        position: 'absolute',
                        width: '100%',
                        boxShadow: styleConstant.boxShadow,
                        height: '50px'
                    }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            style={{
                                fontSize: '25px',
                                lineHeight: '50px',
                                float: 'right',
                                marginRight: this.state.contentStyle.marginRight,
                            }}
                            onClick={() => {
                                this.toggle(this.state.collapsed)
                            }}
                        />
                    </Header>
                    <Content style={{margin: '0 16px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{padding: 24, background: '#fff', minHeight: '85vh'}}>
                            {
                                this.props.children
                            }
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        DOC ©2019 Created by Bale.liu
                    </Footer>
                </Layout>
                <RightLayout
                    onBreakpoint={this.onBreakpoint}
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                    style={{
                        overflow: 'auto',
                        height: '100%',
                        position: 'absolute',
                        right: 0,
                        boxShadow: styleConstant.boxShadow
                    }}
                >
                    {this.props.menu}
                </RightLayout>
            </Layout>
        );
    }
}

export default MyLayout;