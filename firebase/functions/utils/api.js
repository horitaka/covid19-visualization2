import axios from 'axios';

import config from '../../config';

class Api {

  constructor() {
    this.instance = axios.create({
      // baseURL: config.api.url,
      // timeout: 1000,
      // headers: { Authorization: `Bearer ${idToken}` }
    });
  }

  async get(url, params) {
    try {
      const response = await this.instance.get(url, { params: params });
      return response && response.data;
    } catch (error) {
      console.error(error.response.data)
      throw (error.response.data);
    }

  }

  // async post(url: string, data: object, options?: object) {
  //   try {
  //     const response = await this.instance?.post(url, data);
  //     return response && response.data
  //   } catch (error) {
  //     console.error(error.response.data)
  //     throw (error.response.data);
  //   }
  // }

  // async patch(url: string, data?: object) {
  //   try {
  //     const response = await this.instance?.patch(url, data);
  //     return response && response.data
  //   } catch (error) {
  //     console.error(error.response.data)
  //     throw (error.response.data);
  //   }
  // }

  // async delete(url: string) {
  //   try {
  //     const response = await this.instance?.delete(url);
  //     return response && response.data
  //   } catch (error) {
  //     console.error(error.response.data)
  //     throw (error.response.data);
  //   }
  // }

}

export default new Api();