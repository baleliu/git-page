import React from "react";
import Layout from "../Layout";
import {HashRouter, Route} from "react-router-dom";
import Page1 from "../../view/Page1";
import Page2 from "../../view/Page2";

export default class RouteIndex extends React.Component {
    render() {
        return (
            <HashRouter>
                <Layout>
                    <Route path="/page1" component={Page1}/>
                    <Route path="/page2" component={Page2}/>
                </Layout>
            </HashRouter>
        );
    }
}