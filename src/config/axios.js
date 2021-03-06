import axios from 'axios'
import localStorageService from '../services/localStorageService'

axios.defaults.baseURL = 'http://103.74.253.112:8000'
// axios.defaults.baseURL = 'http://localhost:8000'

axios.interceptors.request.use(
  (config) => {
    if (
      localStorageService.getToken() &&
      localStorageService.getToken().startsWith('{')
    )
      config.headers.Authorization = localStorageService.getToken()
    if (
      localStorageService.getToken() &&
      !localStorageService.getToken().startsWith('{')
    )
      config.headers.Authorization = `Bearer ${localStorageService.getToken()}`
    return config
  },
  (err) => Promise.reject(err)
)

axios.interceptors.response.use(
  (response) => response,
  (err) => {
    console.log(err)
    if (err.response.status === 401) {
      localStorageService.clearToken()
      window.location.assign('/')
      return
    }
    return Promise.reject(err)
  }
)

export default axios
