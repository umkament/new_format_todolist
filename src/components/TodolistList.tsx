import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "./AddItemForm";
import {useCommonDispatch, useCommonSelector} from "../store/store";
import {FilterValueType, TaskStatuses, TodolistDomainType} from "../api/api";
import {Todolist} from "./Todolist";
import {addTaskTC, removeTaskTC, TasksStateType, updateTaskTC} from "../state/tasks-reducer";
import {
  addTodolistTC,
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  removeTodolistTC,
  setTodolistsTC
} from "../state/todolists-reducer";
import {Grid, Paper} from "@mui/material";
import {useNavigate} from "react-router-dom";

type TodolistListPropsType = {
  demo?: boolean
}

export const TodolistList: React.FC<TodolistListPropsType> = (props) => {
  console.log('Todolist_List')
  const dispatch = useCommonDispatch()
  const todolists = useCommonSelector<TodolistDomainType[]>(state => state.todolists)
  const tasks = useCommonSelector<TasksStateType>(state => state.tasks)
  const isLoggedIn = useCommonSelector<boolean>(state => state.auth.isLoggedIn)

  useEffect(() => {
    if (props.demo || !isLoggedIn) {
      return;
    }
    dispatch(setTodolistsTC())
  }, [])
  let navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      return navigate('/login')
    }
  }, [isLoggedIn])

  const addTodolist = useCallback((title: string) => {
    dispatch(addTodolistTC(title))
  }, [dispatch])
  const removeTodolist = useCallback((todolistId: string) => {
    dispatch(removeTodolistTC(todolistId))
  }, [dispatch])
  const changeTodolistFilter = useCallback((todolistId: string, filter: FilterValueType) => {
    dispatch(changeTodolistFilterAC(todolistId, filter))
  }, [dispatch])
  const changeTodolistTitle = useCallback((todolistId: string, newTodoTitle: string) => {
    dispatch(changeTodolistTitleTC(todolistId, newTodoTitle))
  }, [dispatch])

  const addTask = useCallback((todolistId: string, title: string) => {
    console.log(title)
    console.log(todolistId)
    dispatch(addTaskTC(todolistId, title))
  }, [dispatch])
  const removeTask = useCallback((todolistId: string, taskId: string) => {
    dispatch(removeTaskTC(todolistId, taskId))
  }, [dispatch])
  const changeTaskTitle = useCallback((todolistId: string, taskId: string, taskTitle: string) => {
    dispatch(updateTaskTC(todolistId, taskId, {title: taskTitle}))
  }, [dispatch])
  const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
    dispatch(updateTaskTC(todolistId, taskId, {status}))
  }, [dispatch])

  return <>
    <Grid container
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
          style={{padding: '25px'}}
    >
      <AddItemForm addItem={addTodolist}/>
    </Grid>
    <Grid container
          style={{padding: '25px'}}
    >
      {todolists.map(tl => {
           let tasksForTodolist = tasks[tl.id]
           return <Grid item
                        style={{padding: '10px'}}>
             <Paper elevation={5}
                    style={{padding: '10px'}}
             >
               <Todolist key={tl.id}
                         todolist={tl}
                         tasks={tasksForTodolist}
                         changeTodolistTitle={changeTodolistTitle}
                         removeTodolist={removeTodolist}
                         changeTodolistFilter={changeTodolistFilter}
                         addTask={addTask}
                         removeTask={removeTask}
                         changeTaskTitle={changeTaskTitle}
                         changeTaskStatus={changeTaskStatus}
                         demo={props.demo}

               />
             </Paper>
           </Grid>
         }
      )}
    </Grid>
  </>
}