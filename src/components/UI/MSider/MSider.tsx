'use client'

import React, { useEffect, useState } from 'react';
import {OrderedListOutlined, UserSwitchOutlined, MenuFoldOutlined, MenuUnfoldOutlined, } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, ConfigProvider, Menu, theme } from 'antd';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/AuthStore/AuthStore';
import useMessage from 'antd/es/message/useMessage';
import Sider from 'antd/es/layout/Sider';
import style from './MSider.module.scss'


type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: 'Заявки',
    key: '/',
    icon: <OrderedListOutlined />,
  },
 
  {
    label: 'Админка',
    key: 'admin',
    icon: <UserSwitchOutlined />,
  },
];

export function MSider() {
  const successLoginMessage = useAuthStore(state => state.successLoginMessage)
  const [messageApi, contextHolder] = useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: successLoginMessage,
    });
  };

  useEffect(()=>
    {
      if(successLoginMessage !== "")
      success()
    },[successLoginMessage])
const {push} = useRouter()

  const [current, setCurrent] = useState('/');
  const collapsed = useAuthStore(state => state.collapsed)


  const onClick: MenuProps['onClick'] = (e) => {
      push(e.key)
      setCurrent(e.key);
  };
  return(
    <>
      {contextHolder}
      <ConfigProvider 
      theme={{
        components:{
          Menu:{
            itemColor:"rgba(65, 80, 95, 1)",
            itemHoverColor:"rgba(255, 255, 255,1)",
            itemHoverBg:"rgba(80, 111, 217,0.9)",
            itemSelectedBg:"rgba(80, 111, 217,0.9)",
            itemSelectedColor:"rgba(255, 255, 255,1)"
          }
        }
      }}> 
      <Sider trigger={null} collapsible collapsed={collapsed} className={collapsed ? style.sider : style.siderActive}>
        <div className={style.headerSider}>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={items}
          onClick={onClick}
          selectedKeys={[current]}
          className={style.headerMenu}
        />
      </div>
      </Sider>
      </ConfigProvider>
    </>
  ) 
};
