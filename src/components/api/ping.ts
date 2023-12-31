import { Client } from './api'

export const ping = async () => {
  // const enpsHeader = new AxiosHeaders({
  //   'Content-Type': 'application/json',
  //   'X-ENPS-TOKEN': String(token),
  // })

  // const config: AxiosRequestConfig = {
  //   headers: enpsHeader,
  // }

  const pingResponse = await Client.get('/Ping')
    .then((response) => {
      console.log('Ping Status code: ', response.status)
      return response.status
    })
    .catch((err) => console.error(err))

  if (pingResponse) {
    return pingResponse
  }
}
