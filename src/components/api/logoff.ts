import { Client } from './api'

export const logoff = async () => {
  // const enpsHeader = new AxiosHeaders({
  //   'Content-Type': 'application/json',
  //   'X-ENPS-TOKEN': String(token),
  // })

  // const config: AxiosRequestConfig = {
  //   headers: enpsHeader,
  // }

  const logoffResponse = await Client.get('/logout')
    .then((response) => {
      console.error('LOGOUT Status code: ', response.status)
      return response.status
    })
    .catch((err) => console.error(err))

  if (logoffResponse) return logoffResponse
}
