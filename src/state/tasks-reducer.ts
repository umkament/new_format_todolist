import {CommonThunkType} from "../store/store";
import {authAPI, TaskType} from "../api/api";
import {setIsLoggedInAC} from "./login-reducer";


const InitialState: TasksStateType = {}

//reducer
export const tasksReducer = (state: TasksStateType = InitialState, action: TasksActionType): TasksStateType =>{
  switch (action.type) {

    default:
      return state
  }
}

//actions
export const setAppInitializedAC = (value: boolean)=>({type: 'SET-INITIALIZED', value} as const)

//thunks
export const initializedAppTC = (): CommonThunkType => (dispatch)=>{
  authAPI.me().then(res=>{
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC(true))
    }
    dispatch(setAppInitializedAC(true))
  })
}

//types
export type TasksStateType = {
[key: string]: TaskType[]
}
export type TasksActionType = any