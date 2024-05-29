import { IEmployee } from "@/interface/employee"
import { create } from "zustand"
 
interface IEmployeeStore{
    employees: IEmployee[]
    setEmployee: (newEmployees:IEmployee[]) => void
    getEmployeeById: (id: number) => IEmployee | undefined
    createEmployee: (employee:IEmployee) => void
    updateEmployeeById: (id:number, updateEmployee: Partial<IEmployee>) => void
    deleteEmployeeById: (id:number) => void
}

export const useEmployeeStore = create<IEmployeeStore>((set,get) =>({
    employees:[],
    
    setEmployee: (newEmployees) => {
        set({employees:newEmployees})
      },
    
    getEmployeeById: (id) => {
        return get().employees.find((employee) => employee.id === id)
      },

    createEmployee: (employee) => {
        set((state)=>{return {employees:[...state.employees, employee]}})
    },

    updateEmployeeById: (id, updateEmployee) => {
        set((state) => ({
            employees: state.employees.map((employee) =>
            employee.id === id ? {...employee, ...updateEmployee} : employee 
                )
        }))
    },

    deleteEmployeeById: (id) => {
        set((state) => ({employees: state.employees.filter((employee) => employee.id !== id )}))
    } 
      
      

}))