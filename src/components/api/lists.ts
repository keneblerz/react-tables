import { AxiosResponse } from 'axios'
import { database } from '../../configs/constants'
import { endDate, startDate } from '../../configs/date'
import { ListResponse } from '../../configs/enps-interface'
import { Client } from './api'

export const postLists = async (enpsPath: string) => {
  // const enpsHeader = new AxiosHeaders({
  //   'X-ENPS-TOKEN': String(token),
  // })

  // const config: AxiosRequestConfig = {
  //   headers: enpsHeader,
  // }

  const listParams = [
    {
      Path: enpsPath,
      Guid: '',
      Type: 2,
      StartTime: startDate,
      EndTime: endDate,
      Priority: -1,
      UnreadBy: '',
    },
  ]

  console.log('Start Time: ', startDate)
  console.log('End Time: ', endDate)

  const listBody = {
    Database: database,
    ENPSListParameters: listParams,
  }

  const listResponse = await Client.post<ListResponse>('/Lists', listBody)
    .then((response: AxiosResponse<ListResponse>) => {
      // console.log('List data: ', response.data)
      console.log('List Request Status code: ', response.status)
      return response.data
    })
    .catch((err: Error) => {
      console.log('Error with List request:', err)
    })

  if (listResponse) {
    return listResponse
  }
}
