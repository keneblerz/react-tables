import axios, { AxiosHeaders } from 'axios'
import { token, url } from '../../configs/constants'

const enpsHeader = new AxiosHeaders({
  'Content-Type': 'application/json; charset=utf-8',
  'X-ENPS-TOKEN': String(token),
})

export const Client = axios.create({
  baseURL: url,
  timeout: 100000,
  headers: enpsHeader,
})
