import React from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PeopleIcon from '@material-ui/icons/People';
import Typography from '@material-ui/core/Typography';

import SettingItem from '../SettingItem/SettingItem'

function SettingItemDataType(props) {
  const { dataType, isMapInitialized, changeDataType } = props

  const handleClick = (event, newDataType) => {
    changeDataType(newDataType)
  }

  const injectedPeopleButtonStyle = dataType === 'injectedPeople' ? 'contained' : 'outlined'
  const deadPeopleButtonStyle = dataType === 'deadPeople' ? 'contained' : 'outlined'

  const itemComponent = (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      spacing={1}
    >
      <Grid container item xs justify="center">
        <Button variant={injectedPeopleButtonStyle} fullWidth color="primary" disabled={!isMapInitialized} onClick={(event) => handleClick(event, 'injectedPeople')}>
          <PeopleIcon /><Typography>　感染者数</Typography>
        </Button>
      </Grid>
      <Grid container item xs justify="center">
        <Button variant={deadPeopleButtonStyle} fullWidth color="primary" disabled={!isMapInitialized} onClick={(event) => handleClick(event, 'deadPeople')}>
          <PeopleIcon /><Typography>　死亡者数</Typography>
        </Button>
      </Grid>
    </Grid>
  )

  return (
    <SettingItem
      title="表示データ"
      itemComponent={itemComponent}
    />
  );
}

export default SettingItemDataType;
