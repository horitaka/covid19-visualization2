import React, { useState, useEffect} from 'react';
import MaterialTable from 'material-table';

import prefectureCodeDictionary from '../../../../constants/prefectureCodeDictionary'

export default function TableBody(props) {
  const { covid19DataOriginal, updateDataEdited } = props

  const convertDataToTableFormat = (originalData) => {
    let convertedData = []

    const dateList = Object.keys(originalData)
    dateList.forEach(date => {
      originalData[date].forEach(singleDataByDate => {
        convertedData.push({
          date: date,
          ...singleDataByDate
        })
      })
    })

    return convertedData
  }

  const convertTableDataToDBFormat = (tableData) => {
    let convertedData = {}

    tableData.forEach(singleData => {
      const tmpData = {
        ...singleData
      }
      delete tmpData.tableData

      if (convertedData[singleData.date]) {
        convertedData[singleData.date].push(tmpData)
      } else {
        convertedData[singleData.date] = [tmpData]
      }
    })
    return convertedData
  }

  const [state, setState] = useState({
    columns: [
      { title: '日付', field: 'date' },
      { title: 'コード', field: 'areaCode', type: 'string' },
      { title: '都道府県', field: 'prefecture', type: 'string' },
      { title: '市区町村', field: 'city', type: 'string' },
      { title: '患者数', field: 'injectedPeople', type: 'numeric' },
      { title: '無症状患者数', field: 'noSymptomsPeople', type: 'numeric' },
      { title: '陽性数', field: 'positivePeople', type: 'numeric' },
      { title: '死者数', field: 'deadPeople', type: 'numeric' },
    ],
    data: convertDataToTableFormat(covid19DataOriginal),
  });

  useEffect(() => {
    const prevState = state.columns
    setState({
      columns: prevState,
      data: convertDataToTableFormat(covid19DataOriginal)
    })
  }, [state.columns, covid19DataOriginal]);

  useEffect(() => {
    // console.log(state.data)
    const convertedData = convertTableDataToDBFormat(state.data)
    updateDataEdited(convertedData)
  }, [state.data, updateDataEdited]);

  const convertTableRowStringToNumber = (tableRowData) => {
    let tmpRowData = {...tableRowData}
    tmpRowData.areaCode = prefectureCodeDictionary[tmpRowData.prefecture]
    tmpRowData.injectedPeople = Number(tmpRowData.injectedPeople)
    tmpRowData.noSymptomsPeople = Number(tmpRowData.noSymptomsPeople)
    tmpRowData.positivePeople = Number(tmpRowData.positivePeople)
    tmpRowData.deadPeople = Number(tmpRowData.deadPeople)

    return tmpRowData
  }

  const handleRowAdd = newData => {
    const convertedNewData = convertTableRowStringToNumber(newData)

    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
        setState(prevState => {
          const data = [...prevState.data];
          data.push(convertedNewData);
          return {
            ...prevState,
            data
          };
        });
      }, 600);
    })
  }

  const handleRowUpdate = (newData, oldData) => {
    const convertedNewData = convertTableRowStringToNumber(newData)
    const convertedOldData = convertTableRowStringToNumber(oldData)

    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
        if (convertedOldData) {
          setState(prevState => {
            const data = [...prevState.data];
            data[data.indexOf(oldData)] = convertedNewData;
            return { ...prevState, data };
          });
        }
      }, 600);
    })
  }

  const handleRowDelete = oldData => {
    const convertedOldData = convertTableRowStringToNumber(oldData)

    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
        setState(prevState => {
          const data = [...prevState.data];
          data.splice(data.indexOf(convertedOldData), 1);
          return { ...prevState, data };
        });
      }, 600);
    })
  }

  const tableOptions = {
    pageSize: 30,
    pageSizeOptions: [10, 20, 30]
  }

  return (
    <MaterialTable
      title="Editable Example"
      columns={state.columns}
      data={state.data}
      options={tableOptions}
      editable={{
        onRowAdd: handleRowAdd,
        onRowUpdate: handleRowUpdate,
        onRowDelete: handleRowDelete
      }}
    />
  );
}
