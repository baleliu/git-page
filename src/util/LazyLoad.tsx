import React, {lazy, Suspense} from "react";


type Props = {
    component: string
}

export default class LazyLoad extends React.Component<Props> {
    render() {
        const Comp = lazyComp(this.props.component);
        return (
            <Suspense fallback={<h1>Still Loading…</h1>}>
                <Comp/>
            </Suspense>
        )
    };
}

export const lazyComp = (component) => {
    return lazy(() => import(`View/${component}`));
};