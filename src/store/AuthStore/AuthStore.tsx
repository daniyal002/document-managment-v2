import { create } from "zustand"

interface IAuthStore{
    successLoginMessage:string,
    setSuccessLoginMessage: (message:string) => void
}

export const useAuthStore = create<IAuthStore>((set,get)=>({
    successLoginMessage:"",

    setSuccessLoginMessage: (message:string) =>{
        set({successLoginMessage:message})
    },
}))