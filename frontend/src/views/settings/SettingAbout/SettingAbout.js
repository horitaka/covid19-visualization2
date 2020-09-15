import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(3),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  text: {
    color: '#616161',
    marginBottom: theme.spacing(1)
  },
  textSub: {
    color: '#616161',
    paddingLeft: theme.spacing(1)
  }
}));

export default function SettingAbout(props) {
  const classes = useStyles();

  const aboutText1 = 'このサイトでは、都道府県ごとの新型コロナウイルスの新規患者数の推移を確認できます'
  const aboutText2 = '地図の下側にあるスライダーを移動することで日付を選択できます'
  const aboutText3 = '選択した日付の新規患者数が地図上に円で表示されます'

  return (
    <Grid container className={classes.root}>
      <Typography variant="body2" className={classes.text}>
        {aboutText1}
      </Typography>
      <Typography variant="body2" className={classes.textSub}>
        {aboutText2}
      </Typography>
      <Typography variant="body2" className={classes.textSub}>
        {aboutText3}
      </Typography>
    </Grid>
  );
}
