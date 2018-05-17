
```javascript
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
  // 2018.5.16 最新理解
  // compose的参数funcs中间件传进来 在传入reduce方法，返回的是一个匿名函数
  // 匿名函数是一个一阶函数, 一阶函数接收一个args参数代表是action
  // 一阶函数返回的是一个 函数调用，先执行b函数(接收的参数是action)，接着再执行a函数
}

applyMiddleware(z1,z2,z3,z4,z5,z6,z7,z8);

//------------- 华丽的分割线  ---------------------
return function(arg) {
  return arg;
}

function a() {
  return function() {
  }
}
var a = () => () => {}
// dispatch = compose(...chain)(store.dispatch)
(a,b) => (...arg) => a(b(...arg))
// 翻译
let funcs = [fun1,fun2];
let arg = [1,2,3];
funcs.reduce(function(a,b) {
  return function (...arg) {
    return a(b(...arg))
  }
})

//------------- 华丽的分割线  ---------------------

// 中间件二阶变一阶
// dispatch = (action) => store.dispatch(action);
// dispatch = (action) => {};

// dispatch = function (action) {
//   console.log('logger1 start', action);
//   next(action);
//   console.log('logger1 end', action);
// }


// 一阶函数就是一个function() {}
// 二阶函数就是
// function(){
//   ...
//   return function() {

//   }
// }

// () => {}
// () => () => {}

```