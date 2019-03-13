const ADD_CATEGORY = 'add_category';
const CLEAR_CATEGORY = 'clear_category';
const OPEN_MD_PAGE = "open_category";
const CLOSE_category = "clao"

export const action = {
    addCategory: (payload) => {
        return {
            type: ADD_CATEGORY,
            payload: payload
        }
    },
    clearCategory: () => {
        return {
            type: CLEAR_CATEGORY,
        }
    },
    openMdPage: () => {
        return {
            type: OPEN_MD_PAGE
        }
    }
};

const initState = () => {
    return {
        category: [],
        isOpen: false
    }
};

// Reducer
export function markdown(state = initState(), action) {
    switch (action.type) {
        case ADD_CATEGORY:
            return {
                ...state,
                category: [
                    ...state.category,
                    action.payload
                ]
            };
        case CLEAR_CATEGORY:
            return {
                ...state,
                category: []
            };
        case OPEN_MD_PAGE:
            return {
                ...state,
                isOpen: true,
            };
        default:
            return state;
    }
}