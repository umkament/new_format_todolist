import FormLabel from '@mui/material/FormLabel';
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, TextField} from "@mui/material";
import {useCommonDispatch, useCommonSelector} from "../store/store";
import {useFormik} from "formik";
import {logInTC} from "../state/login-reducer";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

type LoginPropsType={}

export const Login: React.FC<LoginPropsType> = (props)=>{
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
    validate: (values)=>{
      if (!values.email)
        return {
        email:'emeail is required',
        }
      if (!values.password)
        return {
          email:'password is required',
        }
    }
  })
  let navigate = useNavigate();
useEffect(()=>{
  if (isLoggedIn) {return navigate('/')}
},[isLoggedIn])


  return<Grid container justifyContent={'center'}>
  <Grid item justifyContent={'center'}>
    <form>
      <FormControl>

     <FormLabel>
       <p>to log in get registered
       <a href={'https://social-network.samuraijs.com/'} target={'_blank'}> here</a>
       </p>
       <p>or use common test account credentials:</p>
       <p>Email: free@samuraijs.com</p>
       <p>Password: free</p>
     </FormLabel>

        <FormGroup>
          <TextField label='Email'
                     margin='normal'
             {...formik.getFieldHelpers('email')} //не помню для чего это нужно
          />
          {formik.errors.email ? <div>{formik.errors.email}</div> : null}
             <TextField type='password'
                        label='Password'
                        margin='normal'
                        {...formik.getFieldHelpers('password')}
             />
          {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                <FormControlLabel label='Remember me'
                                  control={<Checkbox
                                     {...formik.getFieldHelpers('rememberMe')}
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