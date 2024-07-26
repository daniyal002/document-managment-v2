import { Button, Space, Table } from "antd"
import { AddDoctor } from "../AddDoctor/AddDoctor"
import style from './DoctorParlorTable.module.scss'
import { useEffect, useState } from "react"
import { IDoctorParlor } from "@/interface/employee"
import { useTabStore } from "@/store/TabStore/TabStore"

interface dataSource{
    key: number
}

interface Props{
    arrayTable:dataSource[]
    deleleItemTable:any
    keyTab:string
}

export function DoctorParlorTable({arrayTable,deleleItemTable,keyTab}:Props){
    const [doctorParlor, setDoctorParlor] = useState<IDoctorParlor[]>([])
    const addDoctorToProduct = useTabStore(state => state.addDoctorToProduct)
    const getTabByKey = useTabStore(state => state.getTabByKey(keyTab))

    useEffect(()=>{
        console.log(doctorParlor)
        // addDoctorToProduct(keyTab, getTabByKey?.orders[0].)
        console.log(getTabByKey)
    },[doctorParlor])
    

    const columns = [
        {
            title: 'Врач и кабинет',
            dataIndex: 'doctor',
            key: 'doctor',
            render:(_:any,record:dataSource) => (
              <div className={style.doctorParlorTableColumn}>
                <AddDoctor doctorParlor={doctorParlor} setDoctorParlor={setDoctorParlor}/>
                <Button danger onClick={() => {console.log(record);deleleItemTable(record.key)}}>Удалить</Button>
              </div>)
          },
          
    ]

    return(
        <Table columns={columns} dataSource={arrayTable}/>
    )
}