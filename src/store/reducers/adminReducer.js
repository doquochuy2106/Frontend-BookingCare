import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    doctors: [],
    allDoctors: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        //Gender
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state }
            copyState.isLoadingGender = true
            return {
                ...copyState,
            }

        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data
            state.isLoadingGender = false
            return {
                ...state,
            }

        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGender = false
            state.genders = []
            return {
                ...state,
            }

        //Position

        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data
            return {
                ...state,
            }

        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = []
            return {
                ...state,
            }

        //Roles
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = []
            return {
                ...state,
            }

        //READ
        case actionTypes.FETCH_USER_SUCCESS:
            state.users = action.listUsers
            return {
                ...state,
            }
        case actionTypes.FETCH_USER_FAILED:
            state.users = []
            return {
                ...state,
            }


        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.doctors = action.dataDoctor
            return {
                ...state,
            }

        case actionTypes.FETCH_TOP_DOCTOR_FAILED:
            state.doctors = []
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.allDoctors = action.data
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_DOCTOR_FAILED:
            state.allDoctors = []
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default adminReducer;