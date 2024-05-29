import { axiosClassic, axiosWidthAuth } from "@/api/interseptors";
import { ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse } from "@/interface/auth";
import { removeFromStorage, saveAccessToken } from "./auth-token.service";
 
export const authService = {
    async login (body:ILoginRequest){
        const response = await axiosClassic.post<ILoginResponse>('/auth/login',body)

        if(response.data.access_token){
            saveAccessToken(response.data.access_token)
        }

        return response
    },


    async logout(){
        await axiosWidthAuth.post('/logout')
        removeFromStorage()
    }

} 