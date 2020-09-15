const FirebaseInstance = require('../database/Firebase')

const PuppeteerHandler = require('../utils/PuppeteerHandler');
const puppeteer = new PuppeteerHandler()

const cityDictionary = require('../constants/citydictionary')
const prefectureCodeDictionary = require('../constants/prefectureCodeDictionary')

class Covid19Data {
  constructor() {
    this.covid19data = null
    this.firebase = FirebaseInstance
    this.databaseName = 'covid19data'
  }

  static getInstance() {
    if (!this.covid19data) {
      this.covid19data = new Covid19Data()
    }
    return this.covid19data
  }

  async loadAllData() {
    const databaseData = await this.firebase.loadAllData(this.databaseName)
    const dateList = Object.keys(databaseData)

    // dataの部分を消す作業
    let response = {}
    dateList.forEach(date => {
      response[date] =  databaseData[date].data
    })

    return response
  }

  async loadPeriodData(from, to) {
    let query = []
    if (from) {
      query.push({
        key: 'date',
        operand: '>=',
        condition: from
      })
    }
    if (to) {
      query.push({
        key: 'date',
        operand: '<=',
        condition: to
      })
    }

    const databaseData = await this.firebase.loadAllData(this.databaseName, query)
    const dateList = Object.keys(databaseData)

    // dataの部分を消す作業
    let response = {}
    dateList.forEach(date => {
      response[date] =  databaseData[date].data
    })

    return response
  }

  async loadData(date) {
    const data = await this.firebase.loadData(this.databaseName, date)
    if (data) {
      return data.data
    }
    return []
  }

  async storeAllData(allDayData) {
    const dates = Object.keys(allDayData)

    dates.forEach(async date => {
      const sigleDayDataArray = allDayData[date];
      // await this.firebase.storeData2('covid19data', date, sigleDayData)
      await this.firebase.storeData('covid19data', date, { data: sigleDayDataArray })
      // sigleDayDataArray.forEach(async (sigleDayData, index) => {
      //   await this.firebase.storeData(`covid19data/${date}/data`, index, sigleDayData)
      // })
    })
  }

}

module.exports = Covid19Data
