import { AxiosResponse } from 'axios'
import { database } from '../../configs/constants'
import { BasicContentResponse } from '../../configs/enps-interface'
import { Client } from './api'

export const getBasicContent = async (
  guid: string,
  enpsPath: string,
  path: string
) => {
  // const enpsHeader = new AxiosHeaders({
  //   contentType: 'application/json',
  //   'X-ENPS-TOKEN': String(token),
  // })

  // const config: AxiosRequestConfig = {
  //   headers: enpsHeader,
  // }

  const bcResponse = await Client.get<BasicContentResponse>(
    `/BasicContent?database=${database}&path=${
      enpsPath + '\\R_' + path
    }&guid=${guid}&hitHighlightTerm=&returnTextLevel=FULL`
  )
    .then((response: AxiosResponse<BasicContentResponse>) => {
      // console.log('Basic Content data: ', response.data)
      console.log('Basic Content request status code: ', response.status)
      return response.data
    })
    .catch((err: Error) => {
      console.error('Error with Basic Content request', err)
    })

  if (bcResponse) {
    return bcResponse
  }
}
