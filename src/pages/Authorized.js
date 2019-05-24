import React from 'react';
import Redirect from 'umi/redirect';
import { Alert } from 'antd';
import pathToRegexp from 'path-to-regexp';
import { connect } from 'dva';
//@/utils/Authorized 其实就是相当于获取Authorized组件，但是中间过程还没弄明白
import Authorized from '@/utils/Authorized';
//authority是获取当前管理员有什么权限的函数
import { getAuthority } from '@/utils/authority';
import Exception403 from '@/pages/Exception/403';

function AuthComponent({ children, location, routerData }) {
  const auth = getAuthority();
  let isLogin = true;
  if(auth=='guest'){
    isLogin=false;
  }
  //getRouteAuthority 是获取当前管理员有什么权限的函数，但是不是缓存里面的，是dva的model里面的,他获取的应该是admin和user
  const getRouteAuthority = (path, routeData) => {
    let authorities;
    routeData.forEach(route => {
      // match prefix
      if (pathToRegexp(`${route.path}(.*)`).test(path)) {
        authorities = route.authority || authorities;

        // get children authority recursively
        if (route.routes) {
          authorities = getRouteAuthority(path, route.routes) || authorities;
        }
      }
    });
    return authorities;
  };
  return (
    <Authorized
      authority={auth}
      noMatch={isLogin ? <Alert message={auth} type="error" showIcon /> : <Redirect to="/user/login" />}
    >
      {children}
    </Authorized>
  );
}
export default connect(({ menu: menuModel }) => ({
  routerData: menuModel.routerData,
}))(AuthComponent);
