import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "./AddItemForm";
import {useCommonDispatch, useCommonSelector} from "../store/store";
import {TodolistDomainType} from "../api/api";
import {Todolist} from "./Todolist";
import {redirect} from "react-router-dom";
import {addTaskTC, removeTaskTC, TasksStateType} from "../state/tasks-reducer";
import {addTodolistTC, changeTodolistTitleTC, removeTodolistTC, setTodolistsTC} from "../state/todolists-reducer";
import {Grid, Paper} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

type TodolistListPropsType = {}

export const TodolistList: React.FC<TodolistListPropsType> =  (props) => {
  console.log('Todolist_List')
  const dispatch = useCommonDispatch()
  const todolists = useCommonSelector<TodolistDomainType[]>(state => state.todolists)
  const tasks = useCommonSelector<TasksStateType>(state => state.tasks)
  const isLoggedIn = useCommonSelector<boolean>(state => state.auth.isLoggedIn)

useEffect(()=>{
  dispatch(setTodolistsTC())
},[])


  const addTodolist = useCallback( (title: string) => {
    dispatch(addTodolistTC(title))
  }, [])
  const removeTodolist = useCallback( (todolistId: string) => {
    dispatch(removeTodolistTC(todolistId))
  }, [])
  const changeTodolistFilter = () => {
  }
  const changeTodolistTitle = useCallback((todolistId: string, newTodoTitle: string)=>{
    dispatch(changeTodolistTitleTC(todolistId, newTodoTitle))
  }, [])

  const addTask = useCallback( (todolistId: string, title: string) => {
    console.log(title)
    console.log(todolistId)
    dispatch(addTaskTC(todolistId, title))
  }, [])
  const removeTask = useCallback( (todolistId: string, taskId: string) => {
    dispatch(removeTaskTC(todolistId, taskId))
  }, [])
  const changeTaskTitle = () => {
  }
  const changeTaskStatus = () => {
  }


  /*  if(!isLoggedIn) {
      return redirect('/login')
    }*/

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

            />
            </Paper>
            </Grid>
          }
       )}
     </Grid>
     </>
}