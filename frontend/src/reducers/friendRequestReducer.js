import {
    UPDATE_F_R_NOTIFICATION_REQUEST,
    UPDATE_F_R_NOTIFICATION_SUCCESS,
    UPDATE_F_R_NOTIFICATION_FAIL,
    UPDATE_F_R_NOTIFICATION_RESET
} from '../constants/friendRequestContstants'

export const freindRequestReducer = (state = {f_r_notification: {}}, action ) => {
    switch(action.type){
        case UPDATE_F_R_NOTIFICATION_REQUEST:
            return { loading: true, f_r_notification: {} }

        case UPDATE_F_R_NOTIFICATION_SUCCESS:
            return { loading: false, success:true, f_r_notification: action.payload}

        case UPDATE_F_R_NOTIFICATION_FAIL:
            return { loading: false, error: action.payload}
        
        case UPDATE_F_R_NOTIFICATION_RESET:
            return {}

        default:
            return state
    }
}