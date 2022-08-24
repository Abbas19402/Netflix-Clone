export const setLogger = (state = 0 , action) => {
    if(action.type === 'Logger' ) {
        return action.payload
    } else {
        return state
    }
}
export const sessionId = async(state = 0 , action) => {
    if(action.type === 'store_sessionId' ) {
        console.log("type matched and returning session")
        return action.payload
    } else {
        console.log("type did'nt matched and returning state")
        return state
    }
}
export const searchReducer = (state=''  , action) => {
    if(action.type === 'search') {
        return action.payload
    } else {
        return state
    }
}
export const searchMovieReducer = (state=''  , action) => {
    if(action.type === 'sMovie') {
        return action.payload
    } else {
        return state
    }
}
export const searchTvReducer = (state=''  , action) => {
    if(action.type === 'sTvSeries') {
        return action.payload
    } else {
        return state
    }
}
export const getVideoKey = (state=""  , action) => {
    if(action.type === 'vKey') {
        return action.payload
    } else {
        return state
    }
}
export const popSnackBarReducer = (state=false  , action) => {
    if(action.type === 'snackBool') {
        return action.payload.renderStatus
    } else {
        return state
    }
}
export const popSnackBarReducerText = (state=false  , action) => {
    if(action.type === 'snackText') {
        return action.payload.text
    } else {
        return state
    }
}