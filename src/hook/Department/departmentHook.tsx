import { useMutation, useQuery } from '@tanstack/react-query';
import { departmentService } from '@/services/department.service';
import { IDepartment } from '@/interface/department';
import { useDepartmentStore } from '@/store/DepartmentStore/DepartmentStore';
import { IErrorResponse } from '@/interface/error';
import axios, { AxiosError } from 'axios';
import { message } from 'antd';

export const useDepartmentData = () => {
  const { data: departmentData, isLoading, error } = useQuery({queryKey:['newDepartment'],queryFn:departmentService.getDepartment});
  return {departmentData, isLoading, error}
}

export const useCreateDepartmentMutation = () => {
  const createDepartment = useDepartmentStore((state) => state.createDepartment);

    const {mutate} = useMutation({
        mutationKey:['createDepartment'],
        mutationFn:(data:IDepartment) => departmentService.addDepartment({department_name:data.department_name, housing_id:data.housing?.id as number}),
        onSuccess(data){
          createDepartment(data.department)
        },
        onError(error:AxiosError<IErrorResponse>){
          message.error(error?.response?.data?.detail)
        }    
    })
      return {mutate}
};

export const useUpdateDepartmentMutation = () => {
  const updateDepartmentById = useDepartmentStore((state) => state.updateDepartmentById);

    const {mutate} = useMutation({
        mutationKey:['updateDepartment'],
        mutationFn:(data:IDepartment) => departmentService.updateDepartment({id:data.id, department_name:data.department_name,housing_id:data.housing?.id as number}),
        onSuccess(data, variables){
          updateDepartmentById(variables.id as number,variables);
        },
        onError(error:AxiosError<IErrorResponse>){
          message.error(error?.response?.data?.detail)
        }   
    })
      return {mutate}
};


export const useDeleteDepartmentMutation = () => {
  const deleteDepartmentById = useDepartmentStore((state) => state.deleteDepartmentById);

  const {mutate} = useMutation({
      mutationKey:['deleteDepartment'],
      mutationFn:(data:IDepartment) => departmentService.deleteDepartmentById({id:data.id, department_name:data.department_name,housing_id:data.housing?.id as number}),
      onSuccess(data, variables){
        deleteDepartmentById(variables.id as number)
      },
      onError(error:AxiosError<IErrorResponse>){
        message.error(error?.response?.data?.detail)
      }  
  })
    return {mutate}
};
