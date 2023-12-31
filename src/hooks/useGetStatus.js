import { useQuery } from 'react-query'
import axios from 'axios'
import { host } from '../configs/constants'

const getStatus = async (id) => {
  const { data } = await axios.get(`${host}/api/v1/status?id=${id}`)
  return data
}

function useGetStatus(id) {
  return useQuery(['status', id], () => getStatus(id))
}

export default useGetStatus
