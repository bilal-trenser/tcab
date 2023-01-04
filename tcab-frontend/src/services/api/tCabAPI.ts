import ApiRequest from './apiRequest'
import BaseAPI from './baseAPI'
import getUrl from './helper'
import TCabBaseReponse from './tCabBaseReponse'
import { generateTCabError } from './tCabError'

/**
 *  This API implements TCab specific API handling logic
 */
class TCabAPI extends BaseAPI {
  /**
   * This function will perform TCab specific custom error checks.
   *
   * @param response - TCab response
   * @returns
   */

  // eslint-disable-next-line class-methods-use-this
  tCabStatusCheck = (response: TCabBaseReponse): Promise<any> => {
    // TODO: Fix this dummy code
    if (response === undefined || response.StatusCode === undefined) {
      return Promise.resolve(response)
    }

    return Promise.reject(generateTCabError(response.StatusCode))
  }

  /**
   * Generates a single API request
   *
   * @param endPoint API end point
   * @returns
   */
  request(endPoint: string): ApiRequest {
    return new ApiRequest(
      this.host.concat(endPoint),
      this.tCabStatusCheck
    ).setHeader(this.headers)
  }
}

const tCabAPI: TCabAPI = new TCabAPI(getUrl('tcab'))

export default tCabAPI
