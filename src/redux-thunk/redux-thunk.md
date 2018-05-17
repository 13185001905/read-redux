```javascript

function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    // 判断action是不是一个函数就代表 dispatch是否可以接收一个函数作为参数了
    // 如果是一个函数的话，就把dispatch传入这个函数，在函数内部进行处理，
    // 处理完毕最后再dispatch action 到reducer 做后面的处理
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }
    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;


// ----------------------------------------------------------------------------------------------
// 自己写一个能打印的中间件

//中间件是三阶函数
// 第一次是在redux内部的compose拿到 dispatch和getStore  得到二阶函数
// dispatch = compose(...chain)(store.dispatch)
// 第二次调用是咋compose进行串联的时候，参数next代表传入的 store.dispatch，得到一阶函数
// store.dispatch = 这个一阶函数(增强dispatch的功能也就是在一阶函数里写代码)
// 这时就增强了dispatch的作用了
export const  consoleLog() {
  return ({dispatch, getStore}) => next => action => {
    console.log(1);
    nect(dispatch);
    console.log(2);
  }
}

// ----------------------------------------------------------------------------------------------

// next就是 store.dispatch()
const thunk = ({ dispatch, getState }) => {
  return function(next) {
    return function(action) {
      if (typeof action === 'function') {
        return action(ispatch, getState)
      }
      return next(action)
    }
  }
}
applyMiddleware(thunk)
// ----------------------------------------------------------------------------------------------


// redux compose源码
dispatch = compose(...chain)(store.dispatch)

export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg //  没有中间键就返回传入的 store.dispatch
  }

  if (funcs.length === 1) {
    return funcs[0] // 只有一个中间件就返回第一个中间件并调用 传入的参数是store.dispatch
  }

  // 两个以上的中间件进行reduce迭代 ...args  就是store.dispatch
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
  // ...arg就是store.dispatch = compose(...chain)(store.dispatch) 中的store.dispatch
}


if (funcs.length === 1) {
  return funcs[0] // 只有一个中间件就返回第一个中间件并调用 传入的参数是store.dispatch
}

// 通过compose这次调用之后返回 next是dispatch()
function (action) {
  return next(action);
}




```