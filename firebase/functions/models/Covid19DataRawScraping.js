const FirebaseInstance = require('../database/Firebase')

const PuppeteerHandler = require('../utils/PuppeteerHandler');
const puppeteer = new PuppeteerHandler()

const cityDictionary = require('../constants/citydictionary')
const prefectureCodeDictionary = require('../constants/prefectureCodeDictionary')

class Covid19DataRawScraping {
  constructor() {
    this.firebase = FirebaseInstance
    this.urlType = {
      DAYLY_REPORT: 'DAYLY_REPORT',
      AIRPORT_REPORT: 'AIRPORT_REPORT',
      OTHER: 'OTHER'
    }
    this.databaseName = 'covid19data-raw'
  }

  async scrapeCovid19Data() {
    await puppeteer.launch('');

    // DBからURLを取得する
    const allDetailPageInfo = await this.scrapeDetailPageUrls()

    // DBから取得したURLとスクレイピングで取得したURLを比較して、
    // スクレイピングを実施していないURLのみを取り出す
    const didScrapePageInfo = await this.firebase.loadAllDataWithoutID('detailpages')
    const willScrapePageInfo = this.extractWillScrapePageInfo(allDetailPageInfo, didScrapePageInfo)

    // スクレイピングをしてデータを取り出す
    let covid19Data = {}
    for (let i=0; i<willScrapePageInfo.length; i++) {
        /* eslint no-await-in-loop: "off" */
        const detailData = await this.scrapeDetailData(willScrapePageInfo[i].url)
        if (detailData.date && detailData.data) {
          const dataToStore = {
            data: detailData.data,
            isConfirmed: false,
            date: detailData.date,
          }
          await this.firebase.storeData('covid19data-raw', detailData.date, dataToStore)
          willScrapePageInfo[i].hasRegistered = true
        } else {
          willScrapePageInfo[i].hasRegistered = false
        }
        await this.sleep(1000)
    }

    // URLをDBに保存する
    willScrapePageInfo.forEach(async (pageInfo, i) => {
      const htmlFileName = this.extractHtmlFileName(pageInfo.url)
      await this.firebase.storeData('detailpages', htmlFileName, pageInfo)
    });
    console.log('----willScrapePageInfo-----')
    console.log(willScrapePageInfo)

    await puppeteer.close();

    return covid19Data;

    // return willScrapePageInfo;
  }

  async scrapeDetailPageUrls() {
    const listPageUrl = 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000121431_00086.html'
    const detailPageUrls = await this.getDetailPageUrls(listPageUrl)
    return detailPageUrls
  }

  async getDetailPageUrls(listPageUrl) {
    await puppeteer.movePageTo(listPageUrl)
    const detailPageUrls = await puppeteer.getLinkAndTextList('#content > div.l-contentBody > div > div.l-contentMain > div:nth-child(8) a')
    const detailPageUrlsWithType = detailPageUrls.map(pageUrlObject => {
      return {
        url: pageUrlObject.url,
        text: pageUrlObject.text,
        type: this.getUrlType(pageUrlObject.text),
      }
    })
    return detailPageUrlsWithType
  }

  async scrapeDetailData(url) {
    await puppeteer.movePageTo(url)

    const titleText = await puppeteer.getText('#content > div.l-contentBody > div > div.l-contentMain > div.m-hdgLv1--center > h1')
    const dateString = this.extractDate(titleText)

    const htmlText = await puppeteer.getHtml('#content > div.l-contentBody > div > div.l-contentMain > div:nth-child(4) > div')
    const dataList = this.extractPrefectureData(htmlText)

    return {
      date: dateString,
      data: dataList,
    }
  }

  extractDate(text) {
    const monthMatchedText = text.match(/(（|\().{1,2}?月/g)
    let month = 0
    if (monthMatchedText) {
      // month = monthMatchedText[0].replace('（', '').replace('月', '').replace(/ /g, '')
      month = this.removeCharacters(monthMatchedText[0], ['（', '(', '月']).trim()
      month = this.hankaku2Zenkaku(month)
      if (month.length === 1) {
        month = '0' + month
      }
    }

    const dayMatchedText = text.match(/月.{1,3}?日/g)
    let day = 0
    if (dayMatchedText) {
      // day = dayMatchedText[0].replace('月', '').replace('日', '').replace(/ /g, '')
      day = this.removeCharacters(dayMatchedText[0], ['月', '日']).trim()
      day = this.hankaku2Zenkaku(day)
      if (day.length === 1) {
        day = '0' + day
      }
    }

    const date = new Date()
    const year = date.getFullYear()

    const dateString = year + month + day
    return dateString
  }

  extractPrefectureData(htmlText) {
    // const monthMatchedText = htmlText.match(/（.{1,2}?月/g)
    // let month = 0
    // if (monthMatchedText) {
    //   month = monthMatchedText[0].replace('（', '').replace('月', '').replace(/ /g, '')
    //   month = this.hankaku2Zenkaku(month)
    //   if (month.length === 1) {
    //     month = '0' + month
    //   }
    // }
    //
    // const dayMatchedText = htmlText.match(/月.{1,3}?日/g)
    // let day = 0
    // if (dayMatchedText) {
    //   day = dayMatchedText[0].replace('月', '').replace('日', '').replace(/ /g, '')
    //   day = this.hankaku2Zenkaku(day)
    //   if (day.length === 1) {
    //     day = '0' + day
    //   }
    // }
    //
    // const date = new Date()
    // const year = date.getFullYear()
    //
    // const dateString = year + month + day

    const prefectureDataList = htmlText.match(/\n.*(都|道|府|県|市)：.*(例|名).*<br>/g)
    if (!prefectureDataList) {
      return {}
    }

    const dataList = prefectureDataList.map(data => {
      let prefecture = ''
      const prefectureMatchedText = data.match(/\n.*?(都|道|府|県)：/g)
      if (prefectureMatchedText) {
        prefecture = prefectureMatchedText[0].replace('\n', '').replace('：', '').replace(/ /g, '')
      }

      let city = ''
      const cityMatchedText = data.match(/\n.*?(市)：/g)
      if (cityMatchedText) {
        city = cityMatchedText[0].replace('\n', '').replace('：', '').replace(/ /g, '')
      }

      if (prefecture === '' && city) {
        prefecture = cityDictionary[city] || ''
      }

      let areaCode = ''
      if (prefecture) {
        areaCode = prefectureCodeDictionary[prefecture] || ''
      }

      let injectedPeople = 0
      const injectedPeopleMatchedText = data.match(/(患者|感染者).*?(例|名)/g)
      if (injectedPeopleMatchedText) {
        injectedPeople = injectedPeopleMatchedText[0].replace('感染者', '').replace('患者', '').replace('例', '').replace('名', '')
        injectedPeople = this.hankaku2Zenkaku(injectedPeople)
      }

      let noSymptomsPeople = 0
      const noSymptomsPeopleMatchedText = data.match(/無症状病原体保有者.*?(例|名)/g)
      if (noSymptomsPeopleMatchedText) {
        noSymptomsPeople = noSymptomsPeopleMatchedText[0].replace('無症状病原体保有者', '').replace('例', '').replace('名', '')
        noSymptomsPeople = this.hankaku2Zenkaku(noSymptomsPeople)
      }

      let positivePeople = 0
      const positivePeopleMatchedText = data.match(/陽性確定例.*?(例|名)/g)
      if (positivePeopleMatchedText) {
        positivePeople = positivePeopleMatchedText[0].replace('陽性確定例', '').replace('例', '').replace('名', '')
        positivePeople = this.hankaku2Zenkaku(positivePeople)
      }

      let deadPeople = 0
      const pdeadPeopleMatchedText = data.match(/死亡(者|例).*?(例|名)/g)
      if (pdeadPeopleMatchedText) {
        deadPeople = pdeadPeopleMatchedText[0].replace('死亡者', '').replace('死亡例', '').replace('例', '').replace('名', '')
        deadPeople = this.hankaku2Zenkaku(deadPeople)
      }

      return {
        areaCode: areaCode,
        prefecture: prefecture,
        city: city,
        injectedPeople: Number(injectedPeople),
        noSymptomsPeople: Number(noSymptomsPeople),
        positivePeople: Number(positivePeople),
        deadPeople: Number(deadPeople)
      }
    })

    // return {
    //   date: dateString,
    //   data: dataList
    // }
    return dataList
  }

  hankaku2Zenkaku(str) {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
  }

  getUrlType(text) {
    if(text.match(/新型コロナウイルスに関連した患者等の発生について/) || text.match(/例目/)) {
      return this.urlType.DAYLY_REPORT
    }
    if(text.match(/新型コロナウイルスに関連した無症状病原体保有者の発生について/)) {
      return this.urlType.AIRPORT_REPORT
    }

    return this.urlType.OTHER
  }

  extractWillScrapePageInfo(allPageInfo, didScrapePageInfo) {
    const dididScrapePageUrl = didScrapePageInfo.map(pageInfo => {
      return pageInfo.url
    })

    const daylyReportPageInfo = allPageInfo
      .filter(pageInfo => {
        return pageInfo.type === this.urlType.DAYLY_REPORT
      })

    const willScrapePageInfo = daylyReportPageInfo.filter(pageInfo => {
      return dididScrapePageUrl.indexOf(pageInfo.url) === -1
    })

    // return daylyReportPageInfo // for test
    return willScrapePageInfo
  }

  extractHtmlFileName(url) {
    let htmlFileName = url.slice(url.lastIndexOf('/'))
    return htmlFileName.replace('/','').replace('.html', '')
  }

  removeCharacters(text, charactersToRemove) {
    let newText = text
    charactersToRemove.forEach(char => {
      newText = newText.replace(char, '')
    })

    return newText
  }

  async sleep(msec) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, msec)
    })
  }

}

module.exports = Covid19DataRawScraping
