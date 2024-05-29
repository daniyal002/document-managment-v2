import { Selector } from "@/components/UI/Select/Selector";
import { IProduct } from "@/interface/product";
import { useUnitStore } from "@/store/UnitStore/UnitStore";
import {Button, Input, InputProps, Modal, SelectProps, Typography } from "antd";
import { useEffect, useState } from "react";


interface Props{
  defaultValuesCount?:number
  defaultValuesUnit?:string
    type?:string
    isModalOpen:any
    handleOk:any
    handleCancel:any
    product:IProduct
}

export function SummaryOrderProductModal({isModalOpen, handleOk, handleCancel, product, type,defaultValuesCount,defaultValuesUnit}:Props){

if (!product) return null

  const unites = useUnitStore(state => state.unites)
  const newUnites = unites.filter(item=>item.product.id === product.id)
  const options = newUnites.map(item=>({
      value: item.name,
      label: item.name,
  })) 

  const [selectUnit, setSelectUnit] = useState<String>(options[0].value);
  const [enterCount, setEnterCount] = useState<Number>(1);


  useEffect(() => {
    if (defaultValuesUnit) {
      setSelectUnit(defaultValuesUnit);
    }
    if (defaultValuesCount) {
      setEnterCount(Number(defaultValuesCount));
    }
  }, [defaultValuesCount, defaultValuesUnit]);

  const onChangeSelect: SelectProps['onChange'] = (e:any) =>{
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
    setSelectUnit(options[0].value);
    setEnterCount(1);
  };

  return (
    <>
      
    <Modal title={`${type} товара: ${product.name}`} open={isModalOpen} onOk={()=>onOk()} onCancel={handleCancel}  footer={() => (
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
            <Selector onChange={onChangeSelect} optionArray={options} placeholder="Выберите единицу измерения" defaultValue={Number(selectUnit)}/>
        </div>
      </Modal>
    </>
  );
}