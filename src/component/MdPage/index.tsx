import React from 'react';
import ReactMarkdown from 'react-markdown';

type Props = {
    src?: string
}

class MdPage extends React.Component<Props> {

    static defaultProps = {
        src: "nothing"
    };

    componentDidMount(): void {
        /*fetch('https://doc.bale.net.cn/index.md', {
            method: 'GET',
            headers: {
                'Content-Type': 'text/markdown; charset=utf-8'
            },
        }).then(d => {
            console.log(d)
        });*/
    }

    render(): React.ReactNode {
        return (
            <div>
                <ReactMarkdown source={this.props.src}/>
            </div>
        );
    }
}

export default MdPage;