import React from 'react';

import Grid from '@material-ui/core/Grid';

// import SettingItemDataType from './SettingItemDataType'
import SettingItemDisplayMode from './SettingItemDisplayMode'
import SettingItemAreaSelection from './SettingItemAreaSelection'
import SettingItemDate from './SettingItemDate'
import SettingItemAutoPlay from './SettingItemAutoPlay'
import SettingAbout from './SettingAbout/SettingAbout'
import SettingLinkButton from './SettingLinkButton/SettingLinkButton'
import SettingFooter from './SettingFooter/SettingFooter'

function Settings() {

  return (
    <Grid
      xs={12}
      item
    >
      <SettingItemDisplayMode />
      <SettingItemAreaSelection />
      <SettingItemDate />
      <SettingItemAutoPlay />
      <SettingAbout />
      <SettingLinkButton />
      <SettingFooter />
    </Grid>
  );
}

export default Settings;
