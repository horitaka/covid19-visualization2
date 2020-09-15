import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import TableHeader from './TableHeader'
import TableBody from './TableBody'

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
  },
  box: {
    width: '80%',
    height: '100%',
    margin: 'auto',
  }
});

function Table() {
  const classes = useStyles();

  return (
    <Box
      className={classes.box}
    >
      <Grid
        direction="row"
        justify="flex-start"
        alignItems="stretch"
        container
        spacing={1}
      >
        <TableHeader />
      </Grid>

      <Grid
        direction="row"
        justify="center"
        alignItems="stretch"
        container
        item
      >
        <TableBody />
      </Grid>

    </Box>
  );
}

export default Table;
