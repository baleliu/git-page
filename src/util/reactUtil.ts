import React from "react";

/**
 * this.props.children 合并属性
 * @param children
 * @param subProps
 */
export const propsWithChildren = (children, subProps: object) => {
    return React.Children.map(children,
        (child: React.ReactElement<any>) =>
            React.cloneElement(child, subProps))
};