import {CommonThunkType} from "../store/store";
import {authAPI, RequestStatusType} from "../api/api";
import {setIsLoggedInAC} from "./login-reducer";


const InitialState: AppStateType = {
  appStatus: 'idle',
  initialized: false,
  appError: null
}

//reducer
export const appReducer = (state: AppStateType = InitialState, action: AppActionType): AppStateType => {
  switch (action.type) {
    case "app/SET-INITIALIZED":
      return {...state, initialized: action.value}
    case "app/SET-STATUS":
      return {...state, appStatus: action.status}
    case "app/SET-ERROR":
      return {...state, appError: action.error}
    default:
      return state
  }
}

//actions
export const setAppInitializedAC = (value: boolean) => ({type: 'app/SET-INITIALIZED', value} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'app/SET-STATUS', status} as const)
export const setAppErrorAC = (error: string|null) => ({type: 'app/SET-ERROR', error} as const)

//thunks
export const initializedAppTC = (): CommonThunkType => (dispatch) => {
  authAPI.me().then(res => {
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC(true))
    }
    dispatch(setAppInitializedAC(true))
  })
}

//types

export type AppStateType = {
  initialized: boolean
  appStatus: RequestStatusType
  appError: string|null
}
export type AppActionType = ReturnType<typeof setAppInitializedAC>
| ReturnType<typeof setAppStatusAC>
| ReturnType<typeof setAppErrorAC>