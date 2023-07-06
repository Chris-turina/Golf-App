import axios from "axios";
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
} from "../constants/roundConstants";

export const listRounds = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ROUND_LIST_REQUEST})

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            '/api/rounds/',
            config
            )
            

        dispatch({
            type: ROUND_LIST_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: ROUND_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listRound = (id) => async(dispatch, getState) => {
    try {
        dispatch({
            type: ROUND_DETAILS_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/rounds/${id}/`,
            config
        )

        dispatch({
            type: ROUND_DETAILS_SUCCESS,
            payload: data
        })



    } catch (error) {
        dispatch({
            type: ROUND_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createRound = (round) => async(dispatch, getState) => {
    try {
        dispatch({
            type: ROUND_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/rounds/course/${round.golfCourse}/tee_color/${round.teeColor}/create/`,
            round.newScore,
            config,
        )

        dispatch({
            type: ROUND_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ROUND_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}