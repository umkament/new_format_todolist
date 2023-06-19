import {CommonThunkType} from "../store/store";
import {authAPI, RequestStatusType} from "../api/api";
import {setIsLoggedInAC} from "./login-reducer";
import {handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const InitialState = {
  appStatus: 'idle',
  initialized: false,
  appError: null
}

const slice = createSlice({
  name: 'app',
  initialState: InitialState,
  reducers: {
    setAppInitializedAC(state, action: PayloadAction<{value: boolean}>){
      state.initialized = action.payload.value
    },
    setAppStatusAC(state, action: PayloadAction<{status: RequestStatusType}>){
      state.appStatus = action.payload.status
    },
    setAppErrorAC(state, action: PayloadAction<{error: null | string}>){
      // @ts-ignore
      state.appError = action.payload.error
    }
  }
})

//reducer
export const appReducer = slice.reducer

//action
export const {setAppInitializedAC, setAppStatusAC, setAppErrorAC} = slice.actions


/*   (state: AppStateType = InitialState, action: AppActionType): AppStateType => {
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
}*/

//actions
/*export const setAppInitializedAC = (value: boolean) => ({type: 'app/SET-INITIALIZED', value} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'app/SET-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'app/SET-ERROR', error} as const)*/

//thunks
export const initializedAppTC = (): CommonThunkType => (dispatch) => {
  authAPI.me().then(res => {
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC({value: true}))
    }
    dispatch(setAppInitializedAC({value: true}))
  })
     .catch(error => {
       handleServerNetworkError(error, dispatch)
     })
}

//types


export type AppActionType = any

/*
   ReturnType<typeof setAppInitializedAC>
   | ReturnType<typeof setAppStatusAC>
   | ReturnType<typeof setAppErrorAC>*/
