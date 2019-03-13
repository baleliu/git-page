import React from 'react';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import './default.css';
import './ext.css';
import {action} from "../../redux/markdown";
import {connect} from 'react-redux';

hljs.initHighlightingOnLoad();

interface FuncType {
    (tokens, id): void
}

type OrderType = 'asc' | 'desc';

type PluginOption = {
    // 标题
    heading_open?: FuncType,
    // 代码块
    fence?: FuncType,
    // 通用文本
    text: FuncType,
    // 链接
    link_open: FuncType,

    // --here--------------------------

    // 单行代码
    code_inline: FuncType,
    // 引用块
    blockquote_open: FuncType,
    // 文本
    paragraph_open: FuncType,
    // 分割线
    hr: FuncType,
    // 图片
    image: FuncType,
    // 无序列表
    bullet_list_open: FuncType,
    // 有序列表
    ordered_list_close: FuncType,
    // 列表行
    list_item_open: FuncType,
    // 斜体
    em_open: FuncType,
    // 粗体
    strong_open: FuncType,
}


/**
 * 代码行号渲染
 * @param src
 */
const addLineNumber = (src: string): string => {
    let result = String();
    let srcArray = src.split('\n');
    for (let i = 0; i < srcArray.length; i++) {
        result += i + ' ' + srcArray[i] + '\n';
    }
    return result;
};

/**
 * 插件主体
 * @param md
 * @param ruleName
 * @param order
 * @param option
 */
const plugin = (md, ruleName, order: OrderType, option: PluginOption) => {
    md.core.ruler.push(ruleName, (state) => {
        function doSwitch(type, i, targetToken) {
            switch (type) {
                case 'link_open':
                    optionRunner(option, 'link_open', state.tokens, i, targetToken);
                    break;
                case 'heading_open':
                    optionRunner(option, 'heading_open', state.tokens, i, targetToken);
                    break;
                case 'fence':
                    optionRunner(option, 'fence', state.tokens, i, targetToken);
                    break;
                case 'text':
                    // 过滤掉无用的token
                    if (targetToken.content !== '') {
                        optionRunner(option, 'text', state.tokens, i, targetToken);
                    }
                    break;
                default:
            }
        }

        if (order === 'asc') {
            for (let i = 0; i < state.tokens.length; i++) {
                if (state.tokens[i].type === 'inline') {
                    const tokenChildren = state.tokens[i].children;
                    for (let j = 0; j < tokenChildren.length; j++) {
                        doSwitch(tokenChildren[j].type, i, tokenChildren[j]);
                    }
                } else {
                    doSwitch(state.tokens[i].type, i, state.tokens[i]);
                }

            }
        } else {
            for (let i = state.tokens.length - 1; i >= 0; i--) {
                doSwitch(state.tokens[i].type, i, state.tokens[i]);
            }
        }
    });
};

/**
 * 运行插件配置
 * @param option
 * @param type
 * @param tokens
 * @param id
 * @param targetToken
 */
const optionRunner = (option, type, tokens, id, targetToken) => {
    if (option) {
        if (option[type]) {
            option[type](tokens, id, targetToken);
        }
    }
};

type Props = {
    src: string
    addCategory?: any
    clearCategory?: any
}

type State = {
    content: string
    md
}

/**
 * markdown 渲染页面
 */
class MdPage extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            md: null,
        };
    }

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        const {addCategory, src} = nextProps;
        // 代码高亮配置
        const md = MarkdownIt({
            highlight: function (src, lang) {
                const result = addLineNumber(src);
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        return '<pre class="hljs"><code>' +
                            hljs.highlight(lang, result, true).value +
                            '</code></pre>';
                    } catch (__) {
                    }
                }
                return '<pre class="hljs"><code>' + md.utils.escapeHtml(result) + '</code></pre>';
            }
        });
        if (this.textAssert(src)) {
            md.use(
                plugin, 'ruler_ext_base', 'asc', {
                    heading_open: (tokens, i, targetToken) => {
                        const markup = targetToken.markup.length;
                        const content = tokens[i + targetToken.nesting].content;
                        addCategory({
                            markup: markup,
                            content: content,
                        });
                    },

                },
            );
            const content = md.render(src);;
            this.setContent(md, content);
        }
    }

    componentWillMount(): void {
        this.clearCategory();
    }

    componentWillUnmount(): void {
        this.clearCategory();
    }

    clearCategory = () => {
        const {clearCategory} = this.props;
        clearCategory();
    };

    /**
     * 校验文本合理性
     * @param text
     */
    textAssert = (text: string): boolean => {
        return text && text != ''
    };

    /**
     * 预加载文本
     * @param content
     */
    setContent = (md, content: string): void => {
        this.setState({
            ...this.state,
            md: md,
            content: content
        })
    };

    render(): React.ReactNode {
        return (
            <div dangerouslySetInnerHTML={{
                __html: this.state.content
            }}/>
        );
    }
}

export default MdPage;