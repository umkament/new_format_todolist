import {IconButton, TextField} from "@mui/material";
import {LibraryAdd} from "@mui/icons-material";
import {ChangeEvent, KeyboardEvent, useState} from "react";


type AddItemFormPropsType = {
  addItem: (title: string) => void
  disabled?: boolean
}
export const AddItemForm: React.FC<AddItemFormPropsType> = ({addItem, disabled}) => {
  let [title, setTitle] = useState<string>('')
  let [error, setError] = useState<string>('')

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  //перепроверить, вдруг неправильно протипизировала е
  const keyPressHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    setError('')
    if (e.charCode === 13 && title.trim() !== '') {
      addItem(title.trim())
      setTitle('')
    }
    if (e.charCode === 13 && title.trim() === '') {
      setError('title is required')
    }
  }

  const addTitleButtonHandler = () => {
    if (title.trim() !== '') {
      addItem(title.trim())
      setTitle('')
    } else {
      setError('title is required')
    }
  }

  return <div>
    {/*  //не забыть задизейблить поле на момент обновления*/}
    <TextField value={title}
               onChange={changeTitleHandler}
               onKeyPress={keyPressHandler}
               variant={'filled'}
               label={'type title'}
               error={!!error}
               helperText={error}
               disabled={disabled}
    />
    {/* //не забыть задизейблить кнопку*/}
    <IconButton onClick={addTitleButtonHandler}
                disabled={disabled}
    >
      <LibraryAdd/>
    </IconButton>
  </div>
}