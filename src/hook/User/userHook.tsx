import { useMutation, useQuery } from '@tanstack/react-query';
import { userService } from '@/services/user.service';
import { IUser } from '@/interface/user';
import { useUserStore } from '@/store/UserStore/UserStore';
import { message } from 'antd';
import axios, { AxiosError } from 'axios';
import { IErrorResponse } from '@/interface/error';

export const useUserData = () => {
  const { data: userData, isLoading, error } = useQuery({queryKey:['newUser'],queryFn:userService.getUser});
  return {userData, isLoading, error}
}

export const useCreateUserMutation = () => {
    const createUser = useUserStore((state) => state.createUser);
    const { mutate,error } = useMutation({
        mutationKey: ['createUser'],
        mutationFn:(data:IUser) => userService.addUser({login:data.login,password:data.password,employee_id:data.employee.id as number, role_id:data.role?.id as number}),
        onSuccess: (data) => {
            createUser(data.user); // теперь есть доступ к 'data'
        },
        onError(error:AxiosError<IErrorResponse>){
          message.error(error?.response?.data?.detail)
        }
    });
    return { mutate,error };
};

export const useUpdateUserMutation = () => {
  const updateUserById = useUserStore((state) => state.updateUserById);

    const {mutate} = useMutation({
        mutationKey:['updateUser'],
        mutationFn:(data:IUser) => userService.updateUser({id:data.id,login:data.login,password:data.password,employee_id:data.employee.id as number, role_id:data.role?.id as number}),
    onSuccess(data, variables){
      updateUserById(variables.id as number,variables)
    },
    onError(error:AxiosError<IErrorResponse>){
      message.error(error?.response?.data?.detail)
    }
    })
      return {mutate}
};


export const useDeleteUserMutation = () => {
  const deleteUserById = useUserStore((state) => state.deleteUserById);
  
  const {mutate} = useMutation({
      mutationKey:['deleteUser'],
      mutationFn:(data:IUser) => userService.deleteUserById({id:data.id,login:data.login,password:data.password,employee_id:data.employee.id as number, role_id:data.role?.id as number}),
  onSuccess(data, variables){
    deleteUserById(variables.id as number)
  },
  onError(error:AxiosError<IErrorResponse>){
    message.error(error?.response?.data?.detail)
  }  
  })
    return {mutate}
};
