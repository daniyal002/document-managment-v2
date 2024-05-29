import { axiosWidthAuth } from "@/api/interseptors"
import { IUser, IUserRequest, IUserAddResponse, IUserResponse } from "@/interface/user"

export const userService = {
    async getUser (){
        const response = await axiosWidthAuth.get<IUserResponse>('/user/get_user')
        return response.data.detail
    },

    async addUser(data:IUserRequest){
        const response = await axiosWidthAuth.post<IUserAddResponse>('user/add_user',data)
        return response.data
    },

    async updateUser(data:IUserRequest){
        const response = await axiosWidthAuth.put<string>('user/update_user',data)
        return response.data
    },

    async deleteUserById(data:IUserRequest){
        const response = await axiosWidthAuth.delete<string>('user/delete_user',{data:data},)
        return response.data
    }
}