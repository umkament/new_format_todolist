import {CommonThunkType} from "../store/store";
import {authAPI, LoginParamsType} from "../api/api";
import {setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTodolists} from "./todolists-reducer";
import {clearTasks} from "./tasks-reducer";
import { AxiosError } from "axios";

export const logInTC = createAsyncThunk<{isLoggedIn: boolean}, LoginParamsType>('login/logIn', async (params: LoginParamsType, thunkAPI) => {
  const {dispatch, rejectWithValue} = thunkAPI
  dispatch(setAppStatusAC({status: 'loading'}))
  try {
    const res = await authAPI.logIn(params)
    if (res.data.resultCode === 0) {
      dispatch(setAppStatusAC({status: 'success'}))
      return {isLoggedIn: true}
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
    }
  } catch (err) {
    // @ts-ignore
    const error: AxiosError = err
    handleServerNetworkError(error, dispatch)
    return rejectWithValue({errors: [error.message],fieldsErrors: undefined })
  }
})


const slice = createSlice({
  name: 'login',
  initialState: {
    isLoggedIn: false,
    error: null as string|null
  },
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value
    },
    setError: (state, action: PayloadAction<{error: string|null}>)=>{
state.error = action.payload.error
    }
  },
  extraReducers: builder => {
    builder.addCase(logInTC.fulfilled, (state, action)=>{
      state.isLoggedIn = action.payload.isLoggedIn
    });
    builder.addCase(logInTC.rejected, (state, action)=>{

    })
  }
})

//reducer
export const loginReducer = slice.reducer

//actions
export const {setIsLoggedInAC} = slice.actions

//thunks
export const logInTC_ = (params: LoginParamsType): CommonThunkType => (dispatch) => {
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
      dispatch(clearTodolists())
      dispatch(clearTasks())
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
export type LoginActionType = any
