import { IFloor } from "@/interface/floor"
import { create } from "zustand"

interface IFloorStore{
    floors: IFloor[],
    setFloors: (newFloor:IFloor[]) => void
    getFloorById: (id: number) => IFloor | undefined
   
}
 
export const useFloorStore = create<IFloorStore>((set,get)=>({
    floors:[],

    setFloors: (newFloor) =>{
        set({floors:newFloor})
    },

    getFloorById: (id) => {
        return get().floors.find((floor)=>floor.id === id)
    },

}))