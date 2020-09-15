import React from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Typography from '@material-ui/core/Typography';

import SettingItem from '../SettingItem/SettingItem'

function SettingItemAutoPlay(props) {
  const { isMapInitialized, isAutoPlaying, startAutoPlay } = props

  const handleAutoPlayButtonClick = () => {
    startAutoPlay()
  }

  const itemComponent = (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      spacing={1}
    >
      <Grid container item xs justify="center">
        <Button variant="contained" fullWidth color="primary" disabled={!isMapInitialized || isAutoPlaying} onClick={handleAutoPlayButtonClick}>
          <PlayCircleOutlineIcon /><Typography>　スタート</Typography>
        </Button>
      </Grid>
    </Grid>
  )

  return (
    <SettingItem
      title="日付を自動で切替え"
      itemComponent={itemComponent}
    />
  );
}

export default SettingItemAutoPlay;
