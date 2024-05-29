'use client'

import { AdminDataLoading } from "@/components/Admin/AdminDataLoading";
import { Button } from "antd";
import { usePathname, useRouter } from "next/navigation";
import style from './layout.module.scss'


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)

{
const {push} = useRouter()
const pathname = usePathname(); 
const isActive = (path: string) => pathname === path;
  return (
      <div className={style.admin}>
        <div className={style.adminButtons}>
        <Button onClick={()=>push('/admin/users')} type={isActive('/admin/users') ? 'primary' : 'default'}>Пользователи</Button>
        <Button onClick={()=>push('/admin/roles')} type={isActive('/admin/roles') ? 'primary' : 'default'}>Роли</Button>
        <Button onClick={()=>push('/admin/employees')} type={isActive('/admin/employees') ? 'primary' : 'default'}>Сотрудники</Button>
        <Button onClick={()=>push('/admin/parlors')} type={isActive('/admin/parlors') ? 'primary' : 'default'}>Кабинеты</Button>
        <Button onClick={()=>push('/admin/departments')} type={isActive('/admin/departments') ? 'primary' : 'default'}>Подразделение</Button>
        <Button onClick={()=>push('/admin/housings')} type={isActive('/admin/housings') ? 'primary' : 'default'}>Корпуса</Button>
        <Button onClick={()=>push('/admin/posts')} type={isActive('/admin/posts') ? 'primary' : 'default'}>Должности</Button>
        </div>
        <AdminDataLoading/>
        {children}
    </div>
  );
}
