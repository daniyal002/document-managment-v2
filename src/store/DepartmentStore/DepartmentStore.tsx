import { IDepartment } from "@/interface/department"
import { create } from "zustand"

interface IDepartmentStoreStore{
    departments: IDepartment[]
    setDepartments: (newDepartments:IDepartment[]) => void
    getDepartmentById: (id: number) => IDepartment | undefined
    createDepartment: (department:IDepartment) => void
    updateDepartmentById: (id:number, updateDepartment: Partial<IDepartment>) => void
    deleteDepartmentById: (id:number) => void

}

export const useDepartmentStore = create<IDepartmentStoreStore>((set,get) =>({
    departments:[],

    setDepartments: (newDepartments) => {
        set({departments:newDepartments})
    },

    getDepartmentById: (id) => {
        return get().departments.find((department) => department.id === id)
    },

    createDepartment: (department) => {
        set((state)=>{return {departments:[...state.departments, department]}})
    },

    updateDepartmentById: (id, updateDepartment) => {
        set((state) => ({
            departments: state.departments.map((department) =>
                department.id === id ? {...department, ...updateDepartment} : department 
                )
        }))
    },

    deleteDepartmentById: (id) => {
        set((state) => ({departments: state.departments.filter((department) => department.id !== id )}))
    }

    

}))