import React, {useEffect} from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {useCommonDispatch, useCommonSelector} from "../store/store";
import {logInTC} from "../state/login-reducer";
import {useNavigate} from "react-router-dom";


export const Login = () => {
  const dispatch = useCommonDispatch()
  const isLoggedIn = useCommonSelector(state => state.auth.isLoggedIn)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    onSubmit: values => {
      dispatch(logInTC(values))
    },
    validate: (values) => {
      if (!values.email)
        return {
          email: 'emeail is required',
        }
      if (!values.password)
        return {
          email: 'password is required',
        }
    }
  })

  let navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      return navigate('/')
    }
  }, [isLoggedIn])

  return <Grid container justifyContent={'center'}>
    <Grid item justifyContent={'center'}>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>

          <FormLabel>
            <p>to log in get registered
              <a href={'https://social-network.samuraijs.com/'}
                 target={'_blank'}
              >
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>Email: free@samuraijs.com</p>
            <p>Password: free</p>
          </FormLabel>

          <FormGroup>
            <TextField label='Email'
                       margin='normal'
                       {...formik.getFieldProps('email')} //не помню для чего это нужно
            />
            {formik.errors.email ? <div style={{color: "red"}}>{formik.errors.email}</div> : null}
            <TextField type='password'
                       label='Password'
                       margin='normal'
                       {...formik.getFieldProps('password')}
            />
            {formik.errors.password ? <div style={{color: "red"}}>{formik.errors.password}</div> : null}
            <FormControlLabel label='Remember me'
                              control={<Checkbox
                                 {...formik.getFieldProps('rememberMe')}
                                 checked={formik.values.rememberMe}
                              />}
            />
            <Button type='submit'
                    variant='contained'
                    color='primary'
            >
              Login
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </Grid>
  </Grid>
}