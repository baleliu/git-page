import React from 'react';

import {
    Layout, Menu, Breadcrumb, Icon,
} from 'antd';
import {Link} from 'react-router-dom';

const {
    Header, Content, Footer, Sider,
} = Layout;

const MenuItemGroup = Menu.ItemGroup;
const SubMenu = Menu.SubMenu;

const backgroundColor = {
    backgroundColor: "#ffffff",
    position: 'fixed',
    overflow: 'auto'
};

type Props = {
    menu: any
}


class MyLayout extends React.Component<Props> {
    state = {
        collapsed: false,
        contentStyle: {marginLeft: '200px'}
    };

    toggle = (currentStatus: boolean) => {
        if (currentStatus) {
            this.setState({
                collapsed: !this.state.collapsed,
                contentStyle: {marginLeft: '200px'}
            });
        } else {
            this.setState({
                collapsed: !this.state.collapsed,
                contentStyle: {marginLeft: '80px'}
            });
        }
    };

    onBreakpoint = (broken) => {
        if (broken) {
            this.setState({
                contentStyle: {marginLeft: '80px'}
            });
        } else {
            this.setState({
                contentStyle: {marginLeft: '200px'}
            });
        }
    };


    onCollapse = (collapsed: boolean) => {
        console.log(collapsed);
        this.setState({collapsed});
    };

    render() {
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sider
                    breakpoint={'xs'}
                    onBreakpoint={this.onBreakpoint}
                    collapsed={this.state.collapsed}
                    collapsedWidth={'80'}
                    width={'200'}
                    onCollapse={this.onCollapse}
                    style={{
                        backgroundColor: "#ffffff",
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0
                    }}
                >
                    {this.props.menu}
                </Sider>
                <Layout style={this.state.contentStyle}>
                    <Header style={{background: '#fff', padding: 0}}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
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
                        <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        DOC ©2019 Created by Bale.liu
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default MyLayout;