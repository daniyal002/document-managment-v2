import { IProduct } from "@/interface/product"
import { IProductTable } from "@/interface/productTable"
import { create } from "zustand"

interface IProductTableStore{
    productsInTable: IProductTable[]
    addProduct: (product:IProduct, unitProductTable:string, count:number) => void
    clearProductTable: () => void
    deleteProductInTable: (id:number) => void
    updateProductInTable: (id:number, newUnitProductTable:string, newCount:number) => void
}

export const useProductTableStore = create<IProductTableStore>((set,get)=>({
    productsInTable:[],
    addProduct: (product, unitProductTable, count) =>{
        const newId = get().productsInTable.length + 1;
        const newProductInTable = {id:newId, product: product, unitProductTable: unitProductTable, count:count}

        set({productsInTable:[...get().productsInTable, newProductInTable]})
    },
    clearProductTable() {
        set({productsInTable:[]})
    },

    deleteProductInTable: (id) => 
    set((state) => ({ productsInTable: state.productsInTable.filter((product) => product.id !== id) })),

    updateProductInTable: (id: number, newUnitProductTable: string, newCount: number) =>
    set((state) => ({
      productsInTable: state.productsInTable.map((product) =>
        product.id === id
          ? { ...product, unitProductTable: newUnitProductTable, count: newCount }
          : product
      ),
    })),
   
}))