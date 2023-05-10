import {CommonThunkType} from "../store/store";
import {TodolistDomainType, todolistsAPI, TodolistType} from "../api/api";



const InitialState: TodolistDomainType[] = []

//reducer
export const todolistsReducer = (state: TodolistDomainType[] = InitialState, action: TodolistsActionType): TodolistDomainType[] =>{
  switch (action.type) {
    case "todolist/ADD-TODOLIST":
      // не забыть про entityStatus: 'idle'
      return [{...action.todolist, filter: 'all'}, ...state] // не понимаю почему копию тудулиста добавляем?
    default:
      return state
  }
}

//actions
export const addTodolistAC = (todolist: TodolistType)=>({type: 'todolist/ADD-TODOLIST', todolist} as const)
export const removeTodolistAC = (todolistId: string)=>({type: 'todolist/REMOVE-TODOLIST', todolistId} as const)

//thunks
// в дальнейшем не забыть в санки добавить статус загрузки, ошибки и .catch
export const addTodolistTC = (title: string): CommonThunkType => (dispatch)=>{
todolistsAPI.addTodolist(title).then(res =>{
  if (res.data.resultCode === 0) {
    dispatch(addTodolistAC(res.data.data.item))
  }
})
}

//types

export type TodolistsActionType = ReturnType<typeof addTodolistAC>
| ReturnType<typeof removeTodolistAC>