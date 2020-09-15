import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function Login(props) {
  const classes = useStyles();
  const { login } = props
  const [ password, setPassowrd ] = React.useState('')

  const handleClick = (event) => {
    login(password)
  }

  const handleChange = (event) => {
    setPassowrd(event.target.value)
  }

  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="standard-basic" label="パスワード入力" type="password" onChange={handleChange}/>
        <Button variant="contained" color="primary" onClick={handleClick}>
          ログイン
        </Button>
      </form>

    </div>
  );
}

export default Login;
