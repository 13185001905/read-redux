```javascript
import isPromise from './is-promise';
import { isFSA } from './flux-standard-action';


export default function promiseMiddleware({ dispatch }) {
  return next => action => {

    // 先判断接收的action是不是有 'type' || 'payload' || 'error' || 'meta' 这些方法
    // 如果都没有这些方法，再判断传入的action对象是不是promise,如果不是，dispatth(action)
    // 如果是promise, 执行promise.then()并传入dispatch，再在里面做完异步 -> dispatch(action)
    if (!isFSA(action)) {
      return isPromise(action) ? action.then(dispatch) : next(action);
    }

    // 如果判断是有  'type' || 'payload' || 'error' || 'meta'这些方法
    // 再接着判断 payload的值是不是promise
    // 如果payload值是promise，那么执行promise.then(),将返回的结果dispatch -> reducer
    // 异步发生错误的时候把错误发送到 reducer, 结束Promise执行;
    // 如果值不是promise，就正常dispatch();

    return isPromise(action.payload)
      ? action.payload
          .then(result => dispatch({ ...action, payload: result }))
          .catch(error => {
            dispatch({ ...action, payload: error, error: true });
            return Promise.reject(error);
          })
      : next(action);
  };
}


import promise from 'redux-promise';
applyMiddleware(promise);
/*
每一次传入中间件都先让中间件拿到 store的两个方法 dispatch getState
但是promise中间件第一次调用只接收一个dispatch


dispatch = compose(...chain)(store.dispatch)
然后再用compose串联起来 -> 是第二次调用，传入store.dispatch方法

*/

[a,b].reduce(function(a,b){
  return function()
})

```