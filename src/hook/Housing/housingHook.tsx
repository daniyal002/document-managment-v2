import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { housingService } from '@/services/housing.service';
import { IHousing } from '@/interface/housing';
import { useHousingStore } from '@/store/HousingStore/HousingStore';
import { IErrorResponse } from '@/interface/error';
import axios, { AxiosError } from 'axios';
import { message } from 'antd';

export const useHousingData = () => {
  const { data: housingsData, isLoading, error } = useQuery({queryKey:['newHousings'],queryFn:housingService.getHousing});
  return {housingsData, isLoading, error}
}

export const useCreateHousingMutation = () => {
    const createHousing = useHousingStore(state => state.createHousing)
    const {mutate} = useMutation({
        mutationKey:['createHousing'],
        mutationFn:(data:IHousing) => housingService.addHousing(data.housing_name),
        onSuccess(data){
          createHousing(data.housing)
        },
        onError(error:AxiosError<IErrorResponse>){
          message.error(error?.response?.data?.detail)
        }   
    })
      return {mutate}
};

export const useUpdateHousingMutation = () => {
  const updateHousingById = useHousingStore((state) => state.updateHousingById);

    const {mutate} = useMutation({
        mutationKey:['updateHousing'],
        mutationFn:(data:IHousing) => housingService.updateHousing(data),
        onSuccess(data, variables){
          updateHousingById(variables.id as number,variables)
        },
        onError(error:AxiosError<IErrorResponse>){
          message.error(error?.response?.data?.detail)
        }    
    })
      return {mutate}
};


export const useDeleteHousingMutation = () => {
  const deleteHousingById = useHousingStore((state) => state.deleteHousingById);

  const {mutate} = useMutation({
      mutationKey:['deleteHousing'],
      mutationFn:(data:IHousing) => housingService.deleteHousingById(data),
      onSuccess(data, variables){
        deleteHousingById(variables.id as number)
      },
      onError(error:AxiosError<IErrorResponse>){
        message.error(error?.response?.data?.detail)
      }    
  })
    return {mutate}
};
