
export const LoggerAction = val => {
    console.log('Logger Action :- ',val);
    return {
        type: 'Logger',
        payload: val
    }
}
export const storeSessionID = id => {
    console.log('Action SID = ',id)
    return {
        type: 'store_sessionId',
        payload: id
    }
}
export const searchKeyword = keyword => {
    console.log(keyword);
    return {
        type: 'search',
        payload: keyword
    }
}
export const searchedMovie = movies => {
    // console.log("searched Movies Results = ",movies)
    return {
        type: 'sMovie',
        payload: movies
    }
}
export const searchedSeries = tv => {
    // console.log("searched Series Results = ",tv)
    return {
        type: 'sTvSeries',
        payload: tv
    }
}
export const VideoKey = Key => {
    return {
        type: 'vKey',
        payload: Key
    }
}
export const popSnackBar = (bool) => {
    return {
        type: 'snackBool',
        payload: bool,
    }
}
export const popSnackBarText = (text) => {
    return {
        type: 'snackText',
        payload: text
    }
}