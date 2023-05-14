import {CommonThunkType} from "../store/store";
import {authAPI, taskAPI, TaskType} from "../api/api";
import {setIsLoggedInAC} from "./login-reducer";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";


const InitialState: TasksStateType = {}

//reducer
export const tasksReducer = (state: TasksStateType = InitialState, action: TasksActionType): TasksStateType =>{
  switch (action.type) {
    case "todolist/ADD-TODOLIST":
      return {...state,[action.todolist.id]:[]}
    case "task/ADD-TASK":
      console.log(action.task)
      console.log(action)
      return {...state,[action.task.todoListId]:[action.task, ...state[action.task.todoListId]]}
    case "todolist/REMOVE-TODOLIST":
      const stateCopy = {...state}
      delete stateCopy[action.todolistId]
      return stateCopy
    case "task/REMOVE-TASK":
      //возвращаем копию стэйта, в которой перезаписываем свойство [action.todolistId]
       // на то, что было в стэйте изначально, только отфильтрованное по принципу отсеивания удаленной таски
      return {...state, [action.todolistId]:state[action.todolistId].filter(t => t.id !== action.taskId)}
    default:
      return state
  }
}

//actions
export const addTaskAC = (task: TaskType)=>({type: 'task/ADD-TASK', task} as const)
export const removeTaskAC = (todolistId: string, taskId: string)=>({type: 'task/REMOVE-TASK', todolistId, taskId} as const)

//thunks
export const addTaskTC = (todolistId: string, title: string): CommonThunkType => (dispatch)=>{
 taskAPI.addTask(todolistId, title).then(res=>{
   if(res.resultCode === 0) {
     dispatch(addTaskAC(res.data.item))
   }
 })
}
export const removeTaskTC = (todolistId: string, taskId: string): CommonThunkType => (dispatch)=>{
  taskAPI.removeTask(todolistId,taskId).then(res=>{
    if (res.data.resultCode===0){
      dispatch(removeTaskTC(todolistId,taskId))
    }
  })
}

//types
export type TasksStateType = {
[key: string]: TaskType[]
}
export type TasksActionType = ReturnType<typeof addTodolistAC>
| ReturnType<typeof addTaskAC>
| ReturnType<typeof removeTodolistAC>
| ReturnType<typeof removeTaskAC>