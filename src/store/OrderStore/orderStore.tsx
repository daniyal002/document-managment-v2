import { IOrderItem } from "@/interface/orderItem"
import { create } from "zustand"
import { useEmployeeStore } from "../EmployeeStore/EmployeeStore";
import { IProductTable } from "@/interface/productTable";
import { devtools, persist } from 'zustand/middleware'
import { IBasicUnit } from "@/interface/basicUnit";


interface IOrderStore  {
    orders: IOrderItem[],
    searchOrders:IOrderItem[],
    setSearchOrders:(array:IOrderItem[]) => void
    createNewOrder:(orderItem: IOrderItem) => void
    updateOrderById: (id: number, updatedOrder: Partial<IOrderItem>) => void;
    deleteOrderInTable: (id:number) => void | undefined
    getOrderById: (id:number) => IOrderItem | undefined

    setProductInOrder: (orderId:number, product:IProductTable) => void
    updateProductInOrder: (orderId:number,productId:number, updatedProduct: Partial<IProductTable>) => void
    deleteProductInOrder: (orderId:number,productId:number) => void
}


export const useOrderStore = create<IOrderStore>((set,get) => ({
    orders: [
      {
        id: 1,
        number: '1',
        date: "16.04.2024",
        status: 'Согласован',
        initiator:useEmployeeStore.getState().getEmployeeById(1),
        OMS:false,
        department:useEmployeeStore.getState().getEmployeeById(1)?.parlor?.department,
        parlor:useEmployeeStore.getState().getEmployeeById(1)?.parlor,
        productOrder:[
          {
          id: 1,
          product: {
              product_id: 1,
              name: "Товар 1",
              basicUnit: {
                  id: 1,
                  name: "шт",
                  fullName: "штука"
              }
          },
          unitProductTable: "уп",
          count: 10
      }
    ]
      },
      {
        id: 2,
        number: '2',
        date: "15.04.2024",
        status: 'Отклонен',
        initiator:useEmployeeStore.getState().getEmployeeById(2),
        OMS:false,
        department:useEmployeeStore.getState().getEmployeeById(2)?.parlor?.department,
        parlor:useEmployeeStore.getState().getEmployeeById(2)?.parlor,
        productOrder:[{
          id: 1,
          product: {
              id: 1,
              name: "Товар 1",
              basicUnit: {
                  id: 1,
                  name: "шт",
                  fullName: "штука"
              }
          },
          unitProductTable: "шт",
          count: 2
      },
      {
        id: 2,
        product: {
            id: 2,
            name: "Товар 2",
            basicUnit: {
                id: 1,
                name: "шт",
                fullName: "штука"
            }
        },
        unitProductTable: "шт",
        count: 10
    }]
      },
      {
        id: 3,
        number: '3',
        date: "13.04.2024",
        status: 'Отклонен',
        initiator:useEmployeeStore.getState().getEmployeeById(3),
        OMS:true,
        department:useEmployeeStore.getState().getEmployeeById(3)?.parlor?.department,
        parlor:useEmployeeStore.getState().getEmployeeById(3)?.parlor,
        productOrder:[{
          id: 1,
          product: {
              id: 3,
              name: "Товар 3",
              basicUnit: {
                  id: 1,
                  name: "шт",
                  fullName: "штука"
              }
          },
          unitProductTable: "шт",
          count: 7
      }]
      },
      {
        id: 4,
        number: '4',
        date: "13.04.2024",
        status: 'Отклонен',
        initiator:useEmployeeStore.getState().getEmployeeById(4),
        OMS:false,
        department:useEmployeeStore.getState().getEmployeeById(4)?.parlor?.department,
        parlor:useEmployeeStore.getState().getEmployeeById(4)?.parlor,
        productOrder:[{
          id: 1,
          product: {
              id: 1,
              name: "Товар 1",
              basicUnit: {
                  id: 1,
                  name: "шт",
                  fullName: "штука"
              }
          },
          unitProductTable: "шт",
          count: 10
      },
      {
        id: 2,
        product: {
            id: 4,
            name: "Товар 4",
            basicUnit: {
                id: 1,
                name: "шт",
                fullName: "штука"
            }
        },
        unitProductTable: "шт",
        count: 100
    }]
      },
      ],



    searchOrders:[],
      setSearchOrders: (array) => {
        set({searchOrders:array})
      },

    createNewOrder(orderItem: IOrderItem) {
      set((state) => {return {orders: [...state.orders, orderItem]}} )
      set((state) => {return {searchOrders: [...state.searchOrders, orderItem]}} )// Add the new order to the orders array
      // Add the new order to the orders array
    },

    updateOrderById: (id, updatedOrder) => {
      set((state) => ({
        orders: state.orders.map((order) =>
          order.id === id ? { ...order, ...updatedOrder } : order
        ),
        searchOrders: state.searchOrders.map((order) =>
          order.id === id ? { ...order, ...updatedOrder } : order
        ),
      }));
    },

    deleteOrderInTable: (id) => {
      set((state) => ({ orders: state.orders.filter((order) => order.id !== id) }))
      set((state) => ({ searchOrders: state.searchOrders.filter((order) => order.id !== id) }))
    },

    getOrderById: (id) => {
      return get().orders.find((order) => order.id === id)
    },

   
    setProductInOrder: (orderId, product) => {
      set((state)=>(
        {
          orders: state.orders.map((order) => order.id === orderId ? {
            ...order,
            productOrder:[...order.productOrder as IProductTable[], product]
          }:
          order,
        )
        }
      ))
    },

    updateProductInOrder:(orderId, productId,updatedProduct) => {
      set((state)=>(
        {
          orders: state.orders.map((order) => order.id === orderId ? {
            ...order,
            productOrder:order.productOrder?.map((product) => product.id === productId ? {
              ...product,
              count:updatedProduct.count as number,
              unitProductTable:updatedProduct.unitProductTable as IBasicUnit,
              doctorParlor:updatedProduct.doctorParlor
            }:product)
          }:
          order,
        )
        }
      ))
    },

    deleteProductInOrder:(orderId, productId,) => {
      set((state)=>(
        {
          orders: state.orders.map((order) => order.id === orderId ? {
            ...order,
            productOrder:order.productOrder?.filter((product) => product.id !== productId)
          }:
          order,
        )
        }
      ))
    } 
}))

