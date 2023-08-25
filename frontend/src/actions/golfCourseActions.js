import axios from "axios";
import { 
    GOLF_COURSE_LIST_REQUEST,
    GOLF_COURSE_LIST_SUCCESS,
    GOLF_COURSE_LIST_FAIL,

    GOLF_COURSE_DETAILS_REQUEST,
    GOLF_COURSE_DETAILS_SUCCESS,
    GOLF_COURSE_DETAILS_FAIL,

    GOLF_COURSE_HOLE_DETAILS_REQUEST,
    GOLF_COURSE_HOLE_DETAILS_SUCCESS,
    GOLF_COURSE_HOLE_DETAILS_FAIL,

    // GOLF_COURSE_TEE_DETAILS_REQUEST,
    // GOLF_COURSE_TEE_DETAILS_SUCCESS,
    // GOLF_COURSE_TEE_DETAILS_FAIL,

    GOLF_COURSE_CREATE_REQUEST,
    GOLF_COURSE_CREATE_SUCCESS,
    GOLF_COURSE_CREATE_FAIL,
    
    GOLF_COURSE_NEW_CREATED_REQUEST,
    GOLF_COURSE_NEW_CREATED_SUCCESS,
    GOLF_COURSE_NEW_CREATED_FAIL,

    GOLF_COURSE_UPDATE_REQUEST,
    GOLF_COURSE_UPDATE_SUCCESS,
    GOLF_COURSE_UPDATE_FAIL,
    // GOLF_COURSE_UPDATE_RESET,

    GOLF_COURSE_DELETE_REQUEST,
    GOLF_COURSE_DELETE_SUCCESS,
    GOLF_COURSE_DELETE_FAIL,
    // GOLF_COURSE_DELETE_RESET,

    TEE_COLOR_LIST_REQUEST,
    TEE_COLOR_LIST_SUCCESS,
    TEE_COLOR_LIST_FAIL,

    TEE_COLOR_UPDATE_REQUEST,
    TEE_COLOR_UPDATE_SUCCESS,
    TEE_COLOR_UPDATE_FAIL,
    // TEE_COLOR_UPDATE_RESET,

    TEE_COLOR_CREATE_REQUEST,
    TEE_COLOR_CREATE_SUCCESS,
    TEE_COLOR_CREATE_FAIL,
    // TEE_COLOR_CREATE_RESET,

    TEE_COLOR_DELETE_REQUEST,
    TEE_COLOR_DELETE_SUCCESS,
    TEE_COLOR_DELETE_FAIL,
    // TEE_COLOR_DELETE_RESET,

    // HOLE_LIST_REQUEST,
    // HOLE_LIST_SUCCESS,
    // HOLE_LIST_FAIL,

    // HOLE_UPDATE_REQUEST,
    // HOLE_UPDATE_SUCCESS,
    // HOLE_UPDATE_FAIL,
    // HOLE_UPDATE_RESET,

    // HOLE_CREATE_REQUEST,
    // HOLE_CREATE_SUCCESS,
    // HOLE_CREATE_FAIL,
    // HOLE_CREATE_RESET,

    // HOLE_DELETE_REQUEST,
    // HOLE_DELETE_SUCCESS,
    // HOLE_DELETE_FAIL,
    // HOLE_DELETE_RESET,

    // TEE_UPDATE_REQUEST,
    // TEE_UPDATE_SUCCESS,
    // TEE_UPDATE_FAIL,
    // TEE_UPDATE_RESET,

} from "../constants/golfCourseConstants";

export const listGolfCourses = () => async (dispatch) => {
    try {
        dispatch({type: GOLF_COURSE_LIST_REQUEST})

        const {data} = await axios.get('/api/golfcourses/')

        dispatch({
            type: GOLF_COURSE_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GOLF_COURSE_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listGolfCourseDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: GOLF_COURSE_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/golfcourses/${id}`)

        dispatch({
            type: GOLF_COURSE_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GOLF_COURSE_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listGolfCourseTeeDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: GOLF_COURSE_HOLE_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/golfcourses/${id}`)

        dispatch({
            type: GOLF_COURSE_HOLE_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GOLF_COURSE_HOLE_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const deleteGolfCourse = (id) => async (dispatch, getState) => {
    try {
        dispatch({ 
            type: GOLF_COURSE_DELETE_REQUEST
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
            `/api/golfcourses/delete/${id}/`,
            config
        )

        dispatch ({
            type: GOLF_COURSE_DELETE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GOLF_COURSE_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createGolfCourse = (golfCourse) => async (dispatch, getState) => {
    console.log(golfCourse);
    try {
        dispatch({
            type: GOLF_COURSE_CREATE_REQUEST
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
            `/api/create_course/create/`,
            golfCourse,
            config
        )
        
        dispatch({
            type: GOLF_COURSE_CREATE_SUCCESS,
            payload: golfCourse,
        })
    } catch (error) {
        dispatch({
            type: GOLF_COURSE_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getGolfCourseNewAdded = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: GOLF_COURSE_NEW_CREATED_REQUEST
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
            `/api/golfcourses/new_golf_course/`,
            config
        )

        dispatch({
            type: GOLF_COURSE_NEW_CREATED_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: GOLF_COURSE_NEW_CREATED_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateGolfCourse = (golfCourse) => async (dispatch, getState) => {
    try {
        dispatch ({
            type: GOLF_COURSE_UPDATE_REQUEST
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
            `/api/golfcourses/update/${golfCourse.course_id}/`,
            golfCourse,
            config
        )

        dispatch ({
            type: GOLF_COURSE_UPDATE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: GOLF_COURSE_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const listTeeColors = () => async (dispatch) => {
    try {
        dispatch({type: TEE_COLOR_LIST_REQUEST})

        const {data} = await axios.get('/api/teecolors/')

        dispatch({
            type: TEE_COLOR_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: TEE_COLOR_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createTeeColor = (golfCourse) => async (dispatch, getState) => {
    try {
        dispatch({
            type: TEE_COLOR_CREATE_REQUEST
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
            `/api/golfcourses/${golfCourse.course_id}/createtee_color/`,
            {},
            config
        )
        
        dispatch({
            type: TEE_COLOR_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: TEE_COLOR_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const deleteTeeColor = (course_id, teeColor_id) => async (dispatch, getState) => {
    try {
        dispatch({ 
            type: TEE_COLOR_DELETE_REQUEST
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
            `/api/golfcourses/${course_id}/deletetee_color/${teeColor_id}`,
            config
            
        )

        dispatch ({
            type: TEE_COLOR_DELETE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: TEE_COLOR_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateTeeColor = (teeColor) => async (dispatch, getState) => {
    
    try{        
        dispatch ({
            type: TEE_COLOR_UPDATE_REQUEST
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
            `/api/teecolors/update/${teeColor.id}/`,
            teeColor,
            config,       
        )

        dispatch({
            type: TEE_COLOR_UPDATE_SUCCESS,
            payload: data,
        })

        
    
    } catch (error) {
        dispatch({
            type: TEE_COLOR_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const updateTeeYards = (golfCourse, teeColor, newTees) => async (dispatch, getState) => {
    try {
        dispatch ({
            type: GOLF_COURSE_DETAILS_REQUEST
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
            `/api/golfcourses/${golfCourse.golfCourse.course_id}/update_yards/${golfCourse.teeColor}/`,            
            golfCourse.newTees,
            config,
        )

        dispatch({
            type: GOLF_COURSE_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GOLF_COURSE_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateGolfCourseHoles = (holes) => async(dispatch, getState) => {
    console.log(holes);
    try {
        dispatch ({
            type: GOLF_COURSE_UPDATE_REQUEST
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
            `/api/golfcourses/holes/update/${holes.id}/`,
            holes.holes,
            config
        )

        dispatch ({
            type: GOLF_COURSE_UPDATE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: GOLF_COURSE_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateGolfCourseTeeColors = (teeColors) => async(dispatch, getState) => {
    console.log(teeColors);
    try {
        dispatch ({
            type: GOLF_COURSE_UPDATE_REQUEST
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
            `/api/golfcourses/teeColors/update/${teeColors.id}/`,
            teeColors.teeColors,
            config
        )

        dispatch ({
            type: GOLF_COURSE_UPDATE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: GOLF_COURSE_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}