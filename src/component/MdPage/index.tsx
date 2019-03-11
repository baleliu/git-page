import React from 'react';
import MarkdownIt from 'markdown-it';
import Util from 'markdown-it/lib/common/utils';

var escapeHtml = Util.escapeHtml;
var unescapeAll = Util.unescapeAll;

type Props = {
    src?: any
}

const md = MarkdownIt('commonmark');

const test = (x, options) => {
    console.log("-----test-----")
    console.log(options)
}

const headerPlugin = (md, ruleName, tokenType, iterator) => {

};

function for_inline_plugin(md, ruleName, tokenType, iterator) {

    function scan(state) {
        console.log(state)
        var i, blkIdx, inlineTokens;

        for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {


            if (state.tokens[blkIdx].type !== 'heading_open') {
                continue;
            }

            state.tokens[blkIdx].attrs = [];
            inlineTokens = state.tokens;
            // state.tokens[blkIdx]= inlineTokens;
            console.log(state.tokens[blkIdx])
            iterator(inlineTokens, blkIdx);


            /*for (i = inlineTokens.length - 1; i >= 0; i--) {
                if (inlineTokens[i].type !== tokenType) {
                    continue;
                }
                console.log("-")
                iterator(inlineTokens, i);
            }*/
        }
    }

    md.core.ruler.push(ruleName, scan);
};

md.use(
    for_inline_plugin, 'url_new_win', 'heading_open', function (tokens, idx) {

        console.log(tokens[idx])
        // tokens[idx].attrs=[ 'className', 'xxxx' ];
        tokens[idx].attrPush(['className', 'xxxx']);
    }
);


var defaultRender = md.renderer.rules.image,
    vimeoRE = /^https?:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;


md.renderer.rules.fence = function (tokens, idx, options, env, slf) {
    var token = tokens[idx],
        info = token.info ? unescapeAll(token.info).trim() : '',
        langName = '',
        highlighted, i, tmpAttrs, tmpToken;

    if (info) {
        langName = info.split(/\s+/g)[0];
    }

    if (options.highlight) {
        highlighted = options.highlight(token.content, langName) || escapeHtml(token.content);
    } else {
        highlighted = escapeHtml(token.content);
    }

    if (highlighted.indexOf('<pre') === 0) {
        return highlighted + '\n';
    }

    // If language exists, inject class gently, without modifying original token.
    // May be, one day we will add .clone() for token and simplify this part, but
    // now we prefer to keep things local.
    if (info) {
        i = token.attrIndex('class');
        tmpAttrs = token.attrs ? token.attrs.slice() : [];

        if (i < 0) {
            tmpAttrs.push(['class', options.langPrefix + langName]);
        } else {
            tmpAttrs[i][1] += ' ' + options.langPrefix + langName;
        }

        // Fake token just to render attributes
        tmpToken = {
            attrs: tmpAttrs
        };

        return '<pre><code' + slf.renderAttrs(tmpToken) + '>'
            + highlighted
            + '</code></pre>\n';


    }
    return '<pre style="border: 1px solid black"><code' + slf.renderAttrs(token) + '>'
        + highlighted
        + '</code></pre>\n';
};

md.renderer.rules.text = function (tokens, idx /*, options, env */) {
    return escapeHtml(
        tokens[idx].content
    );
};


md.renderer.html_block = function (tokens, idx /*, options, env */) {

    return tokens[idx].content;
};
md.renderer.html_inline = function (tokens, idx /*, options, env */) {

    return tokens[idx].content;
};


// console.log(md.renderer.rules);


class MdPage extends React.Component<Props> {

    static defaultProps = {
        src: "nothing"
    };


    renderHtml = (src: string) => {


        return md.render(src);
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