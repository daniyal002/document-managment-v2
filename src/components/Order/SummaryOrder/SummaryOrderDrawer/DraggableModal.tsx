import React, { useRef, useState } from 'react';
import { Button, Modal, Table } from 'antd';
import type { DraggableData, DraggableEvent } from 'react-draggable';
import Draggable from 'react-draggable';
import { FullscreenOutlined } from '@ant-design/icons';
import style from './DraggableModal.module.scss'
import { useProductStore } from '@/store/ProductStore/ProductStore';
import { IProduct } from '@/interface/product';
import { useTabStore } from '@/store/TabStore/TabStore';
import { SummaryOrderProductModal } from '../SummaryOrderModal/SummaryOrderProductModal';


interface Props{
  open:boolean,
  handleOk:any,
  handleCancel:any,
  keyTab:string,
  orderID:number
}

export function DraggableModal({open,handleOk,handleCancel,keyTab,orderID}:Props){
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
  const draggleRef = useRef<HTMLDivElement>(null);
  const [fullScreen,setFullScreen] = useState<boolean>(false)
  const product = useProductStore(state => state.products)
  const thisTab = useTabStore(state => state.getTabByKey(keyTab))
  const addProductToOrder = useTabStore(state => state.addProductToOrder)
  const [productWhenDoubleClick, setProductWhenDoubleClick] = useState<IProduct>()
  const [isSummaryOrderModalOpen, setIsSummaryOrderModalOpen] = useState(false);

  const showModalSummaryOrderModal = () => {
    setIsSummaryOrderModalOpen(true);
  };

  const handleOkSummaryOrderModal = (unitProductTable:string, count:number) => {
    setIsSummaryOrderModalOpen(false);
    const newIdProductInTable = thisTab?.orders[orderID - 1].productOrder ? thisTab?.orders[orderID - 1].productOrder.length + 1 : 1; 
    addProductToOrder(keyTab,orderID,{id:newIdProductInTable,product:productWhenDoubleClick as IProduct, unitProductTable:unitProductTable,count:count})
  };

  const handleCancelSummaryOrderModal = () => {
    setIsSummaryOrderModalOpen(false);
  };

 

  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  const columns = [
    {
      title: 'Товар',
      dataIndex: 'name',
      key: 'name',
      sorter: {
        compare: (a:any, b:any) => a.name.localeCompare(b.product, 'ru'),
      },
    },
];
  
  return (
    <>
      <Modal
        title={
          <div
            style={{
              width: '100%',
              cursor: 'move',
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            // fix eslintjsx-a11y/mouse-events-have-key-events
            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
            onFocus={() => {}}
            onBlur={() => {}}
            // end
          >
            <Button id={style.fullscreenOutlined} onClick={()=>setFullScreen(!fullScreen)}><FullscreenOutlined /></Button>
            Каталог
          </div>
        }
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        width={fullScreen ? "100%" : "50%" }
        modalRender={(modal) => (
          <div className={style.draggableModal}>
          <Draggable
            disabled={disabled}
            bounds={bounds}
            nodeRef={draggleRef}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
          </div>
        )}
      >
        <SummaryOrderProductModal handleCancel={handleCancelSummaryOrderModal} handleOk={handleOkSummaryOrderModal} isModalOpen={isSummaryOrderModalOpen} product={productWhenDoubleClick as IProduct} type="Добавление"/>

        <Table 
          dataSource={product} 
          columns={columns} 
          pagination={{ pageSize: 20}}
          onRow={(record:IProduct)=>({onDoubleClick: () => {setProductWhenDoubleClick(record);showModalSummaryOrderModal()} })}
        />
      </Modal>
    </>
  );
};
