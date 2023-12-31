import { AxiosResponse } from 'axios'
import { GlobalTablesResponse } from '../../configs/enps-interface'
import { Client } from './api'

export const getGlobalTables = async () => {
  // const enpsHeader = new AxiosHeaders({
  //   'X-ENPS-TOKEN': String(token),
  // })

  // const config: AxiosRequestConfig = {
  //   headers: enpsHeader,
  // }

  const tablesResponse = await Client.get<GlobalTablesResponse>(
    '/GlobalTables?filterLangPrefix=API&filterInActiveUsers=True'
  )
    .then((response: AxiosResponse<GlobalTablesResponse>) => {
      // console.log('GTables data: ', response.data)
      console.log('GTables Status code: ', response.status)
      return response.data
    })
    .catch((err: Error) => {
      console.log('Error with Global Tables request', err)
    })

  if (tablesResponse) {
    return tablesResponse
  }
}
