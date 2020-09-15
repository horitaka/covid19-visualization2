import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import SettingItem from '../SettingItem/SettingItem'
import { prefectureList } from '../../../constants/prefectureList'

const useStyles = makeStyles(theme => ({
  formControl: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    // minWidth: 120,
  },
  // selectEmpty: {
  //   marginTop: theme.spacing(2),
  // },
}));

const areaCodeList = Object.keys(prefectureList)
areaCodeList.sort(
  function(a,b){
    return (a < b ? -1 : 1);
  }
);

const prefectureListSelector = areaCodeList.map(areaCode => {
  return {
    areaCode: areaCode,
    prefectureName: prefectureList[areaCode].pref
  }
})

function SettingItemAreaSelection(props) {
  const { isMapInitialized, selectedArea, changeArea } = props;
  const classes = useStyles();
  const handleRegionChange = event => {
    const areaCode = event.target.value
    changeArea(areaCode)
  };

  const itemComponent = (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      spacing={1}
    >
      <FormControl className={classes.formControl} fullWidth>
        <Select value={selectedArea || '00'} disabled={!isMapInitialized} onChange={handleRegionChange} displayEmpty className={classes.selectEmpty}>
          <MenuItem value="00">
            全国
          </MenuItem>
          {
            prefectureListSelector.map(prefectureSelector => (
              <MenuItem value={prefectureSelector.areaCode} key={prefectureSelector.areaCode}>
                {prefectureSelector.prefectureName}
              </MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </Grid>
  )

  return (
    <SettingItem
      title="表示地域"
      itemComponent={itemComponent}
    />
  );
}

export default SettingItemAreaSelection;
