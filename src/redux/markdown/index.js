const ADD_CATEGORY = 'add_category';
const CLEAR_CATEGORY = 'clear_category';
const OPEN_MD_PAGE = "open_category";
const ADD_PAGE_CONTAINER_REF = "add_page_container_ref";

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
    },
    addPageContainerRef: (payload) => {
        return {
            type: ADD_PAGE_CONTAINER_REF,
            payload: payload
        }
    }
};

const initState = () => {
    return {
        category: [],
        isOpen: false,
        pageContainerRef: window,
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
        case ADD_PAGE_CONTAINER_REF:
            return {
                ...state,
                pageContainerRef: action.payload
            }
        default:
            return state;
    }
}