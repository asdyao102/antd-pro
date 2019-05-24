import RenderAuthorized from '@/components/Authorized'
import { Alert } from 'antd';
import { getAuthority } from '@/utils/authority';
import React from 'react'

export default function test1() {
  const Authorizedd = RenderAuthorized(['admin','user']);
  //可以确认auth 就是获取的目前缓存的权限名字  
  // authority= 里面的值为空的时候 是默认可以打开这个组件的
  const auth = getAuthority();
  const noMatch = <Alert message="No permission." type="error" showIcon />; 
  return (
    <div>
      <Authorizedd authority={auth} noMatch={noMatch}>
          {auth}
          <Alert message="user Passed!" type="success" showIcon />
      </Authorizedd>
    </div>
  )
}
