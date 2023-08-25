import axios from "axios";
import {
    TEE_BOX_BULK_UPDATE_REQUEST,
    TEE_BOX_BULK_UPDATE_SUCCESS,
    TEE_BOX_BULK_UPDATE_FAIL,
} from "../constants/teeBoxConstants"


export const updateBulkTeeBoxes = (teeBoxes, courseId) => async (dispatch, getState) => {
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
            `/api/teeboxes/bulk_update/`,
            {teeBoxes,courseId},
            config
        )

        dispatch({
            type: TEE_BOX_BULK_UPDATE_SUCCESS,
            payload: teeBoxes,
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