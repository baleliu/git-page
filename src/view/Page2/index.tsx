import React from 'react';
import doc from './doc.md';
import nprogress from 'nprogress';
import style from './style.less';
// @ts-ignore
import Planet from 'Component/Planet';

type State = {
    markdown: string,
}

export default class Page2 extends React.Component<object, State> {

    readonly state: State = {
        markdown: "",
    };

    componentWillMount(): void {
        nprogress.start();
        fetch(doc)
            .then(response => {
                return response.text()
            })
            .then(text => {
                this.setState({
                    markdown: text,
                });
                nprogress.done();
            })
    }

    render() {
        return (
            <div className={
                `${style["browser-mock-up"]} ${style["with-url"]}`
            }
            >
                <iframe
                    src={"https://baidu.com"}
                    style={{
                        height: '100vh',
                        width: '100%'
                    }}
                />
            </div>
        );
    }
}