import RenderAuthorize from '@/components/Authorized';
import { getAuthority } from './authority';

let Authorized = RenderAuthorize('admin'); // eslint-disable-line

// Reload the rights component

//reloadAuthorized这个函数实则就是登陆之后再次将Authorized设置一下权限，这里就直接设成admin了，之前是用什么账号登录，就设成什么权限，用的getAuthority获取的
const reloadAuthorized = () => {
  Authorized = RenderAuthorize('admin');
};

export { reloadAuthorized };
export default Authorized;
