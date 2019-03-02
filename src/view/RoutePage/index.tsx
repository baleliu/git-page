import React from "react";
import Layout from "../../component/Layout";
import {Route, HashRouter, Switch, Redirect} from "react-router-dom";
import Page1 from "../../view/Page1";
import Page2 from "../../view/Page2";
import LazyBundle from "../../component/LazyBundle";

const lazyLoadComponent = (comp) => (props) => (
    <LazyBundle load={comp}>
        {(Container) => <Container {...props}/>}
    </LazyBundle>
);

export default class RoutePage extends React.Component {



    render() {
        return (
            <HashRouter>
                <Layout>
                    <Switch>
                        <Route path="/page1" component={lazyLoadComponent(Page1)}/>
                        <Route path="/page2" component={lazyLoadComponent(Page2)}/>
                        <Redirect from={"/"} to={"/page1"}/>
                    </Switch>
                </Layout>
            </HashRouter>
        );
    }
}