import { useQuery } from 'react-query'
import axios from 'axios'
import { host } from '../configs/constants'
import { ListResponse } from '../configs/enps-interface'

const getLists = async () => {
  const { data } = await axios.get<ListResponse>(`${host}/api/v1/list`)
  return data
}

function useGetLists() {
  return useQuery(['lists'], () => getLists())
}

export default useGetLists
