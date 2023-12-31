import { AxiosResponse } from 'axios'
import { database, enpsPath, token } from '../../configs/constants'
import { RawRundownData } from '../../configs/enps-interface'
import { Client } from './api'

export const getRundownContent = async (guid: string) => {
  // const enpsHeader = new AxiosHeaders({
  //   'X-ENPS-TOKEN': String(token),
  // })

  // const config: AxiosRequestConfig = {
  //   headers: enpsHeader,
  // }

  const rundownResponse = await Client.get<RawRundownData>(
    `/RundownContent?database=${database}&path=${enpsPath}&guid=${guid}&hitHighlightTerm=&returnTextLevel=FULL`
  )
    .then((response: AxiosResponse<RawRundownData>) => {
      console.log('Rundown Status code: ', response.status)
      return response.data
    })
    .catch((err: Error) => {
      console.log('Error with Global Tables request', err)
    })

  if (rundownResponse) {
    return rundownResponse
  }
}
