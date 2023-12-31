import { useQuery } from 'react-query'
import axios from 'axios'
import { host } from '../configs/constants'

// Should set the "data" here to be of type RundownData?
const getRundown = async (id) => {
  const { data } = await axios.get(`${host}/api/v1/rundown/${id}`)
  return JSON.parse(data)
}

function useGetRundown(id) {
  return useQuery(['rundown', id], () => getRundown(id))
}

export default useGetRundown
