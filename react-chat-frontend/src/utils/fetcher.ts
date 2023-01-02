import axios, { AxiosInterceptorOptions, AxiosRequestConfig } from 'axios'

interface MyAxiosRequestConfig extends Omit<AxiosRequestConfig, 'headers'> {
  headers?: any // this was "any" at v0.21.1 but now broken between 0.21.4 >= 0.27.2
  // Lets make it any again to make it work again.
}

const axiosFetch = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

const refreshToken = async () => {
  return await axiosFetch.post('/auth/refresh')
}

axiosFetch.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (error.response.status === 401) {
      console.log(error)
      await refreshToken()
    }
  }
)

axiosFetch.interceptors.request.use(
  (config: MyAxiosRequestConfig) => {
    return config
  },
  async (error) => {}
)

export default axiosFetch
