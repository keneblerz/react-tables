import { useQuery } from 'react-query'
import axios from 'axios'
import { host } from '../configs/constants'

const getTables = async () => {
  const { data } = await axios.get(`${host}/api/v1/tables`)
  return JSON.parse(data)
}

function useGetTables() {
  return useQuery(['tables'], () => getTables())
}

export default useGetTables
