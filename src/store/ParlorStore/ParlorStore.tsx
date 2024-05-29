import { IParlor } from "@/interface/parlor"
import { useDepartmentStore } from "../DepartmentStore/DepartmentStore"
import { create } from "zustand"


interface IParlorStore{
    parlors: IParlor[]
    setParlors: (newParlors:IParlor[]) => void
    getParlorById: (id: number) => IParlor | undefined
    createParlor: (parlor:IParlor) => void
    updateParlorById: (id:number, updateParlor: Partial<IParlor>) => void
    deleteParlorById: (id:number) => void

}

export const useParlorStore = create<IParlorStore>((set,get) =>({

  parlors:[],

  setParlors: (newParlors) => {
    set({parlors:newParlors})
  },

  getParlorById: (id) => {
    return get().parlors.find((parlor) => parlor.id === id)
  },

  createParlor: (parlor) => {
    set((state)=>{return {parlors:[...state.parlors, parlor]}})
  },

    updateParlorById: (id, updateParlor) => {
        set((state) => ({
          parlors: state.parlors.map((parlor) =>
            parlor.id === id ? {...parlor, ...updateParlor} : parlor 
                )
        }))
    },

    deleteParlorById: (id) => {
      set((state) => ({parlors: state.parlors.filter((parlor) => parlor.id !== id )}))
    } 

}))