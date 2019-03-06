// Action
//
export const increaseAction = {type: 'increase'};

export const decreaseAction = {type: 'decrease'};

export const todoIncreate = ()=> {
    return {
        type: 'increase'
    }
}


// Reducer
export function counter(state = {count: 0}, action) {
    const count = state.count;
    switch (action.type) {
        case 'increase':
            return {count: count + 1}
        default:
            return state
    }
}
export function testCounter(state = {count: 0}, action) {
    const count = state.count;
    switch (action.type) {
        case 'decrease':
            return {count: count - 1}
        default:
            return state
    }
}
