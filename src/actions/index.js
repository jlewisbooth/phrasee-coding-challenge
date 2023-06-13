export const LOGGING_IN = 'LOGGING_IN'
export const IS_LOGGED_IN = 'IS_LOGGED_IN'
export const UPDATE_PATIENTS = 'UPDATE_PATIENTS'
export const UPDATE_ERROR_MESSAGE = 'UPDATE_ERROR_MESSAGE'

export const authenticateUser = success => ({
    type: IS_LOGGED_IN,
    success
});

export const recievePatients = (patients) => ({
    type: UPDATE_PATIENTS,
    patients
});

export const loggingIn = (status) => ({
    type: LOGGING_IN,
    loggingIn: status
});

export const updateErrorMessage = (msg) => ({
    type: UPDATE_ERROR_MESSAGE,
    errorMessage: msg
});

const makeLogInRequest = payload => async (dispatch) => {
    dispatch(loggingIn(true));

    try {
        let request = await fetch("https://run.mocky.io/v3/3669c83a-9ba1-4424-b08f-a8ef6d699966", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: payload.username,
                password: payload.password
            })
        });

        dispatch(loggingIn(false));

        // if we recieve a 200 status, proceed
        if(request.status === 200) {
            let response = await request.json();

            // authenticate user
            dispatch(authenticateUser(true));

            // update patients list
            if(Array.isArray(response.patients)) {
                dispatch(recievePatients(response.patients));
            }
            
        }

        // if we recieve a 401 status, let the user know log-in was unsuccessful
        if(request.status === 401) {
            dispatch(updateErrorMessage("Unsuccessful login. Please try again."));
            dispatch(authenticateUser(false));
        }
    } catch (error) {
        dispatch(loggingIn(false));
        dispatch(authenticateUser(false));
    }
}

const shouldMakeRequest = (state) => {
    if(state.fetchingAuthentication) {
        return false;
    }

    return true;
}

export const logIn = payload => (dispatch, getState) => {
    if(shouldMakeRequest(getState())) {
        return dispatch(makeLogInRequest(payload))
    }
}