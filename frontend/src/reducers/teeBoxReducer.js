import {
    TEE_BOX_BULK_UPDATE_REQUEST,
    TEE_BOX_BULK_UPDATE_SUCCESS,
    TEE_BOX_BULK_UPDATE_FAIL,
} from "../constants/teeBoxConstants"

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