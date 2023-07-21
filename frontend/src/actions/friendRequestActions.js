import axios from 'axios'
import {
    UPDATE_F_R_NOTIFICATION_REQUEST,
    UPDATE_F_R_NOTIFICATION_SUCCESS,
    UPDATE_F_R_NOTIFICATION_FAIL,
    UPDATE_F_R_NOTIFICATION_RESET
} from '../constants/friendRequestContstants'

export const updateFriendRequest = (status, requestId) => async (dispatch, getState) => {
    console.log(requestId);
    try {
        dispatch({ type: UPDATE_F_R_NOTIFICATION_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/f_r_notifications/update/${requestId}`,
            data,
            config
        )
            console.log('HIT');
        dispatch({
            type: UPDATE_F_R_NOTIFICATION_SUCCESS,
            payload: status
        })
    } catch (error) {
        dispatch({
            type: UPDATE_F_R_NOTIFICATION_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

// export const updateFriendRequest = (status, requestId) => async (dispatch, getState) => {
//     console.log(requestId);
//     try {
//         dispatch({ type: UPDATE_F_R_NOTIFICATION_REQUEST })

//         const {
//             userLogin: { userInfo },
//         } = getState()

//         const config = {
//             headers: {
//                 'Content-type': 'application/json',
//                 Authorization: `Bearer ${userInfo.token}`
//             }
//         }

//         const { data } = await axios.put(
//             `/api/f_r_notifications/update/${requestId}`,
//             data,
//             config
//         )
//             console.log('HIT');
//         dispatch({
//             type: UPDATE_F_R_NOTIFICATION_SUCCESS,
//             payload: status
//         })
//     } catch (error) {
//         dispatch({
//             type: UPDATE_F_R_NOTIFICATION_FAIL,
//             payload: error.response && error.response.data.detail
//                 ? error.response.data.detail
//                 : error.message,
//         })
//     }
// }