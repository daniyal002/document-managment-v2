import { IHousing } from "@/interface/housing"
import { create } from "zustand"

interface IHousingStore{
    housings: IHousing[],
    setHousings: (newHousings:IHousing[]) => void
    getHousingById: (id: number) => IHousing | undefined
    createHousing: (Housing:IHousing) => void
    updateHousingById: (id:number, updateHousing: Partial<IHousing>) => void
    deleteHousingById: (id:number) => void
}
 
export const useHousingStore = create<IHousingStore>((set,get)=>({
    housings:[],

    setHousings: (newHousings) =>{
        set({housings:newHousings})
    },

    getHousingById: (id) => {
        return get().housings.find((housing)=>housing.id === id)
    },

    createHousing: (housing) => {
        set((state)=>{return {housings:[...state.housings, housing]}})
    },

    updateHousingById: (id, updateHousing) => {
        set((state) => ({
            housings: state.housings.map((housing) =>
                housing.id === id ? {...housing, ...updateHousing} : housing 
                )
        }));
    },

    deleteHousingById: (id) => {
        set((state) => ({housings: state.housings.filter((housing) => housing.id !== id )}))
    }
}))