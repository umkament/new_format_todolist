import {ResponseType} from "../api/api";
import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "../state/app-reducer";


export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC({error: data.messages[0]}))
  } else {
    dispatch(setAppErrorAC({error: 'some error occured'}))
  }
  dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
  dispatch(setAppErrorAC({error: error.message ? error.message : 'some error occured'}))
  dispatch(setAppStatusAC({status: 'failed'}))
}