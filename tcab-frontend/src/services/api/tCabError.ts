import getDisplayMessage from '../../i18n/displayMessage'
import { mapErroCodeToErrorMessage } from './statusCodes'

/**
 * TCab specific error class.
 */
class TCabError {
  erroCode: number

  message: string

  constructor(errorCode: number, msg: string = '') {
    this.erroCode = errorCode
    this.message = msg
  }
}

/**
 * Generates TCab error.
 *
 * @param code error code
 * @param errorMessage TCab specific error message.
 * @returns
 */
export function generateTCabError(
  code: number,
  errorMessage?: string
): TCabError {
  return new TCabError(
    code,
    !errorMessage ? mapErroCodeToErrorMessage(code) : errorMessage
  )
}

/**
 * Generate generic error  in case HHTTP error.
 *
 * @param code error code
 * @returns
 */
export function networkError(code: number): TCabError {
  return new TCabError(
    code,
    `${getDisplayMessage('common.errorMsg.unknownError')}`
  )
}

export default TCabError
