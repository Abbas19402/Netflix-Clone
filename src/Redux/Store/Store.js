import { createStore } from "redux";
import rootReducers from '../Reducers/CRs'

const Store = createStore(rootReducers , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default Store