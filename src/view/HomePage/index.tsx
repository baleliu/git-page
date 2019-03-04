import React from "react";
import {Button, Card, Row, Col, Avatar} from 'antd';
import RoutePage from '../RoutePage';

const {Meta} = Card;

type State = {
    isHome: boolean
}

export default class HomePage extends React.Component<object, State> {

    readonly state: State = {
        isHome: false
    };

    render() {
        return (
            <div>

                {
                    this.state.isHome ?
                        <RoutePage/>
                        :
                        <div>
                            <Row>
                                <Col  sm={{span: 24}} lg={{ span: 8, offset: 8 }}>
                                    <Card hoverable={true} title="测试首页 " bordered={true} style={{top: 200}}
                                          actions={[
                                              <Button onClick={(e) => {
                                                  this.setState({
                                                      isHome: true
                                                  });
                                                  console.log(this.state.isHome)
                                              }}>进入文档页面</Button>
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