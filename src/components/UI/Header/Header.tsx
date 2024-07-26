'use client'

import { HomeFilled, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import style from './Header.module.scss'
import { useAuthStore } from '@/store/AuthStore/AuthStore';
import { usePathname,useRouter } from 'next/navigation'
import { authService } from '@/services/auth.service';

export function Header(){

  const collapsed = useAuthStore(state => state.collapsed)
  const editCollapsed = useAuthStore(state => state.editCollapsed)
  const pathname = usePathname();
  const {push} = useRouter()

  if(pathname === '/login'){
    return null
  }

  const logout = () => {
    authService.logout()
    push('/login')
    
  }
    return(<>
    <header className={style.header}>
        <div className={style.headerLogo}>
            <span className={style.headerLogoText}>Доктор снабжение</span>
            {collapsed ? <MenuUnfoldOutlined onClick={()=>editCollapsed(false)} style={{fontSize:"24px", color:"#678098",cursor:"pointer"}}/> 
            :<MenuFoldOutlined onClick={()=>editCollapsed(true)} style={{fontSize:"24px", color:"#678098",cursor:"pointer"}}/>}
        </div>
        <div className={style.headerNav}>
            <div className={style.headerNavItem}>
            <HomeFilled style={{fontSize:"32px", color:"#678098",cursor:"pointer"}}/>
            <LogoutOutlined style={{fontSize:"32px", color:"#678098",cursor:"pointer"}} onClick={()=>logout()}/>
            </div>
        </div>
    </header>
    </>)
}