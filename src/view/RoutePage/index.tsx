import React from "react";
// @ts-ignore
import BaseLayout from "Component/BaseLayout";
import {Route, Switch, Redirect, BrowserRouter as Router} from "react-router-dom";
import json from './json.md';
// @ts-ignore
import LazyLoad from 'Util/LazyLoad';
// @ts-ignore;
import {env} from 'Util/configUtil';

import {
    Menu, Icon, Card
} from 'antd';
import {Link} from 'react-router-dom';
import Planet from "../../component/Planet";
import {action} from "../../redux/markdown";
import {connect} from 'react-redux';

const MenuItemGroup = Menu.ItemGroup;
const SubMenu = Menu.SubMenu;

type State = {
    routeList: object;
    mdPageCategory: object;
}

@connect(
    (state) => {
        return {
            pageContainerRef: state.markdown.pageContainerRef
        }
    },
    (dispatch) => {
        return {
            addPageContainerRef: (ref) => dispatch(action.addPageContainerRef(ref))
        }
    }
)
export default class RoutePage extends React.Component<any, State> {

    readonly state = {
        routeList: [],
        mdPageCategory: []
    };

    constructor(props) {
        super(props);
    }

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
        return (
            <BaseLayout menu={this.renderMenu(routeList)}>
                <Switch>
                    <Route
                        key={'root'}
                        path={'/'}
                        exact
                    >
                        <LazyLoad component={'RootPage'}/>
                    </Route>
                    {/*<Redirect from="/" to="/core" />*/}
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
                                                <LazyLoad
                                                    component={child.component}
                                                />
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
            </BaseLayout>
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
            <div>
                <Router basename={env.BASE_URL}>
                    {
                        this.renderRoute(this.state.routeList)
                    }
                </Router>
                <Planet/>
            </div>
        );
    }
}