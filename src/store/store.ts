import {combineReducers} from "redux";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {LoginActionType, loginReducer} from "../state/login-reducer";
import {AppActionType, appReducer} from "../state/app-reducer";
import {TodolistsActionType, todolistsReducer} from "../state/todolists-reducer";
import {TasksActionType, tasksReducer} from "../state/tasks-reducer";
import {configureStore} from "@reduxjs/toolkit";

//reducer
const rootReducer = combineReducers({
  auth: loginReducer,
  app: appReducer,
  todolists: todolistsReducer,
  tasks: tasksReducer
})

//store
//export const store = createStore(rootReducer, applyMiddleware(thunk))

export const store = configureStore({
  reducer: rootReducer,
     middleware: getDefaultMiddleware=> getDefaultMiddleware().prepend(thunkMiddleware)
})

//types
export type RootStateType = ReturnType<typeof rootReducer>
export type ActionsType = LoginActionType | AppActionType | TodolistsActionType | TasksActionType
export type AppDispatchType = ThunkDispatch<RootStateType, unknown, ActionsType>
export type CommonThunkType<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, ActionsType>

// useDispatch and useSelector
type DispatchFuncType = () => AppDispatchType
export const useCommonDispatch: DispatchFuncType = useDispatch
export const useCommonSelector: TypedUseSelectorHook<RootStateType> = useSelector

// @ts-ignore
window.store = store