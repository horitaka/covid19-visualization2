import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon
} from 'react-share'

const useStyles = makeStyles({
  root: {
    padding: '10px'
  },
  item: {
    marginLeft : '10px'
  }
});

export default function SettingFooter(props) {
  const classes = useStyles();

  const appUrl = process.env.REACT_APP_PAGE_URL
  const pageTitle = process.env.REACT_APP_PAGE_TITLE
  const iconSize = 40

  return (
    <Grid container justify="flex-end" className={classes.root}>
      <Grid item className={classes.item}>
        <FacebookShareButton url={appUrl}>
          <FacebookIcon size={iconSize} round />
        </FacebookShareButton>
      </Grid>
      <Grid item className={classes.item}>
        <TwitterShareButton url={appUrl} title={pageTitle}>
          <TwitterIcon size={iconSize} round />
        </TwitterShareButton>
      </Grid>
    </Grid>
  );
}
