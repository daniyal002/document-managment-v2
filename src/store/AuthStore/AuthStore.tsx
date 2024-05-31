import { create } from "zustand"

interface IAuthStore{
    successLoginMessage:string,
    setSuccessLoginMessage: (message:string) => void
    collapsed:boolean,
    editCollapsed: (edit:boolean) => void
}

export const useAuthStore = create<IAuthStore>((set,get)=>({
    successLoginMessage:"",
    collapsed:false,
    setSuccessLoginMessage: (message:string) =>{
        set({successLoginMessage:message})
    },
    editCollapsed: (edit) => {
        set({collapsed:edit})
    },
}))