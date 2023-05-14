import axios from 'axios'

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
  }
}

export let taskAPI = {
  addTask(todolistId: string, title: string){
    return instance.post<{title: string}, ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title})
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
//в предыдущем проекте тип тасктайп разбит на две части пока не поняла почему
export type TaskType = {
  description: string
  title: string
  completed: boolean
  status: number
  priority: number
  startDate: string
  deadline: string
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