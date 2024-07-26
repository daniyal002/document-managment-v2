import { useMutation, useQuery } from '@tanstack/react-query';
import { employeeService } from '@/services/employee.service';
import { IEmployee } from '@/interface/employee';
import { useEmployeeStore } from '@/store/EmployeeStore/EmployeeStore';
import { IErrorResponse } from '@/interface/error';
import axios, { AxiosError } from 'axios';
import { message } from 'antd';

export const useEmployeeData = () => {
  const { data: employeeData, isLoading, error } = useQuery({queryKey:['newEmployee'],queryFn:employeeService.getEmployee});
  return {employeeData, isLoading, error}
}

export const useCreateEmployeeMutation = () => {
    const createEmployee = useEmployeeStore(state => state.createEmployee)
    const {mutate} = useMutation({
        mutationKey:['createEmployee'],
        mutationFn:(data:IEmployee) => {
          const parlorIds: number[] = []
            data.parlor?.forEach(item=>{
                parlorIds.push(item.id as number)
            })
          return employeeService.addEmployee({employee:{buyer_name:data.buyer_name,buyer_type:data.buyer_type,post_id:data.post.id as number},parlor_ids:parlorIds})
        },
        onSuccess(data){
          createEmployee(data.employee)
        },
        onError(error:AxiosError<IErrorResponse>){
          message.error(error?.response?.data?.detail)
        }    
    })
      return {mutate}
};

export const useUpdateEmployeeMutation = () => {
  const updateEmployeeById = useEmployeeStore(state => state.updateEmployeeById)

    const {mutate} = useMutation({
        mutationKey:['updateEmployee'],
        mutationFn:(data:IEmployee) => 
          {
            const parlorIds: number[] = []
            data.parlor?.forEach(item=>{
                parlorIds.push(item.id as number)
            })
          return employeeService.updateEmployee({employee:{id:data.id,buyer_name:data.buyer_name,buyer_type:data.buyer_type,post_id:data.post.id as number},parlor_ids:parlorIds})
        },
        onSuccess(data, variables){
          updateEmployeeById(variables.id as number,variables)
        },
        onError(error:AxiosError<IErrorResponse>){
          message.error(error?.response?.data?.detail)
        }    
    })
      return {mutate}
};


export const useDeleteEmployeeMutation = () => {
  const deleteEmployeeById = useEmployeeStore(state => state.deleteEmployeeById)

  const {mutate} = useMutation({
      mutationKey:['deleteEmployee'],
      mutationFn:(data:IEmployee) => employeeService.deleteEmployeeById(data),
      onSuccess(data, variables){
        deleteEmployeeById(variables.id as number)
      },
      onError(error:AxiosError<IErrorResponse>){
        message.error(error?.response?.data?.detail)
      }    
  })
    return {mutate}
};
