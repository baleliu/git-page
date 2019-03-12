const ADD_CATEGORY = 'add_category';
const CLEAR_CATEGORY = 'clear_category';

export const action = {
    addCategory: (payload) => {
        return {
            type: ADD_CATEGORY,
            payload: payload
        }
    },
    clearCategory: () =>{
        return {
            type: CLEAR_CATEGORY,
        }
    }
};

// Reducer
export function markdown(state = {category: []}, action) {
    switch (action.type) {
        case ADD_CATEGORY:
            return {
                category: [
                    ...state.category,
                    action.payload
                ]
            };
        case CLEAR_CATEGORY:
            console.log('---clear---2')
            return {
                category: [

                ]
            };
        default:
            return state;
    }
}