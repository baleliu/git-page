import React from "react";
import Layout from "../Layout";
import {HashRouter, Route} from "react-router-dom";
import Page1 from "../../view/Page1";
import Page2 from "../../view/Page2";
import LazyBundle from "../LazyBundle";

const lazyLoadComponent = (comp) => (props) => (
    <LazyBundle load={comp}>
        {(Container) => <Container {...props}/>}
    </LazyBundle>
)


export default class RouteIndex extends React.Component {


    render() {
        return (
            <HashRouter>
                <Layout>
                    <Route path="/page1" component={lazyLoadComponent(Page1)}/>
                    <Route path="/page2" component={lazyLoadComponent(Page2)}/>
                </Layout>
            </HashRouter>
        );
    }
}