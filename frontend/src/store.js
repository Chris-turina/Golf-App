import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { 
    golfCourseListReducer, 
    golfCourseReducer,
    golfCourseTeeDetailsReducer, 
    golfCourseHoleDetailsReducer,
    golfCourseCreateReducer,
    golfCourseDeleteReducer,
    golfCourseUpdateReducer,
    
    teeColorListReducer,
    teeColorCreateReducer,
    teeColorDeleteReducer,
    teeColorUpdateReducer,
} from './reducers/golfCourseReducer';

import { 
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,

} from './reducers/userReducer';

import {
    holeListReducer,
    nineHoleCreateReducer,
    eighteenHoleCreateReducer,
    holeCreateReducer,
    holeUpdateReducer,

    
} from './reducers/holeReducer';

import {
    teeBatchCreateReducer,
    teeBatchDeleteReducer,
    teeAddedToHoleReducer,
    teeYardsUpdateReducer,
} from './reducers/teeReducer';

import {
    roundListReducer,
    roundCreateReducer
} from './reducers/roundReducer'


const reducer = combineReducers({
    golfCourseList: golfCourseListReducer,
    golfCourseTeeDetails: golfCourseTeeDetailsReducer,
    golfCourseHoleDetails: golfCourseHoleDetailsReducer,
    golfCourseCreate: golfCourseCreateReducer,
    golfCourseDelete: golfCourseDeleteReducer,
    golfCourseUpdate: golfCourseUpdateReducer,

    
    teeColorList: teeColorListReducer,
    teeColorCreate: teeColorCreateReducer,
    teeColorDelete: teeColorDeleteReducer,
    teeColorUpdate: teeColorUpdateReducer,

    holeList: holeListReducer,
    holeCreate: holeCreateReducer,
    nineHoleCreate: nineHoleCreateReducer,
    eighteenHoleCreate: eighteenHoleCreateReducer,
    holeUpdate: holeUpdateReducer,

    teeBatchCreate: teeBatchCreateReducer,
    teeBatchDelete: teeBatchDeleteReducer,
    teeAddedToHole: teeAddedToHoleReducer,
    teeYardsUpdate: teeYardsUpdateReducer,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,

    roundList: roundListReducer,
    roundCreate: roundCreateReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store