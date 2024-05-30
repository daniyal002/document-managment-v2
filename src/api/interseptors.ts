import { getAccessToken, removeFromStorage } from '@/services/auth-token.service'
import axios, {type CreateAxiosDefaults} from 'axios'

const options:CreateAxiosDefaults = {
    baseURL:"http://192.168.30.194:8000",
    headers:{
        'Content-Type': 'application/json',
    },
    withCredentials:true
}

const axiosClassic = axios.create(options)

const axiosWidthAuth = axios.create(options)

axiosWidthAuth.interceptors.request.use(config => {
    const accessToken = getAccessToken()

    if(config?.headers && accessToken)
        config.headers.Authorization = `Bearer ${accessToken}`
    return config
})

axiosWidthAuth.interceptors.response.use(config => 
    config,
    async error => {
        if((error?.response?.status === 401 || error?.response?.status === 403||error?.response?.data.detail  === "Invalid token or expired token." || error?.code === "ERR_NETWORK")
             && error.config){
                    removeFromStorage()
                    return window.location.replace("/login")
            }
        throw error
    }
)

export {axiosClassic, axiosWidthAuth}