import { useQuery } from 'react-query'
import axios from 'axios'
import { host } from '../configs/constants'

const getSubfolders = async () => {
  const { data } = await axios.get(`${host}/api/v1/subfolders`)
  return data
}

function useGetSubfolders() {
  return useQuery(['subfolders'], () => getSubfolders())
}

export default useGetSubfolders
