import React from 'react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    textAlign: 'center',
    fontWeight: 'fontWeightMedium',
    fontSize: '20px',
  },
});

function Title() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h6">
        新型コロナウイルス 感染者数マップ
      </Typography>
    </Box>
  );
}

export default Title;
