import { IProductUnit } from "@/interface/product"
import { create } from "zustand"

interface IProductStore{
    products: IProductUnit[]
    setProducts: (newProductUnit:IProductUnit[]) => void
    searchProducts:IProductUnit[]
    setSearchProducts:(array:IProductUnit[]) => void
}

export const useProductStore = create<IProductStore>((set) =>({
    products:[],
    setProducts(newProductUnit){
        set({products:newProductUnit})
    },
    searchProducts:[],
    setSearchProducts(array) {
        set({searchProducts:array})
    },
}))