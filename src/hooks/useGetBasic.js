import { useQuery } from 'react-query'
import axios from 'axios'
import { host } from '../configs/constants'

const getBasics = async (path, guid) => {
  const { data } = await axios.get(`${host}/api/v1/content/${path}/${guid}`)
  return data
}

function useGetBasics() {
  return useQuery(['basic'], () => getBasics())
}

export default useGetBasics
