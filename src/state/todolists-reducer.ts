import {CommonThunkType} from "../store/store";
import {authAPI, TodolistDomainType} from "../api/api";
import {setIsLoggedInAC} from "./login-reducer";


const InitialState: TodolistDomainType[] = []

//reducer
export const todolistsReducer = (state: TodolistDomainType[] = InitialState, action: TodolistsActionType): TodolistDomainType[] =>{
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

export type TodolistsActionType = any