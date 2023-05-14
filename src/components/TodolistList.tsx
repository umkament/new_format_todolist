import React, {useCallback} from "react";
import {AddItemForm} from "./AddItemForm";
import {useCommonDispatch, useCommonSelector} from "../store/store";
import {TodolistDomainType} from "../api/api";
import {Todolist} from "./Todolist";
import {redirect} from "react-router-dom";
import {addTaskTC, TasksStateType} from "../state/tasks-reducer";
import {addTodolistTC} from "../state/todolists-reducer";

type TodolistListPropsType = {}
export const TodolistList: React.FC<TodolistListPropsType> =  (props) => {
  console.log('Todolist_List')
  const dispatch = useCommonDispatch()
  const todolists = useCommonSelector<TodolistDomainType[]>(state => state.todolists)
  const tasks = useCommonSelector<TasksStateType>(state => state.tasks)
  const isLoggedIn = useCommonSelector<boolean>(state => state.auth.isLoggedIn)


  const addTodolist = useCallback( (title: string) => {
    dispatch(addTodolistTC(title))
  }, [])
  const changeTodolistTitle = () => {
  }
  const removeTodolist = () => {
  }
  const changeTodolistFilter = () => {
  }

  const addTask = useCallback( (todolistId: string, title: string) => {
    console.log(title)
    console.log(todolistId)
    dispatch(addTaskTC(todolistId, title))
  }, [])
  const removeTask = () => {
  }
  const changeTaskTitle = () => {
  }
  const changeTaskStatus = () => {
  }


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
                             changeTodolistFilter={changeTodolistFilter}
                             addTask={addTask}
                             removeTask={removeTask}
                             changeTaskTitle={changeTaskTitle}
                             changeTaskStatus={changeTaskStatus}

            />
          }
       )}
     </div>
  )
}