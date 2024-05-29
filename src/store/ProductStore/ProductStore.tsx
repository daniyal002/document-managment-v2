import { IProduct } from "@/interface/product"
import { create } from "zustand"

interface IProductStore{
    products: IProduct[]
    searchProducts:IProduct[]
    setSearchProducts:(array:IProduct[]) => void
}

export const useProductStore = create<IProductStore>((set) =>({
    products:[
        {id:1, name:"Товар 1",basicUnit:{id:1,name:"шт",fullName:"штука"}},
        {id:2, name:"Товар 2",basicUnit:{id:2,name:"уп",fullName:"упаковка"}},
        {id:3, name:"Товар 3",basicUnit:{id:2,name:"уп",fullName:"упаковка"}},
        {id:4, name:"Товар 4",basicUnit:{id:3,name:"ящ",fullName:"ящик"}},
    ],
    searchProducts:[],
    setSearchProducts(array) {
        set({searchProducts:array})
    },
}))