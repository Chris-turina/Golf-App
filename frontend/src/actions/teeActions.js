import axios from "axios";
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
} from "../constants/teeConstants";

export const updateTee = (tee) => async (dispatch, getState) => {
    try {
        dispatch({
            type: TEE_UPDATE_REQUEST
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

        const { data } = await axios.put(
            `/api/tee/yards/update/${tee.id}/`,
            tee,
            config
        )

        dispatch({
            type: TEE_UPDATE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: TEE_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const createTees = (hole) => async (dispatch, getState) => {
    try {
        dispatch({
            type: TEE_BATCH_CREATE_REQUEST
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
            `/api/golfcourses/hole/${hole.courseId}/createtee/${hole.teeColorId}/`,
            {},
            config
        )

        dispatch({
            type: TEE_BATCH_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: TEE_BATCH_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }

}

export const deleteTeeBatch = (teeColor_id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: TEE_BATCH_DELETE_REQUEST
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

        const { data } = await axios.delete(
            `/api/golfcourses/hole/deletetee/${teeColor_id}`,
            config

        )

        dispatch ({
            type: TEE_BATCH_DELETE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: TEE_BATCH_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })   
    }
}

export const addedToHole = (teeColor) => async (dispatch, getState) => {
    try {
        dispatch({
            type: TEE_ADDED_TO_HOLES_REQUEST
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

        const { data } = await axios.put(
            `/api/teecolors/added_to_holes/${teeColor.id}/`,
            teeColor,
            config
        )

        dispatch({
            type: TEE_ADDED_TO_HOLES_SUCCESS,
            payload: data,
        })
        
    } catch (error) {
        dispatch({
            type: TEE_ADDED_TO_HOLES_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}