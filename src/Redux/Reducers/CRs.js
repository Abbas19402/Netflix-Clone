import { combineReducers } from 'redux'
import { setLogger } from './Reducers'
import { sessionId } from './Reducers'
import { searchReducer } from './Reducers'
import { searchMovieReducer } from './Reducers'
import { searchTvReducer } from './Reducers'
import { getVideoKey } from './Reducers'

const rootReducers = combineReducers({
    setLogger,
    sessionId,
    searchReducer,
    searchMovieReducer,
    searchTvReducer,
    getVideoKey
})

export default rootReducers