import axios from 'axios';

export default class ApiAccess {

  fetchData(url, params) {
    const headers = {'Access-Control-Allow-Origin': '*'}

    return new Promise((resolve, reject) => {
      axios.get(url, {headers: headers, params: params})
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          console.warn(error)
          reject(error)
        })
    })
  }

  postData(url, data) {
    return new Promise((resolve, reject) => {
      axios.post(url, data)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          console.warn(error)
          reject(error)
        })
    })
  }

}
