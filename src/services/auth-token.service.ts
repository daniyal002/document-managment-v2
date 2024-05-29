import Cookies from 'js-cookie'

export enum EnumTokens {
    'ACCESS_TOKEN' = 'access_token',
    'REFRESH_TOKEN' = 'refresh_token'
}

export const getAccessToken = () => {
    const access_token = Cookies.get(EnumTokens.ACCESS_TOKEN)
    return access_token || null
}

export const saveAccessToken = (access_token: string) => {
    Cookies.set(EnumTokens.ACCESS_TOKEN,access_token)
}

export const removeFromStorage = () => {
    Cookies.remove(EnumTokens.ACCESS_TOKEN)
}