

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

module.exports = isPromise;


// 判断对象obj.then类型是不是一个函数从而判断promise