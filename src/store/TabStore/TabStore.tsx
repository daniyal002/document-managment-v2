
import { OrderList } from "@/components/Order/OrderList/OrderList"
import { IOrderItem } from "@/interface/orderItem"
import { IProductTable } from "@/interface/productTable"
import { table } from "console"
import { create } from "zustand"

 interface ITabPane{
    label:string,
    children: React.ReactNode,
    key:string,
    productsInTable: IProductTable[]
    orders:IOrderItem[]
    
}

interface ITabStore  {
    tabs: ITabPane[],
    isNewTab:boolean,
    activeKey:string,
    createNewTab: (label:string, children: React.ReactNode,key:string, orders?:IOrderItem[], productsInTable?:IProductTable[]) => void
    deleteTab: (key:string) => void,
    editIsNewTab: (edit:boolean) => void,
    addProductToTable: (tableKey: string, product: IProductTable) => void
    pasteProductToTable: (tableKey: string, product: IProductTable[]) => void
    updateProductInTable: (tableKey: string, productKey: number, unitProductTable: number,count:number ) => void
    deleteProductFromTable: (tableKey: string, productKey: number) => void
    getTabByKey: (key: string) => ITabPane | undefined
    setActiveKey: (key: string) => void

    addOrderToTab: (tableKey:string, order:IOrderItem) => void
    updateOrderToTab: (tableKey:string, orderID:number, updateOrder:Partial<IOrderItem>) => void
    deleteOrderToTab: (tableKey:string, orderID:number) => void

    pasteOrderToTab: (tableKey:string, order: IOrderItem[]) => void
    addProductToOrder: (
      tableKey: string,
      orderId: number,
      product: IProductTable
    ) => void;
    updateProductInOrder: (
      tableKey: string,
      orderId: number,
      productKey: number,
      unitProductTable: number,
      count: number
    ) => void;
    deleteProductFromOrder: (
      tableKey: string,
      orderId: number,
      productKey: number
    ) => void;
}


export const useTabStore = create<ITabStore>((set, get) => ({
    tabs:[{ label: 'Список заявок', 
    children: <>
    <OrderList/>
    </>,
     key: '1', productsInTable:[],orders:[] }],

     isNewTab:false,

    activeKey:'1',

     
     createNewTab:(label, children, key,orders,productsInTable) => {
        const newTab = {label: label, children: children, key:key, orders:orders ? orders : [],productsInTable:productsInTable ? productsInTable : []}

        set({tabs:[...get().tabs, newTab]})
     },

     deleteTab: (key) => {
        set((state) => ({ tabs: state.tabs.filter((tab) => tab.key !== key) }))
        set({activeKey:'1'})},


    editIsNewTab: (edit) => {
        set({isNewTab:edit})
    },

    addProductToTable: (tableKey, product) => {
      set((state) => ({tabs: state.tabs.map((tab) =>            
        tab.key === tableKey ? { ...tab,productsInTable: [...(tab.productsInTable || []), product] 
        }: tab)        
      }))
    },

   

    pasteProductToTable: (tableKey, product) => {
      set((state) => ({tabs: state.tabs.map((tab) =>            
        tab.key === tableKey ? { ...tab,productsInTable: product 
        }: tab)        
      }))
    },

      updateProductInTable: (tableKey, productKey, unitProductTable, count ) => {
        set((state) => ({
          tabs: state.tabs.map((tab) =>
            tab.key === tableKey
              ? {
                  ...tab,
                  productsInTable: tab.productsInTable.map((product) =>
                    product.id === productKey ? {id:product.id, product:product.product, unitProductTable:unitProductTable, count:count} : product
                  ),
                }
              : tab
          )
        }))
      },
    
      deleteProductFromTable: (tableKey, productKey) => {
        set((state) => ({
          tabs: state.tabs.map((tab) =>
            tab.key === tableKey
              ? {
                  ...tab,
                  productsInTable: tab.productsInTable.filter((product) => product.id !== productKey),
                }
              : tab
          )
        }))
      },

      getTabByKey: (key) => {
        return get().tabs.find((tab) => tab.key === key)
      },

      setActiveKey: (key) =>{
        set({activeKey:key})
      },

      addOrderToTab:(tableKey,newOrder) => {
        set((state) => ({tabs: state.tabs.map((tab) => 
          tab.key === tableKey ? {...tab, orders:[...(tab.orders || []),newOrder]}:tab)
          }))
      },
  
  
      updateOrderToTab(tableKey, orderID, updateOrder) {
        set((state)=>({tabs: state.tabs.map((tab) => 
          tab.key === tableKey
            ? {
                ...tab,
                orders: tab.orders.map((order) =>
                  order.id === orderID ? { ...order, ...updateOrder } : order
                ),
              }
            : tab
        )}))
      },
  
      deleteOrderToTab(tableKey, orderID) {
        set((state) => ({
          tabs: state.tabs.map((tab) =>
            tab.key === tableKey
              ? {
                  ...tab,
                  orders: tab.orders.filter((order) => order.id !== orderID),
                }
              : tab
          )
        }))
      },

       // Реализация новых методов

       pasteOrderToTab: (tableKey, order) => {
        set((state) => ({tabs: state.tabs.map((tab) =>            
          tab.key === tableKey ? { ...tab, order: order 
          }: tab)        
        }))
      },
  addProductToOrder: (tableKey, orderId, product) => {
    set((state) => ({
      tabs: state.tabs.map((tab) =>
        tab.key === tableKey
          ? {
              ...tab,
              orders: tab.orders.map((order) =>
                order.id === orderId
                  ? {
                      ...order,
                      productOrder: [...order.productOrder, product],
                    }
                  : order
              ),
            }
          : tab
      ),
    }));
  },
  updateProductInOrder: (tableKey, orderId, productKey, unitProductTable, count) => {
    set((state) => ({
      tabs: state.tabs.map((tab) =>
        tab.key === tableKey
          ? {
              ...tab,
              orders: tab.orders.map((order) =>
                order.id === orderId
                  ? {
                      ...order,
                      productOrder: order.productOrder.map((product) =>
                        product.id === productKey
                          ? {
                              ...product,
                              unitProductTable,
                              count,
                            }
                          : product
                      ),
                    }
                  : order
              ),
            }
          : tab
      ),
    }));
  },
  deleteProductFromOrder: (tableKey, orderId, productKey) => {
    set((state) => ({
      tabs: state.tabs.map((tab) =>
        tab.key === tableKey
          ? {
              ...tab,
              orders: tab.orders.map((order) =>
                order.id === orderId
                  ? {
                      ...order,
                      productOrder: order.productOrder.filter(
                        (product) => product.id !== productKey
                      ),
                    }
                  : order
              ),
            }
          : tab
      ),
    }));
  },

}))