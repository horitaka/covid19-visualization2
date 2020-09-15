import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '15px 10px',
    padding: '10px'
  },
  title: {
    marginBottom: '10px'
  }
}));

function SettingItem(props) {
  const classes = useStyles();
  const { title, itemComponent } = props

  return (
    <Paper className={classes.root}>
      <Typography className={classes.title}>{title}</Typography>
      {itemComponent}
    </Paper>
  );
}

export default SettingItem;
