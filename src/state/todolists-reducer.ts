import {CommonThunkType} from "../store/store";
import {FilterValueType, RequestStatusType, TodolistDomainType, todolistsAPI, TodolistType} from "../api/api";
import {setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const InitialState: TodolistDomainType[] = []

const slice = createSlice({
  name: 'todolists',
  initialState: InitialState,
  reducers: {
    addTodolistAC(state, action: PayloadAction<{todolist: TodolistType}>){
      state.unshift({...action.payload.todolist, filter: 'all', todoStatus: 'idle'})
    },
    removeTodolistAC(state, action: PayloadAction<{todolistId: string}>){
      const index = state.findIndex(tl=> tl.id === action.payload.todolistId)
      if (index > -1){
        state.splice(index, 1)
      }
    },
    setTodolistsAC(state, action: PayloadAction<{todolists: TodolistType[]}>){
      return action.payload.todolists.map(tl => ({...tl, filter: 'all', todoStatus: 'idle'}))
    },
    changeTodolistTitleAC(state, action: PayloadAction<{todolistId: string, newTodoTitle: string}>){
      const index = state.findIndex(tl=> tl.id === action.payload.todolistId)
      state[index].title = action.payload.newTodoTitle
    },
    changeTodolistFilterAC(state, action: PayloadAction<{todolistId: string, filter: FilterValueType}>){
      const index = state.findIndex(tl=> tl.id === action.payload.todolistId)
      state[index].filter = action.payload.filter
    },
    changeTodolistStatusAC(state, action: PayloadAction<{todolistId: string, todoStatus: RequestStatusType}>){
      const index = state.findIndex(tl=> tl.id === action.payload.todolistId)
      state[index].todoStatus = action.payload.todoStatus
    },
  }
})

//reducer
export const todolistsReducer = slice.reducer
//actions
export const {addTodolistAC, removeTodolistAC, setTodolistsAC, changeTodolistTitleAC, changeTodolistFilterAC, changeTodolistStatusAC} = slice.actions


//thunks
export const addTodolistTC = (title: string): CommonThunkType => (dispatch) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  todolistsAPI.addTodolist(title).then(res => {
    if (res.data.resultCode === 0) {
      dispatch(addTodolistAC({todolist: res.data.data.item}))
      dispatch(setAppStatusAC({status: 'success'}))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  })
     .catch(error => {
       handleServerNetworkError(error, dispatch)
     })
}
export const removeTodolistTC = (todolistId: string): CommonThunkType => (dispatch) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  dispatch(changeTodolistStatusAC({todolistId, todoStatus: 'loading'}))
  todolistsAPI.removeTodolist(todolistId).then(res => {
    if (res.data.resultCode === 0) {
      dispatch(removeTodolistAC({todolistId}))
      dispatch(setAppStatusAC({status: 'success'}))
    }
  })
     .catch(error => {
       dispatch(setAppStatusAC({status: 'failed'}))
       dispatch(changeTodolistStatusAC({todolistId, todoStatus: 'failed'}))
       handleServerNetworkError(error, dispatch)
     })
}
export const setTodolistsTC = (): CommonThunkType => (dispatch) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  todolistsAPI.setTodolists().then(res => {
    dispatch(setTodolistsAC({todolists: res.data}))
    dispatch(setAppStatusAC({status: 'success'}))
  })
     .catch(error => {
       handleServerNetworkError(error, dispatch)
     })
}
export const changeTodolistTitleTC = (todolistId: string, newTodoTitle: string): CommonThunkType => (dispatch) => {
  todolistsAPI.updateTodolist(todolistId, newTodoTitle).then(res => {
    if (res.data.resultCode === 0) {
      dispatch(changeTodolistTitleAC({todolistId, newTodoTitle}))
    }
  })
     .catch(error => {
       handleServerNetworkError(error, dispatch)
     })
}

//types
export type TodolistsActionType = any

  /* ReturnType<typeof addTodolistAC>
   | ReturnType<typeof removeTodolistAC>
   | ReturnType<typeof setTodolistsAC>
   | ReturnType<typeof changeTodolistTitleAC>
   | ReturnType<typeof changeTodolistFilterAC>
   | ReturnType<typeof changeTodolistStatusAC>*/