import { axiosWidthAuth } from "@/api/interseptors"
import { IOrderItem, IOrderItemRequest } from "@/interface/orderItem"

export const orderService = {
    // async getOrder (){
    //     const response = await axiosWidthAuth.get<IOrderItem>('/order/get_order')
    //     return response.data.detail
    // },

    async addOrder(data:IOrderItemRequest){
        const response = await axiosWidthAuth.post<IOrderItem>('order/add_order',data)
        return response.data
    },

    // async updateOrder(data:IOrderItemRequest){
    //     const response = await axiosWidthAuth.put<string>('order/update_order',data)
    //     return response.data
    // },

    // async deleteOrderById(data:IOrderItemRequest){
    //     const response = await axiosWidthAuth.delete<string>('order/delete_order',{data:data},)
    //     return response.data
    // }
}