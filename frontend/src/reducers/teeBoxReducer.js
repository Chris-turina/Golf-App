import {
    TEE_BOX_DETAILS_REQUEST,
    TEE_BOX_DETAILS_SUCCESS,
    TEE_BOX_DETAILS_FAIL,

    TEE_BOX_UPDATE_REQUEST,
    TEE_BOX_UPDATE_SUCCESS,
    TEE_BOX_UPDATE_FAIL,

    TEE_BOX_DELETE_REQUEST,
    TEE_BOX_DELETE_SUCCESS,
    TEE_BOX_DELETE_FAIL,

    
    TEE_BOX_BULK_UPDATE_REQUEST,
    TEE_BOX_BULK_UPDATE_SUCCESS,
    TEE_BOX_BULK_UPDATE_FAIL,
} from "../constants/teeBoxConstants"


export const teeBoxDetailsReducer = (state = { teeBox: {} }, action) => {
    switch(action.type) {
        case TEE_BOX_DETAILS_REQUEST:
            return { loading: true, teeBox: {}}
        
        case TEE_BOX_DETAILS_SUCCESS:
            return { loading: false, success: true, teeBox: action.payload }

        case TEE_BOX_DETAILS_FAIL:
            return { loading: false, error: action.payload}

        default: 
            return state
    }
}

export const teeBoxUpdateReducer = (state = { teeBox: {} }, action) => {
    switch(action.type) {
        case TEE_BOX_UPDATE_REQUEST:
            return { loading: true, teeBox: {}}
        
        case TEE_BOX_UPDATE_SUCCESS:
            return { loading: false, success: true, teeBox: action.payload }

        case TEE_BOX_UPDATE_FAIL:
            return { loading: false, error: action.payload}

        default: 
            return state
    }
}


export const teeBoxDeleteReducer = (state = { teeBox:{} }, action) => {
    switch(action.type) {
        case TEE_BOX_DELETE_REQUEST:
            return { loading: true, teeBox: {}}
        
        case TEE_BOX_DELETE_SUCCESS:
            return { loading: false, success: true, teeBox: action.payload }

        case TEE_BOX_DELETE_FAIL:
            return { loading: false, error: action.payload}

        default: 
            return state
    }
}
export const teeBoxBulkUpdateReducer = (state = {teeBoxes:[] }, action) => {
    switch(action.type) {
        case TEE_BOX_BULK_UPDATE_REQUEST:
            return { loading: true, teeBoxes: []}
        
        case TEE_BOX_BULK_UPDATE_SUCCESS:
            return { loading: false, success: true, teeBoxes: action.payload }

        case TEE_BOX_BULK_UPDATE_FAIL:
            return { loading: false, error: action.payload}

        default: 
            return state
    }
}