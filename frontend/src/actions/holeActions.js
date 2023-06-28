import axios from 'axios';
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

    HOLE_DELETE_REQUEST,
    HOLE_DELETE_SUCCESS,
    HOLE_DELETE_FAIL,
    HOLE_DELETE_RESET,
} from '../constants/holeConstants';

export const listHoles = () => async (dispatch) => {
    try {
        dispatch({ type: HOLE_LIST_REQUEST })

        const { data } = await axios.get('/api/holes/')

        dispatch({
            type: HOLE_LIST_SUCCESS,
            payload: data 
        })
    } catch (error) {
        dispatch({
            type: HOLE_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createHole = (golfCourse) => async (dispatch, getState) => {
    try {
        dispatch({
            type: HOLE_CREATE_REQUEST
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
            `/api/golfcourses/${golfCourse.course_id}/create_hole/`,
            {},
            config
        )

        dispatch({
            type: HOLE_CREATE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: HOLE_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createNineHoles = (golfCourse) => async (dispatch, getState) => {
    try {
        dispatch({
            type: NINE_HOLE_CREATE_REQUEST
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
            `/api/golfcourses/${golfCourse.course_id}/create_batch_9_holes/`,
            {},
            config
        )

        dispatch({
            type: NINE_HOLE_CREATE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: NINE_HOLE_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createEighteenHoles = (golfCourse) => async (dispatch, getState) => {
    try {
        dispatch({
            type: EIGHTEEN_HOLE_CREATE_REQUEST
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
            `/api/golfcourses/${golfCourse.course_id}/create_batch_18_holes/`,
            {},
            config
        )

        dispatch({
            type: EIGHTEEN_HOLE_CREATE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: EIGHTEEN_HOLE_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateHole = (hole) => async (dispatch, getState) => {
    try {
        dispatch({
            type: HOLE_UPDATE_REQUEST
        })

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/holes/update/${hole.id}/`,
            hole,
            config,
        )

        dispatch({
            type: HOLE_UPDATE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: HOLE_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
