import React from "react";
import {AddItemForm} from "./AddItemForm";
import {useCommonDispatch, useCommonSelector} from "../store/store";
import {TodolistDomainType} from "../api/api";
import {Todolist} from "./Todolist";
import {redirect} from "react-router-dom";
import {TasksStateType} from "../state/tasks-reducer";

type TodolistListPropsType = {}
export const TodolistList: React.FC<TodolistListPropsType> = (props) => {

  const dispatch = useCommonDispatch()
  const todolists = useCommonSelector<TodolistDomainType[]>(state => state.todolists)
  const tasks = useCommonSelector<TasksStateType>(state => state.tasks)
  const isLoggedIn = useCommonSelector<boolean>(state => state.auth.isLoggedIn)


  const addTodolist = ()=>{}
  const changeTodolistTitle = ()=>{}
  const removeTodolist = ()=>{}

  const addTask = ()=>{}
  const removeTask = ()=>{}
  const changeTaskTitle = ()=>{}
  const changeTaskStatus = ()=>{}
  const changeTaskFilter = ()=>{}

/*  if(!isLoggedIn) {
    return redirect('/login')
  }*/

  return (
  <div>
    <AddItemForm addItem={addTodolist}/>
    {todolists.map(tl => {
         const tasksForTodolist = tasks[tl.id]
            return <Todolist key={tl.id}
                                   todolist={tl}
                                   tasks={tasksForTodolist}
                                   changeTodolistTitle={changeTodolistTitle}
                                   removeTodolist={removeTodolist}
                                   addTask={addTask}
                                   removeTask={removeTask}
                                   changeTaskTitle={changeTaskTitle}
                                   changeTaskStatus={changeTaskStatus}
                                   changeTaskFilter={changeTaskFilter}
       />
    }
    )}
  </div>
  )
}