import axios from "axios";
import {
    TEE_BOX_DETAILS_REQUEST,
    TEE_BOX_DETAILS_SUCCESS,
    TEE_BOX_DETAILS_FAIL,

    TEE_BOX_DELETE_REQUEST,
    TEE_BOX_DELETE_SUCCESS,
    TEE_BOX_DELETE_FAIL,

    TEE_BOX_BULK_UPDATE_REQUEST,
    TEE_BOX_BULK_UPDATE_SUCCESS,
    TEE_BOX_BULK_UPDATE_FAIL,
} from "../constants/teeBoxConstants"

// This Actions gets 1 Tee Box and its data
// -IN USE
export const listTeeBoxDetails = (id) => async(dispatch, getState) => {
    try{
        dispatch({ type: TEE_BOX_DETAILS_REQUEST})

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
            `/api/teeboxes/${id}/`,
            config
        )

        dispatch({
            type: TEE_BOX_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: TEE_BOX_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
// Updates the Tee Box Data from a Form
// -IN USE
export const updateTeeBox = (teeBox) => async (dispatch, getState) => {
    console.log(teeBox);
    try { 
        dispatch({ type: TEE_BOX_DETAILS_REQUEST})

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
            `/api/teeboxes/update/${teeBox.id}/`,
            teeBox,
            config
        )

        dispatch({
            type: TEE_BOX_DETAILS_SUCCESS,
            payload: data,
        })


    } catch(error) {
        dispatch({
            type: TEE_BOX_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

// Deletes a Tee Box and all the associated Tees
// IN USE
export const deleteTeeBox = (teeBox) => async(dispatch, getState) => {
    try {
        dispatch({ type: TEE_BOX_DELETE_REQUEST})

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
            `/api/teeboxes/delete/${teeBox.id}/`,
            config
        )

        dispatch({
            type: TEE_BOX_DELETE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: TEE_BOX_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

// Updates Multiple Tee Boxes at Onces
// IN USE
export const updateBulkTeeBoxes = (teeBoxes, courseId) => async (dispatch, getState) => {
    console.log(teeBoxes, courseId);
    try {
        dispatch({ type: TEE_BOX_BULK_UPDATE_REQUEST})

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
            `/api/teeboxes/bulk_update/course:${courseId}/`,
            {teeBoxes,courseId},
            config
            
        )


        dispatch({
            type: TEE_BOX_BULK_UPDATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: TEE_BOX_BULK_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}