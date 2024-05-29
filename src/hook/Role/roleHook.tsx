import { useMutation, useQuery } from '@tanstack/react-query';
import { roleService } from '@/services/role.service';
import { IRole } from '@/interface/role';
import { useRoleStore } from '@/store/RoleStore/RoleStore';
import { IErrorResponse } from '@/interface/error';
import axios, { AxiosError } from 'axios';
import { message } from 'antd';



export const useRoleData = () => {
  const { data: roleData, isLoading, error } = useQuery({queryKey:['newRoles'],queryFn:roleService.getRole});
  return {roleData, isLoading, error}
}

export const useCreateRoleMutation = () => {
    const createRole = useRoleStore(state => state.createRole)
    const {mutate} = useMutation({
        mutationKey:['createRole'],
        mutationFn:(data:IRole) => roleService.addRole(data),
        onSuccess(data){
          createRole(data.role)
        },
        onError(error:AxiosError<IErrorResponse>){
          message.error(error?.response?.data?.detail)
        }  
        })
      return {mutate}
};

export const useUpdateRoleMutation = () => {
  const updateRoleById = useRoleStore(state => state.updateRoleById)
    const {mutate} = useMutation({
        mutationKey:['updateRole'],
        mutationFn:(data:IRole) => roleService.updateRole(data),
        onSuccess(data, variables){
            updateRoleById(variables.id as number,variables)
        },
        onError(error:AxiosError<IErrorResponse>){
          message.error(error?.response?.data?.detail)
        }   
    })
    return {mutate}
};


export const useDeleteRoleMutation = () => {
  const deleteRoleById = useRoleStore(state => state.deleteRoleById)
  const {mutate} = useMutation({
      mutationKey:['deleteRole'],
      mutationFn:(data:IRole) => roleService.deleteRoleById(data),
      onSuccess(data, variables){
        deleteRoleById(variables.id as number);
      },
      onError(error:AxiosError<IErrorResponse>){
        message.error(error?.response?.data?.detail)
      }  
  })
    return {mutate}
};
