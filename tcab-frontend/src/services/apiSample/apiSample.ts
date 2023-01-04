// eslint-disable-next-line import/no-cycle
import { Data } from '../../features/sampleSlice/interface'
import tCabAPI from '../api/tCabAPI'
import TCabError from '../api/tCabError'

export default function getSampleResponse() {
  return new Promise<{ data: Data }>((resolve, reject) => {
    tCabAPI
      .request('getObjects')
      .get()
      .then((data: Data) => {
        resolve({ data })
      })
      .catch((error: TCabError) => {
        reject(error)
      })
  })
}
