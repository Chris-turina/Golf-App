import {
    ROUND_LIST_REQUEST,
    ROUND_LIST_SUCCESS,
    ROUND_LIST_FAIL,

    ROUND_DETAILS_REQUEST,
    ROUND_DETAILS_SUCCESS,
    ROUND_DETAILS_FAIL,

    ROUND_CREATE_REQUEST,
    ROUND_CREATE_SUCCESS,
    ROUND_CREATE_FAIL,
    ROUND_CREATE_RESET,

    ROUND_DELETE_REQUEST,
    ROUND_DELETE_SUCCESS,
    ROUND_DELETE_FAIL,
} from "../constants/roundConstants";

export const roundListReducer = (state = { rounds:[] }, action ) => {
    switch (action.type) {
        case ROUND_LIST_REQUEST:
            return { loading: true, rounds: [] }

        case ROUND_LIST_SUCCESS:
            return { loading: false, rounds: action.payload }

        case ROUND_LIST_FAIL:
            return { loading: false, error: action.payload }
    
        default:
            return state            
    }
}

export const roundDetailsReducer = (state = { round: {} }, action) => {
    switch(action.type) {
        case ROUND_DETAILS_REQUEST:
            return { loading: true, round: {} }

        case ROUND_DETAILS_SUCCESS:
            return { loading: false, round: action.payload }

        case ROUND_DETAILS_FAIL:
            return { loading: false, error: action.payload}

        default:
            return state
    }

}

export const roundCreateReducer = (state = {}, action) => {
    switch(action.type) {
        case ROUND_CREATE_REQUEST:
            return { loading: true}

        case ROUND_CREATE_SUCCESS:
            return { loading: false, success: true, round: action.payload }

        case ROUND_CREATE_FAIL:
            return { loading: false, error: action.payload}

        case ROUND_CREATE_RESET:
            return {}

        default:
            return state
    }
}

export const roundDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case ROUND_DELETE_REQUEST:
            return { loading: true }
        
        case ROUND_DELETE_SUCCESS:
            return { loading: false, success: true}
        
        case ROUND_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}