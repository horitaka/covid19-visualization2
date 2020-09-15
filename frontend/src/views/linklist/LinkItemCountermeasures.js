import React from 'react';

import LinkItem from './LinkItem'
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';

export default function LinkItemCountermeasures() {

  const linkList = [
    {
      url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/dengue_fever_qa_00001.html',
      text: '厚生労働 - 新型コロナウイルスに関するQ&A'
    },{
      url: 'http://www.kantei.go.jp/jp/headline/kansensho/coronavirus.html',
      text: '首相官邸 - 新型コロナウイルス感染症に備えて'
    },
  ]
  const linkCategoryTitle = '感染症の対策'
  const linkCategoryIcon = <LocalHospitalIcon fontSize="inherit"/>

  return (
    <LinkItem linkList={linkList} linkCategoryTitle={linkCategoryTitle} linkCategoryIcon={linkCategoryIcon} defaultExpanded={true}/>
  );
}
