import React from 'react';

import LinkItem from './LinkItem'
import RoomIcon from '@material-ui/icons/Room';


export default function LinkItemMaps() {

  const linkList = [
    {
      url: 'https://mhlw-gis.maps.arcgis.com/apps/opsdashboard/index.html#/c2ac63d9dd05406dab7407b5053d108e',
      text: '厚生労働省 - 新型コロナウイルス感染症 国内事例'
    },{
      url: 'https://www.asahi.com/special/corona/',
      text: '朝日新聞 - 新型コロナウイルス感染者数の推移'
    },{
      url: 'https://toyokeizai.net/sp/visual/tko/covid19/',
      text: '東洋経済ONLINE - 新型コロナウイルス国内感染の状況'
    },{
      url: 'https://gis.jag-japan.com/covid19jp/',
      text: '都道府県別新型コロナウイルス感染者数マップ'
    },
  ]
  const linkCategoryTitle = '感染者数マップ'
  const linkCategoryIcon = <RoomIcon fontSize="inherit"/>

  return (
    <LinkItem linkList={linkList} linkCategoryTitle={linkCategoryTitle} linkCategoryIcon={linkCategoryIcon} defaultExpanded={true}/>
  );
}
