import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {reducer as formReducer} from 'redux-form'
import reducer from "./reducer";

type RootReduserType = typeof reducers;
export type AppStateType = ReturnType<RootReduserType>;
type PropertyTypes<T> = T extends { [key: string]: infer U } ? U : never
export  type InferActionType<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertyTypes<T>>
export type BaseThuncType<AT extends Action, TH = Promise<void>> = ThunkAction<TH, AppStateType, unknown, AT>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;//для подключения к проекту расширения REDUX для google chrom

let reducers = combineReducers(
    {
        app: reducer,
        form: formReducer,
    }
);

const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunkMiddleware)
));

export default store;
