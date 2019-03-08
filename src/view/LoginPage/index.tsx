import React, {lazy, Suspense} from "react";
import {Button, Card, Row, Col, Avatar} from 'antd';
import {connect} from 'react-redux';
import {action} from '../../redux/global'
// @ts-ignore
import LazyLoad from 'Util/LazyLoad';

const {Meta} = Card;


@connect(
    (state) => {
        return {
            isLogin: state.global.isLogin
        }
    },
    (dispatch) => {
        return {
            login: () => dispatch(action.login),
            //init: () => dispatch(action.init)
        }
    }
)
export default class LoginPage extends React.Component<any> {
    componentWillMount(): void {
    }

    render() {
        const {isLogin, login} = this.props;
        return (
            <div>
                {
                    isLogin ?
                        <LazyLoad component={"RoutePage"}/>
                        :
                        <div>
                            <Row>
                                <Col sm={{span: 24}} lg={{span: 8, offset: 8}}>
                                    <Card hoverable={true} title="测试首页 " bordered={true} style={{top: 200}}
                                          actions={[
                                              <Button onClick={login}>进入文档页面</Button>
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