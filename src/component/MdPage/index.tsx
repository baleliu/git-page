import React from 'react';
import MarkdownIt from 'markdown-it';

type Props = {
    src?: any
}

const mIt = MarkdownIt();

class MdPage extends React.Component<Props> {

    static defaultProps = {
        src: "nothing"
    };


    renderHtml = (src: string) => {
        return mIt.render(src);
    };

    render(): React.ReactNode {
        return (
            <div dangerouslySetInnerHTML={{
                __html: this.renderHtml(this.props.src)
            }}/>
        );
    }
}

export default MdPage;