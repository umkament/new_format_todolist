import {ResponseType} from "../api/api";
import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "../state/app-reducer";


export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch)=>{
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]))
  } else {
    dispatch(setAppErrorAC('some error occured'))
  }
  dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: Dispatch) => {
  dispatch(setAppErrorAC(error.message ? error.message: 'some error occured'))
  dispatch(setAppStatusAC('failed'))
}