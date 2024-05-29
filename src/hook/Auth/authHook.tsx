import { ILoginRequest } from "@/interface/auth";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/AuthStore/AuthStore";
import { useMutation } from "@tanstack/react-query";
import { IErrorResponse } from '@/interface/error';
import axios, { AxiosError } from 'axios';
import { message } from 'antd';

export const useLogin = (push:any) => {
    const setSuccessLoginMessage = useAuthStore(state => state.setSuccessLoginMessage)

    const {mutate, isSuccess, error} = useMutation({
        mutationKey:['login'],
        mutationFn:(data:ILoginRequest) => authService.login(data),
        onSuccess(data){
            setSuccessLoginMessage(data.data.detail)
            push("/")
        },
        onError(error:AxiosError<IErrorResponse>){
            message.error(error?.response?.data?.detail)
          }  
      })

      return {mutate,isSuccess,error}
};