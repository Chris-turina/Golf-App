import { 
    TEE_UPDATE_REQUEST,
    TEE_UPDATE_SUCCESS,
    TEE_UPDATE_FAIL,
    TEE_UPDATE_RESET,

    TEE_BATCH_CREATE_REQUEST,
    TEE_BATCH_CREATE_SUCCESS,
    TEE_BATCH_CREATE_FAIL,
    TEE_BATCH_CREATE_RESET,

    TEE_BATCH_DELETE_REQUEST,
    TEE_BATCH_DELETE_SUCCESS,
    TEE_BATCH_DELETE_FAIL,

    TEE_ADDED_TO_HOLES_REQUEST,
    TEE_ADDED_TO_HOLES_SUCCESS,
    TEE_ADDED_TO_HOLES_FAIL,

    COURSE_TEE_LIST_REQUEST,
    COURSE_TEE_LIST_SUCCESS,
    COURSE_TEE_LIST_FAIL,

} from "../constants/teeConstants";


export const teeYardsUpdateReducer = (state = { tee: {} }, action ) => {
    switch(action.type) {
        case TEE_UPDATE_REQUEST:
            return { loading: true }

        case TEE_UPDATE_SUCCESS:
            return { loading: false, success: true, tee: action.payload }

        case TEE_UPDATE_FAIL:
            return { lading: false, error: action.payload }

        case TEE_UPDATE_RESET:
            return { tee: {} }

        default:
            return state
    }
}

export const teeBatchCreateReducer = (state ={}, action) => {
    switch (action.type) {
        case TEE_BATCH_CREATE_REQUEST:
            return { loading: true }

        case TEE_BATCH_CREATE_SUCCESS:
            return { loading: false, success:true, tee: action.payload }

        case TEE_BATCH_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case TEE_BATCH_CREATE_RESET:
            return {}

        default:
            return state
    }
}


export const teeBatchDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case TEE_BATCH_DELETE_REQUEST:
            return { loading: true }

        case TEE_BATCH_DELETE_SUCCESS:
            return { loading: false, success: true}

        case TEE_BATCH_DELETE_FAIL:
            return { loading: false, error: action.payload}

        default:
            return state
    }
}


export const teeAddedToHoleReducer = (state = {}, action) => {
    switch(action.type) {
        case TEE_ADDED_TO_HOLES_REQUEST:
            return { loading: true }
        
        case TEE_ADDED_TO_HOLES_SUCCESS:
            return { loading: false, success: true, teeColor: action.payload} 
            
        case TEE_ADDED_TO_HOLES_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const courseTeeListReducer = (state = {}, action) => {
    switch(action.type) {
        case COURSE_TEE_LIST_REQUEST:
            return {loading: true}

        case COURSE_TEE_LIST_SUCCESS:
            return { loading: false, success: true, tees: action.payload}

        case COURSE_TEE_LIST_FAIL:
            return { laoding: false, error: action.payload}

        default:
            return state
    }
}


