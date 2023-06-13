import { combineReducers } from 'redux'
import {
    LOGGING_IN, IS_LOGGED_IN,
    UPDATE_PATIENTS, UPDATE_ERROR_MESSAGE
  } from '../actions'

// if the user is authenticated
const authenticatedUser = (state = false, action) => {
    switch (action.type) {
        case IS_LOGGED_IN:
            return action.success;
        default:
            return state;
    }
}

// to let the app know it's attempting to log in, for loading indicator purposes
const fetchingAuthentication = (state = false, action) => {
    switch (action.type) {
        case LOGGING_IN:
            return action.loggingIn;
        default:
            return state;
    }
}

// a list of patients recieved on successful login
const patientsList = (state = [], action) => {
    switch (action.type) {
        case UPDATE_PATIENTS:
            return action.patients;
        default:
            return state;
    }
}

// TO-DO, if unsuccessful log in, show the erro recieved
const errorMessage = (state = null, action) => {
    switch (action.type) {
        case UPDATE_ERROR_MESSAGE:
            return action.errorMessage;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    authenticatedUser,
    fetchingAuthentication,
    patientsList,
    errorMessage
})

export default rootReducer