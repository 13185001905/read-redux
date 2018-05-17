import $$observable from 'symbol-observable'
import ActionTypes from './utils/actionTypes'
import isPlainObject from './utils/isPlainObject'

export default function createStore(reducer, preloadedState, enhancer) {
  if (typeof enhancer !== 'undefined') {
    return enhancer(createStore)(reducer, preloadedState)
  }
  let currentReducer = reducer
  let currentState = preloadedState
  let currentListeners = []
  let nextListeners = currentListeners
  let isDispatching = false

  function ensureCanMutateNextListeners() { // 确保下一个监听器可以发生变化
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice()
    }
  }
  
  function getState() {
    return currentState
  }

  function subscribe(listener) { // 订阅
    let isSubscribed = true
    ensureCanMutateNextListeners()
    nextListeners.push(listener)

    return function unsubscribe() { // 调用就将监听器(函数)从数组中删除
      isSubscribed = false
      ensureCanMutateNextListeners()
      const index = nextListeners.indexOf(listener)
      nextListeners.splice(index, 1)
    }
  }
  function dispatch(action) {  // dispatch 数据 ->  reducer
    try {
      isDispatching = true
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatching = false
    }
    const listeners = (currentListeners = nextListeners)
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }
    return action
  }

  function replaceReducer(nextReducer) {
    currentReducer = nextReducer
    dispatch({ type: ActionTypes.REPLACE })
  }

  function observable() { // 观察着模式
    const outerSubscribe = subscribe
    return {
      subscribe(observer) {
        function observeState() {
          if (observer.next) {
            observer.next(getState())
          }
        }
        observeState()
        const unsubscribe = outerSubscribe(observeState)
        return { unsubscribe }
      },
      [$$observable]() {
        return this
      }
    }
  }

  dispatch({ type: ActionTypes.INIT })
  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]: observable
  }
}
