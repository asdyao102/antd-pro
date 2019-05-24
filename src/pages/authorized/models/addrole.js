async function addrole2({rolename,action}){
    const res=await axios.post('http://192.168.1.162:8080/addrole',{
      name:rolename,
      action
    });
    console.log(res);
    return 1;
}
export default {
    namespace: 'role',
  
    state: {
      count:1,
      succ:false
    },
  
    effects: {
      *addrole3(action,{call,put}){
        // const response = yield call(addrole2,action);
        yield put({type:'addcount'})
      }
    },
  
    reducers: {
      addcount(){
          return {
            succ:true
          }
      }
    },
  };
  