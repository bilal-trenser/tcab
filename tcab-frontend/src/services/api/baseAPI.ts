export default class BaseAPI {
  // Base URL goes here
  host: string

  // HTTP headers
  headers: {} | undefined

  /**
   * Constuctor
   * @param host C
   */
  constructor(host: string) {
    this.host = host
    this.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  }
}
