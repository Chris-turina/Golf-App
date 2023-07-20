import {
PROFILE_REQUEST,
PROFILE_SUCCESS,
PROFILE_FAIL,
PROFILE_RESET,

PROFILE_UPDATE_REQUEST,
PROFILE_UPDATE_SUCCESS,
PROFILE_UPDATE_FAIL,
PROFILE_UPDATE_RESET,

} from "../constants/profileConstants"

export const profileReducer = (state = {profile:{} }, action) => {
    switch(action.type){
        case PROFILE_REQUEST:
            return { loading: true, profile: {} }

        case PROFILE_SUCCESS:
            return { loading: false, success:true, profile: action.payload}

        case PROFILE_FAIL:
            return { loading: false, error: action.payload}
        
        case PROFILE_FAIL:
            return {}

        default:
            return state
    }
}