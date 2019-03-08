import React from 'react';
import { Timeline, Icon } from 'antd';

export default class RootPage extends React.Component{


    render(): React.ReactNode {
        return (
            <Timeline
                pending="还在开发ing..."
                mode="alternate"
                reverse={true}
            >
                <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>
                    2010-03-01 也许是今天开始做的
                </Timeline.Item>
                <Timeline.Item color={'green'}>
                    <p>
                        -- 配置babel+webpack+react+antd+ts<br/>
                        -- 配置router+redux <br/>
                        -- 添加动态router+自动生成router <br/>
                        -- 添加基本markdwon页面 <br/>
                        -- 添加类登录页面加快加载
                    </p>
                </Timeline.Item >
                <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }}/> }>
                    2010-03-09 完成基础框架
                </Timeline.Item>
                <Timeline.Item color={'red'}>
                    2010-03-09 BrowseRouter 设置失败(原因:GitPage静态页面)
                </Timeline.Item>
            </Timeline>
        );
    }
}