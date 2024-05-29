'use client'

import React, { useEffect, useState } from 'react';
import {OrderedListOutlined, UserSwitchOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/AuthStore/AuthStore';
import useMessage from 'antd/es/message/useMessage';


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

export function Header() {
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

  const onClick: MenuProps['onClick'] = (e) => {
    push(e.key)
    setCurrent(e.key);
  };

  return(
    <>
      {contextHolder}
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
    </>
  ) 
};
