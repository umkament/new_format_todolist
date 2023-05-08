import React, {useEffect} from 'react';
import './App.css';
import {Header} from "../components/Header";
import {useCommonDispatch, useCommonSelector} from "../store/store";
import {initializedAppTC} from "../state/app-reducer";
import {CircularProgress, LinearProgress} from "@mui/material";

type AppPropsType={}

export const App: React.FC<AppPropsType> = (props) => {
  const dispatch = useCommonDispatch()
  const initialized = useCommonSelector(state => state.app.initialized)

  useEffect(()=>{
    dispatch(initializedAppTC())
  }, [])

  if (!initialized){
    return <LinearProgress/>
  }

  return (
     <div>
       <Header/>
     </div>
  );
}


