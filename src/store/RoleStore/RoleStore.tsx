import { IRole } from "@/interface/role";
import { create } from "zustand";

interface IRoleStore {
    roles:IRole[]
    setRoles: (newRoles:IRole[]) => void
    getRoleById: (id: number) => IRole | undefined
    createRole: (role:IRole) => void
    updateRoleById: (id:number, updateRole: Partial<IRole>) => void
    deleteRoleById: (id:number) => void
}

export const useRoleStore = create<IRoleStore>((set,get)=>({
    roles:[],

    setRoles: (newRoles) =>{
        set({roles:newRoles})
    },

    getRoleById: (id) => {
        return get().roles.find((role) => role.id === id)
    },

    createRole(role) {
        set((state) => {return{roles:[...state.roles,role]}})
    },

    updateRoleById(id, updateRole) {
        set((state)=> ({
            roles: state.roles.map((role) => 
                role.id === id ? {...role, ...updateRole} : role
            )
        }))
    },

    deleteRoleById(id) {
        set((state) => ({roles:state.roles.filter((role)=>role.id !== id)}))
    },

    
}))