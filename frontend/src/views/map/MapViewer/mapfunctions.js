import { prefectureList } from '../../../constants/prefectureList'

export const convertCovid19DataToGeoJson = (covid19Data) => {
  let geoJson = {
    type: "FeatureCollection",
    "features": []
  }

  let covid19GeoJsonFeatures = []
  covid19Data.forEach(data => {
    // dataがない場合(areaCodeがない場合) と 全国データの場合(areaCodeが00の場合)
    if (!data.areaCode || data.areaCode === '00') {
      return
    }

    let tmpGeoJson = {
      type: "Feature",
      properties: {
        totalInjectedPeople: data.totalInjectedPeople,
      },
      geometry: {
        type: "Point",
        coordinates: convertPrefectureCodeToCoordinates(data.areaCode)
      }
    }
    covid19GeoJsonFeatures.push(tmpGeoJson)
  })

  geoJson.features = [...covid19GeoJsonFeatures]
  return geoJson
}

const convertPrefectureCodeToCoordinates = (prefectureCode) => {
  const longitude = prefectureList[prefectureCode].location.longitude
  const latitude = prefectureList[prefectureCode].location.latitude
  return [ longitude, latitude ]
}
