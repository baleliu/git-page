/// <reference types="react-scripts" />
declare module 'react-router-dom'

declare module "*.md" {
    const content: any;
    export default content;
}

declare module '*.less' {
    const content: any;
    export default content;
}