import React, {lazy, Suspense} from "react";
import {Button, Card, Row, Col, Avatar} from 'antd';
import {connect} from 'react-redux';
import {action} from '../../redux/global'

const {Meta} = Card;

const RoutePage = lazy(() => import('../RoutePage'))

type State = {
    isHome: boolean
}

type Props = {
    isLogin: string
    login: any,
}

@connect(
    (state) => {
        return {
            isLogin: state.global.isLogin
        }
    },
    (dispatch) => {
        return {
            login: () => dispatch(action.login)
        }
    }
)
export default class HomePage extends React.Component<any> {
    render() {
        const {isLogin, login} = this.props;
        return (
            <div>
                {
                    isLogin ?
                        <Suspense fallback={<h1>Still Loading…</h1>}>
                            <RoutePage/>
                        </Suspense>
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