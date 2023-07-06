import axios from "axios"
import {
    ROUND_STATS_REQUEST,
    ROUND_STATS_SUCCESS,
    ROUND_STATS_FAIL,

} from "../constants/roundStatsConstants"

export const listRoundStats = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ROUND_STATS_REQUEST})

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
            `/api/roundstats/${id}/`,
            config
        )

        dispatch({
            type: ROUND_STATS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ROUND_STATS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}