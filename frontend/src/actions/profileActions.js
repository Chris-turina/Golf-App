import axios from 'axios'
import {
    PROFILE_REQUEST,
    PROFILE_SUCCESS,
    PROFILE_FAIL,
    // PROFILE_RESET,

    PROFILE_LIST_REQUEST,
    PROFILE_LIST_SUCCESS,
    PROFILE_LIST_FAIL,
    // PROFILE_LIST_RESET,
    
    PROFILE_UPDATE_REQUEST,
    PROFILE_UPDATE_SUCCESS,
    PROFILE_UPDATE_FAIL,
    // PROFILE_UPDATE_RESET,
    
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

export const updateFriendRequestList = (status, requestId) => async (dispatch, getState) => {
    console.log(status, requestId);
    try{
        dispatch({ type: PROFILE_UPDATE_REQUEST })

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
            status,
            config,
        )

        dispatch({
            type: PROFILE_UPDATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateProfile = (status, requestId) => async (dispatch, getState) => {
    try{
        dispatch({ type: PROFILE_UPDATE_REQUEST })

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
            `/api/profiles/my_profile/update/`,
            config,
        )

        dispatch({
            type: PROFILE_UPDATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const findFriendsProfiles = (term) => async (dispatch, getState) => {
    try {
        dispatch({ type: PROFILE_LIST_REQUEST})

        const {
            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
            params: {
                'search_term': term
            }
        }

        const { data } = await axios.get(
            `/api/profiles/find_friends/`,
            config  
        )
        
        dispatch({
            type: PROFILE_LIST_SUCCESS,
            payload: data 
        })

    } catch(error) {
        dispatch({
            type: PROFILE_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



