import axios, {AxiosResponse} from 'axios'

const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': '0cde1f48-1ea0-4053-9e96-1eb983ece9db'
  }
}
const instance = axios.create({
...settings,
  baseURL: 'https://social-network.samuraijs.com/api/1.1/'
})

//api
export let authAPI = {
  logIn(params: LoginParamsType){
    return instance.post<ResponseType<{userId: number}>>('auth/login', params)
  },
  logOut(){
    return instance.delete<ResponseType>('auth/login') //пока не добавляю в респонсе юзерайди
  },
  me(){
    return instance.get<ResponseType<{id:number, email:string, login:string}>>('auth/me')
  }
}

export let todolistsAPI = {
  addTodolist(title: string){
    return instance.post<ResponseType<{item: TodolistType}>>('todo-lists', {title})
  },
  removeTodolist(todolistId: string){
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
  },
  setTodolists(){
return instance.get<TodolistType[]>('todo-lists')
  },
  updateTodolist(todolistId: string, title: string){
    return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
  }
}

export let taskAPI = {
  addTask(todolistId: string, title: string){
    return instance.post<{title: string}, AxiosResponse<ResponseType<{item: TaskType}>>>(`todo-lists/${todolistId}/tasks`, {title})
  },
  removeTask(todolistId: string, taskId: string){
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  setTasks(todolistId: string){
    return instance.get<TaskContentType>(`todo-lists/${todolistId}/tasks`)
  },
  updateTask(todolistId: string, taskId: string, taskModel: UpdateTaskModelType){
return instance.put<UpdateTaskModelType, AxiosResponse<ResponseType<TaskType>>>(`todo-lists/${todolistId}/tasks/${taskId}`, taskModel)
  }
}

//types
export type ResponseType<D={}> = {
  resultCode: number,
  messages: string,
  data: D
}

export type LoginParamsType = {
  email: string,
  password: string,
  rememberMe?: boolean,
  captcha?: boolean
}

export type TaskContentType = {
  items: TaskType[],
  totalCount: number,
  error: string
}
export type UpdateTaskModelType = {
  description: string
  title: string
  completed: boolean
  status: TaskStatuses
  priority: number
  startDate: string
  deadline: string
}
export type TaskType = UpdateTaskModelType & {
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export enum TaskStatuses {
  New,
  InProgress,
  Completed,
  Draft
}
export type FilterValueType = 'all' | 'active' | 'completed'

export type TodolistType = {
  id: string
  addedDate: string
  order: number
  title: string
}
export type TodolistDomainType = TodolistType & {
  filter: FilterValueType
}