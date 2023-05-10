import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {EditableSpan} from "./EditableSpan";
import {TaskStatuses, TaskType} from "../api/api";

type TaskPropsType = {
  task: TaskType,
  todolistID: string,
  changeTaskTitle: (todolistID: string, taskID: string, newTitle: string) => void
  changeTaskStatus: (todolistID: string, taskID: string, status: TaskStatuses) => void
  removeTask: (todolistID: string, taskID: string) => void
}
export const Task: React.FC<TaskPropsType> = React.memo((props) => {
  console.log('Task')
//нужно ли оборачивать в useCallback и эти два хэндлера
  const removeTaskHandler = () => {
    props.removeTask(props.todolistID, props.task.id)
  }
  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeTaskStatus(props.todolistID, props.task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
  }
  const changeTaskTitleHandler = useCallback((newTitle: string) => {
    props.changeTaskTitle(props.todolistID, props.task.id, newTitle)
  }, [props.changeTaskTitle, props.todolistID, props.task.id])

  return <div key={props.task.id}>
    <IconButton onClick={removeTaskHandler}>
      <Delete/>
    </IconButton>
    <Checkbox checked={props.task.status === TaskStatuses.Completed}
              onChange={changeTaskStatusHandler}
    />
    <EditableSpan title={props.task.title}
                  onChange={changeTaskTitleHandler}
    />
  </div>


})