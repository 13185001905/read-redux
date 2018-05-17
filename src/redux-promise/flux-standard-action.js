import { isPlainObject, isString } from 'lodash';

export function isFSA(action) {
  return (
    isPlainObject(action) &&
    isString(action.type) &&
    Object.keys(action).every(isValidKey)
  );
}

export function isError(action) {
  return isFSA(action) && action.error === true;
}

function isValidKey(key) {
  return ['type', 'payload', 'error', 'meta'].indexOf(key) > -1;
}

function a(key) {
  return [1,2,3,4].indexOf(key) > -1
}

// every 接收回调函数，每一项都返回true，那么久返回true

// 主要判断 action 中是不是都有type  payload