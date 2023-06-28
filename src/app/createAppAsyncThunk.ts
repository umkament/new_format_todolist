import {createAsyncThunk} from "@reduxjs/toolkit";
// @ts-ignore
import {AppDispatchType, RootStateType} from '/src/store/store';


export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  dispatch: AppDispatchType,
  state: RootStateType,
  rejectWithValue: unknown
}>()