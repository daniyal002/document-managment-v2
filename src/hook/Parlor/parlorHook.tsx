import { useMutation, useQuery } from '@tanstack/react-query';
import { parlorService } from '@/services/parlor.service';
import { IParlor } from '@/interface/parlor';
import { useParlorStore } from '@/store/ParlorStore/ParlorStore';
import { IErrorResponse } from '@/interface/error';
import axios, { AxiosError } from 'axios';
import { message } from 'antd';

export const useParlorData = () => {
  const { data: parlorData, isLoading, error } = useQuery({queryKey:['newParlor'],queryFn:parlorService.getParlor});
  return {parlorData, isLoading, error}
}

export const useCreateParlorMutation = () => {
  const createParlor = useParlorStore((state) => state.createParlor);

    const {mutate} = useMutation({
        mutationKey:['createParlor'],
        mutationFn:(data:IParlor) => parlorService.addParlor({parlor_name:data.parlor_name, department_id:data.department?.id as number, floor_id:data.floor?.id as number}),
        onSuccess(data){
          createParlor(data.parlor)
        },
        onError(error:AxiosError<IErrorResponse>){
          message.error(error?.response?.data?.detail)
        }    
    })
      return {mutate}
};

export const useUpdateParlorMutation = () => {
  const updateParlorById = useParlorStore((state) => state.updateParlorById);
    
    const {mutate} = useMutation({
        mutationKey:['updateParlor'],
        mutationFn:(data:IParlor) => parlorService.updateParlor({id:data.id,parlor_name:data.parlor_name, department_id:data.department?.id as number, floor_id:data.floor?.id as number}),
        onSuccess(data, variables){
          updateParlorById(variables.id as number,variables)
        },
        onError(error:AxiosError<IErrorResponse>){
          message.error(error?.response?.data?.detail)
        }    
    })
      return {mutate}
};


export const useDeleteParlorMutation = () => {
  const deleteParlorById = useParlorStore((state) => state.deleteParlorById);

  const {mutate} = useMutation({
      mutationKey:['deleteParlor'],
      mutationFn:(data:IParlor) => parlorService.deleteParlorById({id:data.id,parlor_name:data.parlor_name, department_id:data.department?.id as number, floor_id:data.floor?.id as number}),
      onSuccess(data, variables){
        deleteParlorById(variables.id as number)
      },
      onError(error:AxiosError<IErrorResponse>){
        message.error(error?.response?.data?.detail)
      }    
  })
    return {mutate}
};
