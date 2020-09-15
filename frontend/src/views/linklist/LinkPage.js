import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// import LinkList from './LinkList'
import LinkItemCountermeasures from './LinkItemCountermeasures'
import LinkItemMaps from './LinkItemMaps'
import WebIcon from '@material-ui/icons/Web';

const useStyles = makeStyles({
  root: {
    width: '100%',
    // height: '100%',
    padding: '15px',
  },
  title: {
    margin: '20px 0 20px 0',
  },
  linkList: {
    marginBottom: '20px',
  }
});


function LinkPage(props) {
  const classes = useStyles();

  return (
    <Grid
      container
      justify="center"
      className={classes.root}
    >
      <Grid
        container
        item
        alignItems="center"
        xs={12}
        md={8}
      >
        <Grid item xs={12} className={classes.title}>
          <Typography variant={'h5'}><WebIcon /> お役立ちリンク集</Typography>
        </Grid>

        <Grid item xs={12} className={classes.linkList}>
          <LinkItemCountermeasures />
        </Grid>

        <Grid item xs={12} className={classes.linkList}>
          <LinkItemMaps />
        </Grid>

      </Grid>
    </Grid>
  );
}

export default LinkPage;
