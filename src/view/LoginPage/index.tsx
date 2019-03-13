import React, {lazy, Suspense} from "react";
import {Button, Card, Row, Col, Avatar} from 'antd';
import {connect} from 'react-redux';
// @ts-ignore
import LazyLoad from 'Util/LazyLoad';
// @ts-ignore
import Session from 'Util/session';

const {Meta} = Card;

type State = {
    loginFlag
}

export default class LoginPage extends React.Component<any, State> {

    constructor(props){
        super(props);
        this.state = {
            loginFlag: Session.isLogin()
        }
    }

    componentWillMount(): void {
    }

    login = (): void => {
        Session.login();
        this.setState({
            ...this.state,
            loginFlag: true
        })
    };

    render() {
        return (
            <div>
                {
                    this.state.loginFlag ?
                        <LazyLoad component={"RoutePage"}/>
                        :
                        <div>
                            <Row>
                                <Col sm={{span: 24}} lg={{span: 8, offset: 8}}>
                                    <Card hoverable={true} title="测试首页 " bordered={true} style={{top: 200}}
                                          actions={[
                                              <Button onClick={this.login}>进入文档页面</Button>
                                          ]}
                                    >
                                        <Meta
                                            avatar={<Avatar src="https://i.loli.net/2019/03/03/5c7ac27490aec.jpg"/>}
                                            description="create by bale.liu@qq.com"
                                        />
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                }
            </div>
        );
    }
}