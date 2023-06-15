import {CommonThunkType} from "../store/store";
import {authAPI, LoginParamsType} from "../api/api";
import {setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const InitialState = {
  isLoggedIn: false
}

const slice = createSlice({
  name: 'login',
  initialState: InitialState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{value: boolean}>){
      state.isLoggedIn = action.payload.value
    }
  }
})

//reducer
export const loginReducer = slice.reducer

//actions
export const {setIsLoggedInAC} = slice.actions

//thunks
export const logInTC = (params: LoginParamsType): CommonThunkType => (dispatch) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  authAPI.logIn(params).then(res => {
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC({value: true}))
      dispatch(setAppStatusAC({status: 'success'}))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  })
     .catch((error) => {
       handleServerNetworkError(error, dispatch)
     })
}
export const logOutTC = (): CommonThunkType => (dispatch) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  authAPI.logOut().then(res => {
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC({value: false}))
      dispatch(setAppStatusAC({status: 'success'}))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  })
     .catch((error) => {
       handleServerNetworkError(error, dispatch)
     })
}


//types
export type LoginActionType = ReturnType<typeof setIsLoggedInAC>
