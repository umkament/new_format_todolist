import React from 'react';
import './App.css';
import {Header} from "../components/Header";


type AppPropsType={
  demo?: boolean
}

export const App: React.FC<AppPropsType> = (props) => {

  return (
     <div>
       <Header demo={props.demo}/>
     </div>
  );
}


