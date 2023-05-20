import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {initializedAppTC} from "../state/app-reducer";
import {logOutTC} from "../state/login-reducer";
import {AppBar, Box, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import {Login} from "../components/Login";
import {TodolistList} from "../components/TodolistList";
import {ErrorSnackBar} from "../components/errorSnackBar";
import {useCommonDispatch, useCommonSelector} from "../store/store";
import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

type AppPropsType={
  demo?: boolean
}

export const App: React.FC<AppPropsType> = (props) => {
    const dispatch = useCommonDispatch()
    const status = useCommonSelector(state => state.app.appStatus)
    const initialized = useCommonSelector(state => state.app.initialized)
    const isLoggedIn = useCommonSelector(state => state.auth.isLoggedIn)

    useEffect(() => {
    dispatch(initializedAppTC())
  }, [])

    const logOutHandler = useCallback(() => {
    dispatch(logOutTC())
  }, [dispatch])

    if (!initialized) {
    return <LinearProgress/>
  }

    const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
  }));
    const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
    const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
    width: '12ch',
    '&:focus': {
    width: '20ch',
  },
  },
  },
  }));

    return <Box sx={{flexGrow: 1}}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
           size="large"
           edge="start"
           color="inherit"
           aria-label="open drawer"
           sx={{mr: 2}}
        >
          <MenuIcon/>
        </IconButton>
        <Typography
           variant="h6"
           noWrap
           component="div"
           sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
        >
          add your tasks in todolist and get them out of your head
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon/>
          </SearchIconWrapper>
          <StyledInputBase
             placeholder="Search…"
             inputProps={{'aria-label': 'search'}}
          />
        </Search>
        {isLoggedIn && <Button onClick={logOutHandler} color='inherit' style={{padding: '25px'}}>Log out</Button>}
      </Toolbar>
      {status === 'loading' && <LinearProgress color='primary'/>}
    </AppBar>
    <Container fixed>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<TodolistList demo={props.demo}/>}/>
      </Routes>
      <ErrorSnackBar/>
    </Container>
  </Box>
}


