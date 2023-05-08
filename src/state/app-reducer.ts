import {CommonThunkType} from "../store/store";
import {authAPI} from "../api/api";
import {setIsLoggedInAC} from "./login-reducer";


const InitialState = {
initialized: false
}

//reducer
export const appReducer = (state: AppStateType = InitialState, action: AppActionType): AppStateType =>{
  switch (action.type) {
    case "SET-INITIALIZED":
      return {...state, initialized: action.value}
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
export type AppStateType = {
  initialized: boolean
}
export type AppActionType = ReturnType<typeof setAppInitializedAC>