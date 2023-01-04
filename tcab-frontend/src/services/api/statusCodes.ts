import getDisplayMessage from '../../i18n/displayMessage'

export enum TCabStatusCodes {
  SUCCESS = 0,
  NETWORK_FAILED = 12001,
}

/**
 * Returns platform specific error message.
 *
 * @param code TCab error code
 * @returns error message
 */
export function mapErroCodeToErrorMessage(code: number): string {
  switch (code) {
    case TCabStatusCodes.SUCCESS:
      return getDisplayMessage('common.errorMsg..noErrors')
    default:
      break
  }
  return getDisplayMessage('common.errorMsg..unknownError')
}

export default TCabStatusCodes
