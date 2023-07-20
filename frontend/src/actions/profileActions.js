import axios from 'axios'
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

export const showProfile = () => async (dispatch, getState) => {
    try {
        dispatch({ type: PROFILE_REQUEST })

        const {
            userLogin: { userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/profiles/my_profile/`,
            config
        )

        dispatch({
            type: PROFILE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

