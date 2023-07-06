import {
    ROUND_STATS_REQUEST,
    ROUND_STATS_SUCCESS,
    ROUND_STATS_FAIL,


} from "../constants/roundStatsConstants"

export const roundStatsReducer = ( state = {stats: {} }, action ) => {
    switch(action.type) {
        case ROUND_STATS_REQUEST:
            return { loading: true, stats: {} }

        case ROUND_STATS_SUCCESS:
            return { loading: false, stats: action.payload }

        case ROUND_STATS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state 
    }
}