import {CommonThunkType} from "../store/store";
import {FilterValueType, RequestStatusType, TodolistDomainType, todolistsAPI, TodolistType} from "../api/api";
import {setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";


const InitialState: TodolistDomainType[] = []

//reducer
export const todolistsReducer = (state: TodolistDomainType[] = InitialState, action: TodolistsActionType): TodolistDomainType[] => {
  switch (action.type) {
    case "todolist/ADD-TODOLIST":
      return [{...action.todolist, filter: 'all', todoStatus: 'idle'}, ...state] // не понимаю почему копию тудулиста добавляем?
    case "todolist/REMOVE-TODOLIST":
      return state.filter(tl => tl.id !== action.todolistId)
    case "todolist/SET-TODOLISTS":
      return action.todolists.map(tl => ({...tl, filter: 'all', todoStatus: 'idle'}))
    case "todolist/CHANGE-TODOLIST-TITLE":
      return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.newTodoTitle} : tl)
    case "todolist/CHANGE-TODOLIST-FILTER":
      return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)
    case "todolist/CHANGE-TODOLIST-STATUS":
      return state.map(tl => tl.id === action.todolistId ? {...tl, todoStatus: action.todoStatus} : tl)
    default:
      return state
  }
}

//actions
export const addTodolistAC = (todolist: TodolistType) => ({type: 'todolist/ADD-TODOLIST', todolist} as const)
export const removeTodolistAC = (todolistId: string) => ({type: 'todolist/REMOVE-TODOLIST', todolistId} as const)
export const setTodolistsAC = (todolists: TodolistType[]) => ({type: 'todolist/SET-TODOLISTS', todolists} as const)
export const changeTodolistTitleAC = (todolistId: string, newTodoTitle: string) => ({
  type: 'todolist/CHANGE-TODOLIST-TITLE',
  todolistId,
  newTodoTitle
} as const)
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValueType) => ({
  type: 'todolist/CHANGE-TODOLIST-FILTER',
  todolistId,
  filter
} as const)
export const changeTodolistStatusAC = (todolistId: string, todoStatus: RequestStatusType) => ({
  type: 'todolist/CHANGE-TODOLIST-STATUS',
  todolistId,
  todoStatus
} as const)

//thunks

export const addTodolistTC = (title: string): CommonThunkType => (dispatch) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  todolistsAPI.addTodolist(title).then(res => {
    if (res.data.resultCode === 0) {
      dispatch(addTodolistAC(res.data.data.item))
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
  dispatch(changeTodolistStatusAC(todolistId, 'loading'))
  todolistsAPI.removeTodolist(todolistId).then(res => {
    if (res.data.resultCode === 0) {
      dispatch(removeTodolistAC(todolistId))
      dispatch(setAppStatusAC({status: 'success'}))
    }
  })
     .catch(error => {
       dispatch(setAppStatusAC({status: 'failed'}))
       dispatch(changeTodolistStatusAC(todolistId, 'failed'))
       handleServerNetworkError(error, dispatch)
     })
}

export const setTodolistsTC = (): CommonThunkType => (dispatch) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  todolistsAPI.setTodolists().then(res => {
    dispatch(setTodolistsAC(res.data))
    dispatch(setAppStatusAC({status: 'success'}))
  })
     .catch(error => {
       handleServerNetworkError(error, dispatch)
     })
}

export const changeTodolistTitleTC = (todolistId: string, newTodoTitle: string): CommonThunkType => (dispatch) => {
  todolistsAPI.updateTodolist(todolistId, newTodoTitle).then(res => {
    if (res.data.resultCode === 0) {
      dispatch(changeTodolistTitleAC(todolistId, newTodoTitle))
    }
  })
     .catch(error => {
       handleServerNetworkError(error, dispatch)
     })
}

//types
export type TodolistsActionType = ReturnType<typeof addTodolistAC>
   | ReturnType<typeof removeTodolistAC>
   | ReturnType<typeof setTodolistsAC>
   | ReturnType<typeof changeTodolistTitleAC>
   | ReturnType<typeof changeTodolistFilterAC>
   | ReturnType<typeof changeTodolistStatusAC>