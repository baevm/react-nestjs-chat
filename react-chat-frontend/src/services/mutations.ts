import axiosFetch from '../utils/fetcher'

export const getUser = async () => {
  const res = await axiosFetch.get('/user')
  return res.data
}
