import {CommonThunkType, RootStateType} from "../store/store";
import {taskAPI, TaskType, UpdateTaskModelType} from "../api/api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {setAppStatusAC} from "./app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";


const InitialState: TasksStateType = {}

const slice = createSlice({
  name: 'tasks',
  initialState: InitialState,
  reducers: {
    addTaskAC(state, action: PayloadAction<{task: TaskType}>){
      state[action.payload.task.todoListId].unshift(action.payload.task)
    },
    removeTaskAC(state, action: PayloadAction<{todolistId:  string, taskId: string}>){
      //в state находим нужный нам массив
      const tasks = state[action.payload.todolistId]
       const index = tasks.findIndex(t => t.id === action.payload.taskId)
      // если index нашелся, тогда удали начина с указанного индекса один элемент
      if (index > -1){
        tasks.splice(index,1)
      }
    },
    setTasksAC(state, action: PayloadAction<{todolistId: string, tasks: TaskType[]}>){
      state[action.payload.todolistId] = action.payload.tasks
    },
    updateTaskAC(state, action: PayloadAction<{todolistId: string, taskId: string, variantModel: VariantUpdateTaskModelType}>){
      //берем нужный массив тасок по todolistId
      const tasks = state[action.payload.todolistId]
      //находим индек нужной таски, после чего по указанному индексу меняем нужную нам таску
      const index = tasks.findIndex(t => t.id === action.payload.taskId)
      if (index > -1){
        //берем таску по индексу и переприсваеваем ей новый объект
        //который будет состоять из той же таски, что и была раньше
        //но дополнительно переопределится action.payload.variantModel
        //поскольку в variantModel сидят те части таски, которые нужно обновить
        tasks[index]= {...tasks[index], ...action.payload.variantModel}
      }
    }
  },
  extraReducers: (builder)=>{
    builder.addCase(addTodolistAC, (state, action)=>{
      state[action.payload.todolist.id] = []
    });
    builder.addCase(removeTodolistAC, (state, action)=>{
      delete state[action.payload.todolistId]
    });
    builder.addCase(setTodolistsAC, (state, action)=>{
      action.payload.todolists.forEach(tl => {
        state[tl.id] = []
      })
    })
  }
})
export const tasksReducer = slice.reducer
export const {addTaskAC, removeTaskAC, setTasksAC, updateTaskAC} = slice.actions


/*
//reducer
export const tasksReducer = (state: TasksStateType = InitialState, action: TasksActionType): TasksStateType => {
  switch (action.type) {
    case "todolist/ADD-TODOLIST":
      return {...state, [action.todolist.id]: []}
    case "task/ADD-TASK":
      console.log(action.task)
      console.log(action)
      return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
    case "todolist/REMOVE-TODOLIST":
      const stateCopy = {...state}
      delete stateCopy[action.todolistId]
      return stateCopy
    case "task/REMOVE-TASK":
      //возвращаем копию стэйта, в которой перезаписываем свойство [action.todolistId]
      // на то, что было в стэйте изначально, только отфильтрованное по принципу отсеивания удаленной таски
      return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
    case "todolist/SET-TODOLISTS": {
      const stateCopy = {...state}
      action.todolists.forEach(tl => {
        stateCopy[tl.id] = []
      })
      return stateCopy
    }
    case "task/SET-TASK":
      return {...state, [action.todolistId]: action.tasks}
    case "task/UPDATE-TASK":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, ...action.variantModel} : t)
      }
    default:
      return state
  }
}

//actions
export const addTaskAC = (task: TaskType) => ({type: 'task/ADD-TASK', task} as const)
export const removeTaskAC = (todolistId: string, taskId: string) => ({
  type: 'task/REMOVE-TASK',
  todolistId,
  taskId
} as const)
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({
  type: 'task/SET-TASK',
  todolistId,
  tasks
} as const)
export const updateTaskAC = (todolistId: string, taskId: string, variantModel: VariantUpdateTaskModelType) => ({
  type: 'task/UPDATE-TASK',
  todolistId,
  taskId,
  variantModel
} as const)
*/


//thunks
export const addTaskTC = (todolistId: string, title: string): CommonThunkType => (dispatch) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  taskAPI.addTask(todolistId, title).then(res => {
    if (res.data.resultCode === 0) {
      dispatch(addTaskAC({task: res.data.data.item}))
      dispatch(setAppStatusAC({status: 'success'}))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  })
     .catch(error => {
       handleServerNetworkError(error, dispatch)
     })
}
export const removeTaskTC = (todolistId: string, taskId: string): CommonThunkType => (dispatch) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  taskAPI.removeTask(todolistId, taskId).then(res => {
    if (res.data.resultCode === 0) {
      dispatch(removeTaskAC({todolistId, taskId}))
      dispatch(setAppStatusAC({status: 'success'}))
    }
  })
     .catch(error => {
       handleServerNetworkError(error, dispatch)
     })
}
export const setTasksTC = (todolistId: string): CommonThunkType => (dispatch) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  taskAPI.setTasks(todolistId).then(res => {
    dispatch(setTasksAC({todolistId, tasks: res.data.items}))
    dispatch(setAppStatusAC({status: 'success'}))
  })
     .catch(error => {
       handleServerNetworkError(error, dispatch)
     })
}
export const updateTaskTC = (todolistId: string, taskId: string, variantModel: VariantUpdateTaskModelType): CommonThunkType => {
  return (dispatch, getState: () => RootStateType) => {
    const state = getState()
    const task = state.tasks[todolistId].find(t => t.id === taskId)
    //это условие нужно для apiTaskModel,
    // поскольку без этого условия данный объект выделяет красным все такски
    if (!task) {
      console.warn('task undefined')
      return;
    }
    const apiTaskModel: UpdateTaskModelType = {
      description: task.description,
      title: task.title,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      completed: task.completed,
      ...variantModel
    }
    taskAPI.updateTask(todolistId, taskId, apiTaskModel)
       .then(res => {
         if (res.data.resultCode === 0) {
           dispatch(updateTaskAC({todolistId, taskId, variantModel: apiTaskModel}))
         } else {
           handleServerAppError(res.data, dispatch)
         }
       })
       .catch(error => {
         handleServerNetworkError(error, dispatch)
       })
  }
}


//types
export type TasksStateType = {
  [key: string]: TaskType[]
}
export type VariantUpdateTaskModelType = {
  description?: string
  title?: string
  completed?: boolean
  status?: number
  priority?: number
  startDate?: string
  deadline?: string
}
export type TasksActionType = any


/*
   ReturnType<typeof addTodolistAC>
   | ReturnType<typeof addTaskAC>
   | ReturnType<typeof removeTodolistAC>
   | ReturnType<typeof removeTaskAC>
   | ReturnType<typeof setTodolistsAC>
   | ReturnType<typeof setTasksAC>
   | ReturnType<typeof updateTaskAC>*/
