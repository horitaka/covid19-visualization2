import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
  }
});

function TwoPaneLayout(props) {
  const classes = useStyles();

  return (
    <Grid
      direction="row"
      alignItems="stretch"
      container
      className={classes.root}
    >
      <Grid
        xs={12}
        md={9}
        item
        container
        className={classes.root}
      >
        {props.leftComponent}
      </Grid>
      <Grid
        xs={12}
        md={3}
        item
        container
      >
        {props.rightComponent}
      </Grid>
    </Grid>

  )
}

export default TwoPaneLayout
