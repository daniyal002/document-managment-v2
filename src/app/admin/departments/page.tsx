'use client'

import { AdminDepartment } from '@/components/Admin/Department/AdminDepartment'
import style from './page.module.scss'

export default function Department(){
    return(
        <div className={style.department}>
            <AdminDepartment/>
        </div>
    )
}