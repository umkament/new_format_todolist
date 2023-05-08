import {IconButton, TextField} from "@mui/material";
import {LibraryAdd} from "@mui/icons-material";
import {ChangeEvent, KeyboardEvent, useState} from "react";


type AddItemFormPropsType = {
  addItem: (title: string)=>void
}
export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {
  let [title, setTitle] = useState<string>('')
  let [error, setError] = useState<string>('')

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  //перепроверить, вдруг неправильно протипизировала е
  const keyPressHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    setError('')
    if (e.charCode === 13 && title.trim() !== '') {
      props.addItem(title.trim())
      setTitle('')
    }
    if (e.charCode===13 && title.trim() === ''){
      setError('title is required')
    }
  }

  const addTitleButtonHandler = () => {
  if (title.trim() !== '') {
    props.addItem(title.trim())
    setTitle('')
  } else {
    setError('title is required')
  }
  }

  return<div>
  {/*  //не забыть задизейблить поле на момент обновления*/}
    <TextField value={title}
               onChange={changeTitleHandler}
               onKeyPress={keyPressHandler}
               variant={'filled'}
               label={'type title'}
               error={!!error}
               helperText={error}
    />
   {/* //не забыть задизейблить кнопку*/}
    <IconButton onClick={addTitleButtonHandler}>
      <LibraryAdd/>
    </IconButton>
  </div>
}