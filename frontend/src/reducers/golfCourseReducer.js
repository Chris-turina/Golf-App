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

    GOLF_COURSE_TEE_DETAILS_REQUEST,
    GOLF_COURSE_TEE_DETAILS_SUCCESS,
    GOLF_COURSE_TEE_DETAILS_FAIL,

    GOLF_COURSE_CREATE_REQUEST,
    GOLF_COURSE_CREATE_SUCCESS,
    GOLF_COURSE_CREATE_FAIL,
    GOLF_COURSE_CREATE_RESET,

    GOLF_COURSE_UPDATE_REQUEST,
    GOLF_COURSE_UPDATE_SUCCESS,
    GOLF_COURSE_UPDATE_FAIL,
    GOLF_COURSE_UPDATE_RESET,

    GOLF_COURSE_DELETE_REQUEST,
    GOLF_COURSE_DELETE_SUCCESS,
    GOLF_COURSE_DELETE_FAIL,
    GOLF_COURSE_DELETE_RESET,

    TEE_COLOR_LIST_REQUEST,
    TEE_COLOR_LIST_SUCCESS,
    TEE_COLOR_LIST_FAIL,

    TEE_COLOR_UPDATE_REQUEST,
    TEE_COLOR_UPDATE_SUCCESS,
    TEE_COLOR_UPDATE_FAIL,
    TEE_COLOR_UPDATE_RESET,

    TEE_COLOR_CREATE_REQUEST,
    TEE_COLOR_CREATE_SUCCESS,
    TEE_COLOR_CREATE_FAIL,
    TEE_COLOR_CREATE_RESET,

    TEE_COLOR_DELETE_REQUEST,
    TEE_COLOR_DELETE_SUCCESS,
    TEE_COLOR_DELETE_FAIL,
    TEE_COLOR_DELETE_RESET,

    TEE_UPDATE_REQUEST,
    TEE_UPDATE_SUCCESS,
    TEE_UPDATE_FAIL,
    TEE_UPDATE_RESET,

    
    

} from "../constants/golfCourseConstants"

export const golfCourseListReducer = (state = { golfCourses:[] }, action) => {
    switch(action.type){
        case GOLF_COURSE_LIST_REQUEST:
            return { loading: true, golfCourses: [] }

        case GOLF_COURSE_LIST_SUCCESS:
            return { loading: false, success: true, golfCourses: action.payload }

        case GOLF_COURSE_LIST_FAIL:
            return { loading: false, error: action.payload}

        default: 
            return state
    }
}

export const golfCourseDetailsReducer = (state = { golfCourse: {} }, action) => {
    switch(action.type){
        case GOLF_COURSE_DETAILS_REQUEST:
            return { loading: true, golfCourse: {} }

        case GOLF_COURSE_DETAILS_SUCCESS:
            return { loading: false, golfCourse: action.payload }

        case GOLF_COURSE_DETAILS_FAIL:
            return { loading: false, error: action.payload}

        default: 
            return state
    }
}


export const golfCourseTeeDetailsReducer = (state = { golfCourse: { teeColors: [] } }, action) => {
    switch(action.type){
        case GOLF_COURSE_DETAILS_REQUEST:
            return { loading: true, ...state }

        case GOLF_COURSE_DETAILS_SUCCESS:
            return { loading: false, golfCourse: action.payload }

        case GOLF_COURSE_DETAILS_FAIL:
            return { loading: false, error: action.payload}

        default: 
            return state
    }
}

export const golfCourseHoleDetailsReducer = (state = { golfCourse: { holes: [] } }, action) => {
    switch(action.type){
        case GOLF_COURSE_DETAILS_REQUEST:
            return { loading: true, ...state }

        case GOLF_COURSE_DETAILS_SUCCESS:
            return { loading: false, success: true, golfCourse: action.payload }

        case GOLF_COURSE_DETAILS_FAIL:
            return { loading: false, error: action.payload}

        default: 
            return state
    }
}

export const golfCourseCreateReducer = (state= {}, action) => {
    switch (action.type) {
        case GOLF_COURSE_CREATE_REQUEST:
            return { loading: true}
        
        case GOLF_COURSE_CREATE_SUCCESS:
            return { loading: false, success: true, golfCourse: action.payload }

        case GOLF_COURSE_CREATE_FAIL:
            return { loading: false, error: action.payload}

        case GOLF_COURSE_CREATE_RESET:
            return {}

        default:
            return state
    }
}

export const golfCourseDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case GOLF_COURSE_DELETE_REQUEST:
            return { loading: true}

        case GOLF_COURSE_DELETE_SUCCESS:
            return { loading: false, success: true}

        case GOLF_COURSE_DELETE_FAIL:
            return { loading: false, error: action.payload}

        default:
            return state
    }
}

export const golfCourseUpdateReducer = (state = { golfCourse: {} }, action ) => {
    switch(action.type) {
        case GOLF_COURSE_UPDATE_REQUEST:
            return { loading: true }
        
        case GOLF_COURSE_UPDATE_SUCCESS:
            return { loading: false, success: true, golfCourse: action.payload } 
        
        case GOLF_COURSE_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case GOLF_COURSE_UPDATE_RESET:
            return { golfCourse: {} }

        default:
            return state
    }
}



export const teeColorListReducer = (state = { teeColors:[] }, action) => {
    switch(action.type){
        case TEE_COLOR_LIST_REQUEST:
            return { loading: true, teeColors: [] }

        case TEE_COLOR_LIST_SUCCESS:
            return { loading: false, teeColors: action.payload }

        case TEE_COLOR_LIST_FAIL:
            return { loading: false, error: action.payload}

        default: 
            return state
    }
}

export const teeColorCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case TEE_COLOR_CREATE_REQUEST:
            return { loading: true }

        case TEE_COLOR_CREATE_SUCCESS:
            return { loading: false, success: true, teeColor: action.payload }

        case TEE_COLOR_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case TEE_COLOR_CREATE_RESET:
            return {}

        default:
            return state
    }
}

export const teeColorDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case TEE_COLOR_DELETE_REQUEST:
            return { loading: true }

        case TEE_COLOR_DELETE_SUCCESS:
            return { loading: false, success: true}

        case TEE_COLOR_DELETE_FAIL:
            return { loading: false, error: action.payload}

        default:
            return state
    }
}

export const teeColorUpdateReducer = (state = { teeColor: {} }, action ) => {
    switch(action.type) {
        case TEE_COLOR_UPDATE_REQUEST:
            return { loading: true }

        case TEE_COLOR_UPDATE_SUCCESS:
            return { loading: false, success: true, teeColor: action.payload }

        case TEE_COLOR_UPDATE_FAIL:            
            return { loading: false, error: action.payload }

        case TEE_COLOR_UPDATE_RESET:
            return { teeColor: {} }

        default:
            return state
    }
}



// export const teeUpdateYardsReducer = (state = { golfCourse: { holes: [] } }, action ) => {
//     switch(action.type) {
//         case TEE_UPDATE_REQUEST:
//             return { loading: true, ...state }
            
//         case TEE_UPDATE_SUCCESS:
//             return { loading: false, }
//     }
// }