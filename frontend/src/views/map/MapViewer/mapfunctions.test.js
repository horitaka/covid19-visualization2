import { convertCovid19DataToGeoJson } from './mapfunctions'

describe('mapfunctions', () => {
  it('converts covid19Data to GeoJSON', () => {
    const mockData = [
      {
        areaCode: '13',
        totalInjectedPeople: 20,
      },
      {
        areaCode: '11',
        totalInjectedPeople: 12,
      }
    ]

    const expectedData = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            totalInjectedPeople: 20,
          },
          geometry: {
            type: 'Point',
            coordinates: [139.69171142578125, 35.68948745727539]
          },
        },
        {
          type: 'Feature',
          properties: {
            totalInjectedPeople: 12,
          },
          geometry: {
            type: 'Point',
            coordinates: [139.6488494873047, 35.856998443603516]
          },
        }
      ]
    }

    expect(convertCovid19DataToGeoJson(mockData)).toEqual(expectedData);
  })


})
