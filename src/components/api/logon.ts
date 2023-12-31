import { AxiosResponse } from 'axios'
import {
  devKey,
  domainName,
  password,
  updateToken,
  userId,
} from '../../configs/constants'
import { LogonResponse } from '../../configs/enps-interface'
import { Client } from './api'

// Return SessionID
export const logon = async () => {
  // const enpsHeader = new AxiosHeaders({
  //   'Content-Type': 'application/json',
  // })

  // const config: AxiosRequestConfig = {
  //   headers: enpsHeader,
  // }

  const logonBody = {
    staffUserId: userId,
    domainUserId: userId,
    password: password,
    domainName: domainName,
    devKey: devKey,
    iClientType: 8,
    deviceToken: '',
  }

  const logonResponse = await Client.post<LogonResponse>('/logon', logonBody)
    .then((response: AxiosResponse<LogonResponse, any>) => {
      // console.log('Logon data: ', response.data)
      console.info('Logon Status code: ', response.status)
      return response
    })
    .catch((err) => {
      console.error(err)
    })

  if (logonResponse) {
    updateToken(logonResponse.data.SessionID)
    return logonResponse.status
  } else {
    console.error('Something went wrong with the login.')
  }
}
