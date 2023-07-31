import {
    HOLE_LIST_REQUEST,
    HOLE_LIST_SUCCESS,
    HOLE_LIST_FAIL,

    HOLE_UPDATE_REQUEST,
    HOLE_UPDATE_SUCCESS,
    HOLE_UPDATE_FAIL,
    HOLE_UPDATE_RESET,

    HOLE_CREATE_REQUEST,
    HOLE_CREATE_SUCCESS,
    HOLE_CREATE_FAIL,
    HOLE_CREATE_RESET,

    NINE_HOLE_CREATE_REQUEST,
    NINE_HOLE_CREATE_SUCCESS,
    NINE_HOLE_CREATE_FAIL,
    NINE_HOLE_CREATE_RESET,

    EIGHTEEN_HOLE_CREATE_REQUEST,
    EIGHTEEN_HOLE_CREATE_SUCCESS,
    EIGHTEEN_HOLE_CREATE_FAIL,
    EIGHTEEN_HOLE_CREATE_RESET,

    // HOLE_DELETE_REQUEST,
    // HOLE_DELETE_SUCCESS,
    // HOLE_DELETE_FAIL,
    // HOLE_DELETE_RESET,
} from '../constants/holeConstants';

export const holeListReducer = (state = { holes: [] }, action) => {
    switch(action.type) {
        case HOLE_LIST_REQUEST:
            return { loading: true, holes: [] }

        case HOLE_LIST_SUCCESS:
            return { loading: false, holes: action.payload }

        case HOLE_LIST_FAIL:
            return { loading: false, error: action.payload}

        default:
            return state
    }
}

export const holeCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case HOLE_CREATE_REQUEST:
            return { loading: true }
        
            case HOLE_CREATE_SUCCESS:
                return { loading: false, success: true, hole: action.payload }
            
            case HOLE_CREATE_FAIL:
                return { loading: false, error: action.payload }

            case HOLE_CREATE_RESET:
                return {}

            default:
                return state
    }
}

// export const holeDeleteReducer = (state = {}, action) => {
//     switch (action.type) {
//         case HOLE_DELETE_REQUEST:
//             return { loading: true }

//         case HOLE_CREATE_SUCCESS:
//             return { loading: false, success: true, }
//     }
// }

export const nineHoleCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case NINE_HOLE_CREATE_REQUEST:
            return { loading: true }
        
            case NINE_HOLE_CREATE_SUCCESS:
                return { loading: false, success: true, hole: action.payload }
            
            case NINE_HOLE_CREATE_FAIL:
                return { loading: false, error: action.payload }

            case NINE_HOLE_CREATE_RESET:
                return {}

            default:
                return state
    }
}

export const eighteenHoleCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case EIGHTEEN_HOLE_CREATE_REQUEST:
            return { loading: true }
        
            case EIGHTEEN_HOLE_CREATE_SUCCESS:
                return { loading: false, success: true, hole: action.payload }
            
            case EIGHTEEN_HOLE_CREATE_FAIL:
                return { loading: false, error: action.payload }

            case EIGHTEEN_HOLE_CREATE_RESET:
                return {}

            default:
                return state
    }
}

export const holeUpdateReducer = (state = { hole: {} }, action) => {
    switch(action.type) {
        case HOLE_UPDATE_REQUEST:
            return { loading: true }
        case HOLE_UPDATE_SUCCESS:
            return { loading: true, success: true, hole: action.payload }

        case HOLE_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case HOLE_UPDATE_RESET:
            return { hole: {} }

        default:
            return state
    }
}