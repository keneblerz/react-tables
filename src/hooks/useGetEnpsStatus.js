import { useQuery } from 'react-query'
import axios from 'axios'
import { host } from '../configs/constants'

const getEnpsStatus = async () => {
  const { status } = await axios.get(`${host}/api/v1/ping`)
  return status
}

function useGetEnpsStatus() {
  return useQuery(['status'], () => getEnpsStatus())
}

export default useGetEnpsStatus
