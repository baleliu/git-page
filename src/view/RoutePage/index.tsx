import React from "react";
import MyLayout from "../../component/MyLayout";
import {Route, Switch, Redirect, HashRouter as Router} from "react-router-dom";
import json from './json.md';
// @ts-ignore
import LazyLoad from 'Util/LazyLoad';
import MY404 from '../404';

import {
    Menu, Icon,
} from 'antd';
import {Link} from 'react-router-dom';


const MenuItemGroup = Menu.ItemGroup;
const SubMenu = Menu.SubMenu;

type State = {
    routeList: object
}

export default class RoutePage extends React.Component<any, State> {

    readonly state = {
        routeList: [],
    };

    componentWillMount(): void {
        fetch(json)
            .then(response => {
                return response.text()
            })
            .then(text => {
                this.setState({
                    routeList: JSON.parse(text)
                });
            })
    };

    renderRoute = (routeList) => {
        this.renderMenu(routeList);
        return (
            <MyLayout menu={this.renderMenu(routeList)}>
                <Switch>
                    <Route
                        key={'root'}
                        path={'/'}
                        exact
                    >
                        <LazyLoad component={'RootPage'}/>
                    </Route>

                    {
                        routeList.map(value => {
                            return value.group.map(
                                group => {
                                    console.log(group);
                                    return group.children.map(
                                        child => {
                                            let path;
                                            if (value.path !== '/') {
                                                path = value.path;
                                            } else {
                                                path = '';
                                            }
                                            console.log(child)
                                            path += group.path + child.path;
                                            console.log(path);
                                            return <Route
                                                key={child.key}
                                                path={path}
                                                exact
                                            >
                                                <LazyLoad component={child.component}/>
                                            </Route>
                                        }
                                    )
                                }
                            )
                        })
                    }
                    <Route>
                        <LazyLoad component={'404'}/>
                    </Route>
                </Switch>
            </MyLayout>
        )
    };

    /**
     * 获取菜单
     * @param routeList
     */
    renderMenu = (routeList) => {
        return (
            <Menu
                onClick={(e) => {
                    console.log(e)
                }}
                style={{width: 300}}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                {
                    routeList.map(value => {
                        return (
                            value.group.map(group => {
                                    return (
                                        <SubMenu key={value.key}
                                                 title={<span><Icon type="mail"/><span>{value.title}</span></span>}
                                        >
                                            <Menu defaultSelectedKeys={['1']} mode="inline">
                                                <MenuItemGroup key={group.key} title={group.title}>
                                                    {
                                                        group.children.map(
                                                            child => {
                                                                let path;
                                                                if (value.path !== '/') {
                                                                    path = value.path;
                                                                } else {
                                                                    path = '';
                                                                }
                                                                path += group.path + child.path;
                                                                return (
                                                                    <Menu.Item key={child.key}>
                                                                        <Link to={path}>
                                                                            <Icon type="pie-chart"/>
                                                                            <span>{child.title}</span>
                                                                        </Link>
                                                                    </Menu.Item>
                                                                )
                                                            }
                                                        )
                                                    }
                                                </MenuItemGroup>
                                            </Menu>
                                        </SubMenu>
                                    )
                                }
                            ))
                    })
                }
            </Menu>
        );
    };

    render() {
        return (
            <Router>
                {
                    this.renderRoute(this.state.routeList)
                }
            </Router>
        );
    }
}