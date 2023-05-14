import {CommonThunkType} from "../store/store";
import {TodolistDomainType, todolistsAPI, TodolistType} from "../api/api";



const InitialState: TodolistDomainType[] = []

//reducer
export const todolistsReducer = (state: TodolistDomainType[] = InitialState, action: TodolistsActionType): TodolistDomainType[] =>{
  switch (action.type) {
    case "todolist/ADD-TODOLIST":
      // не забыть про entityStatus: 'idle'
      return [{...action.todolist, filter: 'all'}, ...state] // не понимаю почему копию тудулиста добавляем?
    case "todolist/REMOVE-TODOLIST":
      return state.filter(tl => tl.id !== action.todolistId)
    case "todolist/SET-TODOLISTS":
      return action.todolists.map(tl=>({...tl, filter: 'all'}))
    default:
      return state
  }
}

//actions
export const addTodolistAC = (todolist: TodolistType)=>({type: 'todolist/ADD-TODOLIST', todolist} as const)
export const removeTodolistAC = (todolistId: string)=>({type: 'todolist/REMOVE-TODOLIST', todolistId} as const)
export const setTodolistsAC = (todolists: TodolistType[])=>({type: 'todolist/SET-TODOLISTS', todolists} as const)

//thunks
// в дальнейшем не забыть в санки добавить статус загрузки, ошибки и .catch
export const addTodolistTC = (title: string): CommonThunkType => (dispatch)=>{
todolistsAPI.addTodolist(title).then(res =>{
  if (res.data.resultCode === 0) {
    dispatch(addTodolistAC(res.data.data.item))
  }
})
}
export const removeTodolistTC = (todolistId: string): CommonThunkType =>(dispatch) => {
 todolistsAPI.removeTodolist(todolistId).then(res=>{
   if(res.data.resultCode===0){
     dispatch(removeTodolistAC(todolistId))
   }
 })
}
export const setTodolistsTC = (): CommonThunkType =>(dispatch)=>{
  todolistsAPI.setTodolists().then(res=>{
    dispatch(setTodolistsAC(res.data))
  })
}

//types

export type TodolistsActionType = ReturnType<typeof addTodolistAC>
| ReturnType<typeof removeTodolistAC>
| ReturnType<typeof setTodolistsAC>