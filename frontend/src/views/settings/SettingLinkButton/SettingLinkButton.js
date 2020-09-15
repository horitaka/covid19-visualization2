import React from 'react';
import { withRouter } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    paddingRight: '10px',
    paddingLeft: '10px',
  },
});

function SettingLinkButton(props) {
  const classes = useStyles();

  const handleButtonClick = () => {
    props.history.push('/links')
  }

  return (
    <Grid container justify="flex-end" className={classes.root}>
      <Button color="secondary" onClick={handleButtonClick}>
        <Typography>
          お役立ちリンク集
        </Typography>
      </Button>
    </Grid>
  );
}

export default withRouter(SettingLinkButton)
