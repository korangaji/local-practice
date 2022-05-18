import { applyMiddleware, createStore,compose} from "redux";
import { reducers } from "./Reducer";
import thunk from 'redux-thunk'
const composeEnhancers =
  (process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null) || compose;
export const store = createStore(reducers,{}, composeEnhancers(applyMiddleware(thunk)))