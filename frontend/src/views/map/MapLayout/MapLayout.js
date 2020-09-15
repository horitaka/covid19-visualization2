import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  title: {
    height: '5%',
  },
  map: {
    height: '80%',
  },
  controller: {
    height: '15%',
  },
});

function MapLayout(props) {
  const { titleComponent, mapViewerComponent, mapControllerComponent } = props
  const classes = useStyles();

  return (
    <Grid
      height="100%" width="100%"
      container item
      direction="column"
      alignItems="stretch"
      >
      <Grid
        item
        className={classes.title}
      >
        {titleComponent}
      </Grid>
      <Grid
        item
        className={classes.map}
      >
        {mapViewerComponent}
      </Grid>
      <Grid
        item
        className={classes.controller}
      >
        {mapControllerComponent}
      </Grid>
    </Grid>
  );
}

// <Box height="100%" width="100%" display="flex" flexDirection="column">
//   <Box flex={'0 1 10%'}>
//     {titleComponent}
//   </Box>
//   <Box flex={'1 1 80%'}>
//     {mapRendererComponent}
//   </Box>
//   <Box flex={'0 1 10%'}>
//     {mapControllerComponent}
//   </Box>
// </Box>

export default MapLayout;
