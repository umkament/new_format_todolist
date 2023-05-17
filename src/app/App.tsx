import React from 'react';
import './App.css';
import {Header} from "../components/Header";
import {BrowserRouter} from "react-router-dom";


type AppPropsType={
  demo?: boolean
}

export const App: React.FC<AppPropsType> = (props) => {

  return <BrowserRouter>
       <Header demo={props.demo}/>
     </BrowserRouter>
}


