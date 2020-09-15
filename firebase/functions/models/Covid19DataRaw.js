const FirebaseInstance = require('../database/Firebase')

const PuppeteerHandler = require('../utils/PuppeteerHandler');
const puppeteer = new PuppeteerHandler()
const Covid19DataRawScraping = require('./Covid19DataRawScraping')
const scraping = new Covid19DataRawScraping()

class Covid19DataRaw {
  constructor() {
    this.covid19data = null
    // this.firebase = Firebase.getInstance()
    this.firebase = FirebaseInstance
    this.urlType = {
      DAYLY_REPORT: 'DAYLY_REPORT',
      AIRPORT_REPORT: 'AIRPORT_REPORT',
      OTHER: 'OTHER'
    }
    this.databaseName = 'covid19data-raw'
    this.databaseNameCovid19data = 'covid19data'
  }

  async loadAllData(onlyUnconfirmed) {
    let query = []
    if (onlyUnconfirmed) {
      query = [
        {
          key: 'isConfirmed',
          operand: '==',
          condition: false
        }
      ]
    }
    const databaseData = await this.firebase.loadAllData(this.databaseName, query)
    const dateList = Object.keys(databaseData)

    // dataの部分を消す作業
    let tmpData = {}
    dateList.forEach(date => {
      tmpData[date] =  databaseData[date].data
    })

    return tmpData
  }

  async loadData(date, onlyUnconfirmed) {
    let query = []
    if (onlyUnconfirmed) {
      query = [
        {
          key: 'isConfirmed',
          operand: '==',
          condition: false
        }
      ]
    }

    const data = await this.firebase.loadData(this.databaseName, date, query)
    if (data) {
      return { [date]: data.data }
    }
    return { [date]: []}
  }

  async storeAllData(allDayData) {
    const dates = Object.keys(allDayData)

    dates.forEach(async date => {
      const sigleDayDataArray = allDayData[date];
      await this.firebase.storeData(this.databaseName, date, { data: sigleDayDataArray })
    })
  }

  async storeData(date, dataByDate) {
    // covid19data-rawに保存
    const dataRawToStore = {
      data: dataByDate,
      isConfirmed: true,
      date: date,
    }
    await this.firebase.storeData(this.databaseName, date, dataRawToStore)

    // covid19dataに同じ都道府県のデータをマージしたデータを保存
    const totalInjectedPeopleCaculatedData = this.calculateTotalInjectedPeople(dataByDate)
    const mergedData = this.mergeDuplicatePrefecture(totalInjectedPeopleCaculatedData)
    const dataMergedToStore = {
      data: mergedData,
      date: date,
    }
    await this.firebase.storeData(this.databaseNameCovid19data, date, dataMergedToStore)
  }

  mergeDuplicatePrefecture(originalData) {
    let mergedData = []

    originalData.forEach(singleOriginalData => {
      // mergedDataの中にareaCodeが同じものがあるかチェックする
      // indexを覚えておく
      let matchedIndex = -1
      mergedData.forEach((singleMergedData, index) => {
        if (singleMergedData.areaCode === singleOriginalData.areaCode) {
          matchedIndex = index
        }
      })

      if (matchedIndex === -1) {
        singleOriginalData.city = ''
        mergedData.push(singleOriginalData)
      } else {
        // mergedData[index] と singleOriginalDataを足す
        let tmpData = Object.assign({}, mergedData[matchedIndex])
        tmpData.totalInjectedPeople = tmpData.totalInjectedPeople + singleOriginalData.totalInjectedPeople
        tmpData.injectedPeople = tmpData.injectedPeople + singleOriginalData.injectedPeople
        tmpData.noSymptomsPeople = tmpData.noSymptomsPeople + singleOriginalData.noSymptomsPeople
        tmpData.positivePeople = tmpData.positivePeople + singleOriginalData.positivePeople
        tmpData.deadPeople = tmpData.deadPeople + singleOriginalData.deadPeople
        tmpData.city = ''

        // mergedData[index] と 足したものを入れ替える
        mergedData.splice(matchedIndex, 1)
        mergedData.push(tmpData)
      }
    })

    // 全地域のデータを足して全国のデータを作成する
    let totalDataForAllArea = {
      date: originalData[0].date,
      areaCode: '00',
      prefecture: '全国',
      city: '',
      totalInjectedPeople: 0,
      injectedPeople: 0,
      noSymptomsPeople: 0,
      positivePeople: 0,
      deadPeople: 0,
    }
    mergedData.forEach(data => {
      totalDataForAllArea.totalInjectedPeople = totalDataForAllArea.totalInjectedPeople + data.totalInjectedPeople
      totalDataForAllArea.injectedPeople = totalDataForAllArea.injectedPeople + data.injectedPeople
      totalDataForAllArea.noSymptomsPeople = totalDataForAllArea.noSymptomsPeople + data.noSymptomsPeople
      totalDataForAllArea.positivePeople = totalDataForAllArea.positivePeople + data.positivePeople
      totalDataForAllArea.deadPeople = totalDataForAllArea.deadPeople + data.deadPeople
    })
    mergedData.push(totalDataForAllArea)
    return mergedData
  }

  calculateTotalInjectedPeople(originalData) {
    const calculatedData = originalData.map(singleData => {
      const totalInjectedPeople =
        singleData.injectedPeople +
        singleData.noSymptomsPeople +
        singleData.positivePeople

      singleData.totalInjectedPeople = totalInjectedPeople
      return singleData
    })

    return calculatedData
  }

  async scrapeCovid19Data() {
    return await scraping.scrapeCovid19Data()
  }

  async sleep(msec) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, msec)
    })
  }

}

module.exports = new Covid19DataRaw()
