import { IErrorResponse } from "@/interface/error";
import { IOrderItemRequest } from "@/interface/orderItem";
import { orderService } from "@/services/order.service";
import { useOrderStore } from "@/store/OrderStore/orderStore";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import axios, { AxiosError } from 'axios';


export const useCreateOrderMutation = () => {
    const createNewOrder = useOrderStore(state => state.createNewOrder)
    const {mutate} = useMutation({
        mutationKey:['createOrder'],
        mutationFn:(data:IOrderItemRequest) => orderService.addOrder(data),
        onSuccess(data){
            createNewOrder(data)
        },
        onError(error:AxiosError<IErrorResponse>){
          message.error(error?.response?.data?.detail)
        }   
    })
      return {mutate}
};