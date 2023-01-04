/* eslint-disable class-methods-use-this */
import { TCabStatusCodes } from './statusCodes'
import TCabBaseReponse from './tCabBaseReponse'
import TCabError, { networkError } from './tCabError'

export default class ApiRequest {
  // Base URL
  baseUrl: string

  // Header
  header: {} | undefined

  // POST request message body
  requestMessage: {} | undefined

  // Query params
  queryParams: { [x: string]: string | number | boolean } | undefined

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  performErroCheck?: (arg0: TCabBaseReponse) => Promise<any>

  // Used when only error check needed is HTTP status code check. In such case,
  // Just resolve the promise using API response.
  successReturn = (arg0: TCabBaseReponse): Promise<any> => Promise.resolve(arg0)

  constructor(
    url: string,
    customErrorCheck?: (arg0: TCabBaseReponse) => any | undefined
  ) {
    this.baseUrl = url
    if (customErrorCheck !== undefined) {
      this.performErroCheck = customErrorCheck
    } else {
      this.performErroCheck = this.successReturn
    }
  }

  /**
   * HTTP header setter
   *
   * @param header header obj.s
   * @returns API req.
   */
  setHeader(header: {} | undefined): ApiRequest {
    this.header = header
    return this
  }

  /**
   * HTTP header setter
   *
   * @param key header key
   * @param value header value
   * @returns
   */
  addHeader(key: string, value: string): ApiRequest {
    this.header = { ...this.header, ...{ [key]: value } }
    return this
  }

  /**
   * Sets Post body fields
   *
   * @param key
   * @param value
   * @returns
   */
  addParam(key: string, value: string | number): ApiRequest {
    this.requestMessage = { ...this.requestMessage, ...{ [key]: value } }
    return this
  }

  /**
   * Sets Post body
   *
   * @param key
   * @param value
   * @returns
   */
  addParamObject(key: string, value: any): ApiRequest {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.requestMessage = { ...this.requestMessage, ...{ [key]: value } }
    return this
  }

  /**
   * Sets entire query objs
   *
   * @param param
   * @returns
   */
  setQueryParam(param: {} | undefined): ApiRequest {
    this.queryParams = param
    return this
  }

  /**
   * Adds query param
   *
   * @param key
   * @param value
   * @returns
   */
  addQueryParameter(key: string, value: string): ApiRequest {
    this.queryParams = { ...this.queryParams, ...{ [key]: value } }
    return this
  }

  /**
   * Perform HTTP code validation
   *
   * @param response
   * @returns
   */
  checkStatus = (response: Response): Promise<Response> => {
    // this.logResponse(response);

    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response)
    }

    return Promise.reject(networkError(response.status))
  }

  /**
   * Gets JSON payload
   *
   * @param response
   * @returns
   */
  getPayload = (response: Response) => response.json()

  /**
   * Makes GET request
   * @returns
   */
  get(): Promise<any> {
    // this.logRequest();

    return fetch(
      this.baseUrl + ApiRequest.jsonToQueryString(this.queryParams),
      {
        method: 'GET',
        headers: this.header,
      }
    )
      .then(this.checkStatus)
      .then(this.getPayload)
      .then(this.performErroCheck)
      .then((any) => Promise.resolve(any))
      .catch((error: TCabError) => {
        if (error.message === 'Failed to fetch') {
          const err = networkError(TCabStatusCodes.NETWORK_FAILED)
          return Promise.reject(err)
        }
        return Promise.reject(error)
      })
  }

  /**
   * Makes POST request
   * @returns
   */
  post(): Promise<any> {
    // this.logRequest();

    // const body = {
    //   Message: this.requestMessage,
    // };
    const body = this.requestMessage

    return fetch(this.baseUrl, {
      method: 'POST',
      headers: this.header,
      body: JSON.stringify(body),
    })
      .then(this.checkStatus)
      .then(this.getPayload)
      .then(this.performErroCheck)
      .then((any) => Promise.resolve(any))
      .catch((error: TCabError) => {
        if (error.message === 'Failed to fetch') {
          const err = networkError(TCabStatusCodes.NETWORK_FAILED)
          return Promise.reject(err)
        }
        return Promise.reject(error)
      })
  }

  /**
   * JSON to query string
   * @param json
   * @returns
   */
  static jsonToQueryString(
    json: { [x: string]: string | number | boolean } | undefined
  ): string {
    if (json === undefined) {
      return ''
    }

    return `?${Object.keys(json)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`
      )
      .join('&')}`
  }

  // logRequest() {
  //   console.log("");
  //   console.log("");
  //   console.log("~~ Api Request #Begin# ~~");
  //   console.log("URL: ", this.baseUrl);
  //   console.log("Headers: ", JSON.stringify(this.header));
  //   console.log("Params: ", JSON.stringify(this.requestMessage));
  //   console.log("~~ Api Request #End# ~~");
  //   console.log("");
  //   console.log("");
  // }

  // logResponse(response: Response) {
  //   const clone = response.clone();
  //   console.log("");
  //   console.log("");
  //   console.log("~~ Api Response #Begin# ~~");
  //   console.log("URL: ", this.baseUrl);
  //   console.log("Status: ", clone.status);
  //   console.log("JSON: ", clone.text());
  //   console.log("~~ Api Response #End# ~~");
  //   console.log("");
  //   console.log("");
  // }
}
