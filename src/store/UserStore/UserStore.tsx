import { IUser } from "@/interface/user"
import { create } from "zustand"


interface IUserStore{
    users: IUser[]
    setUsers: (newUsers:IUser[]) => void
    getUserById: (id: number) => IUser | undefined
    createUser: (user:IUser) => void
    updateUserById: (id:number, updateUser: Partial<IUser>) => void
    deleteUserById: (id:number) => void
}


export const useUserStore = create<IUserStore>((set,get)=>({
    users:[],
    setUsers: (newUsers) =>{
        set({users:newUsers})
    },
    getUserById:(id) => {
        return get().users.find((user) => user.id === id)
    },

    createUser: (user) => {
        set((state)=>{return {users:[...state.users, user]}})
    },

    updateUserById: (id, updateUser) => {
        set((state) => ({
            users: state.users.map((user) =>
            user.id === id ? {...user, ...updateUser} : user 
                )
        }))
    },

    deleteUserById: (id) => {
        set((state) => ({users: state.users.filter((user) => user.id !== id )}))
    } 
      
}))