import { Selector } from "@/components/UI/Select/Selector";
import { IProduct, IProductUnit } from "@/interface/product";
import { useUnitStore } from "@/store/UnitStore/UnitStore";
import {Button, Input, InputProps, Modal, SelectProps, Typography } from "antd";
import { useEffect, useState } from "react";


interface Props{
  defaultValuesCount?:number
  defaultValuesUnit?:number
    type?:string
    isModalOpen:any
    handleOk:any
    handleCancel:any
    product:IProductUnit
}

export function OrderModal({isModalOpen, handleOk, handleCancel, product, type,defaultValuesCount,defaultValuesUnit}:Props){


  const options = product?.directory_unit_measurement?.map(item=>({
      value: item?.unit_measurement?.id,
      label: item?.unit_measurement?.name
  })) 

  const [selectUnit, setSelectUnit] = useState<number>();
  const [enterCount, setEnterCount] = useState<number>(1);


  useEffect(() => {
    if (defaultValuesUnit) {
      setSelectUnit(defaultValuesUnit);
    }
    if (defaultValuesCount) {
      setEnterCount(Number(defaultValuesCount));
    }
  }, [defaultValuesCount, defaultValuesUnit]);

  const onChangeSelect: SelectProps['onChange'] = (e) =>{
    setSelectUnit(e);
  }

  const onChangeInput:InputProps['onChange'] = (e) =>{
    if(Number(e.target.value) <= 0){
      setEnterCount(1)
    }else{
      setEnterCount(Number(e.target.value))
    }
  }
  
  const onOk = () => {
    handleOk(selectUnit, enterCount)
    setSelectUnit(undefined);
    setEnterCount(1);
  };

  return (
    <>
      
    <Modal title={`${type} товара: ${product?.product_name}`} open={isModalOpen} onOk={()=>onOk()} onCancel={handleCancel}  footer={(_) => (
          <>
            <Button onClick={()=>onOk()}>{type == "Изменение" ? "Изменить" : "Добавить" }</Button>
            <Button onClick={handleCancel}>Закрыть</Button>
          </>
        )}>
        <div>
            <Typography.Title level={5}>Количество</Typography.Title>
            <Input placeholder="Введите количество" type="number" onChange={onChangeInput} value={String(enterCount)} required min="1"/>
        </div>

        <div>
            <Typography.Title level={5}>Единица измерения</Typography.Title>
            <Selector onChange={onChangeSelect} optionArray={options} placeholder="Выберите единицу измерения" value={selectUnit ? selectUnit : null}/>
        </div>
      </Modal>
    </>
  );
}