import React, {ChangeEvent, useState} from 'react'
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
  title: string,
  onChange: (newTitle: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {
  let [editMode, setEditMode] = useState<boolean>(false)
  let [title, setTitle] = useState<string>('')

  const activateEditMode = () => {
    setEditMode(true)
    setTitle(props.title)
  }
  const deactivateEditMode = () => {
    setEditMode(false)
    props.onChange(title)
  }
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  return editMode
     ? <TextField onBlur={deactivateEditMode}
                  value={title}
                  autoFocus
                  onChange={onChangeTitleHandler}
     />
     : <span onDoubleClick={activateEditMode}>{props.title}</span>
}