import React from 'react';
import {connect} from 'react-redux';
import {counter, increaseAction, decreaseAction, todoIncreate} from '../../redux/counter/action'
import {bindActionCreators} from "redux";

// Map Redux state to component props
const mapStateToProps = (state) => {
    return {
        value: state.counter.count
    }
};

// Map Redux actions to component props
const mapDispatchToProps = (dispatch) => {
    return {
        onIncreaseClick: () => {
            dispatch(increaseAction);
        }
    }
};

@connect(
    mapStateToProps,
    mapDispatchToProps
)
export default class Counter extends React.Component<any> {
    render() {
        const {value, onIncreaseClick, dispatch} = this.props;
        bindActionCreators(todoIncreate, dispatch);
        return (
            <div>
                <span>{value}</span>
                <button onClick={onIncreaseClick}>Increase</button>
            </div>
        )
    }
}

/*export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter);*/
