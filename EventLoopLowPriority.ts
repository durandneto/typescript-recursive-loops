import { useEventLoopInterface } from "./EventLoop.models"

export function useEventLoopLowPriority<useEventLoopInterface>(arr, _cb, minimalTime = 
0): void  {
  if (!Array.isArray(arr)) {
    throw new Error("The first param most be an array")
  }

  if (typeof _cb !== "function") {
    throw new Error("The second param most be a function")
  }

  let index = 0;
  let length = arr.length
  const r = (iScoped) => {

    let error = null;
    const item = arr[iScoped];
    const first = iScoped===0
    const last = iScoped===length-1
 
    if (!last) {
      setTimeout(() => {
        _cb([error, item, iScoped, first, last, arr]);
        r(++iScoped);
      }, minimalTime);
    } else {
      setTimeout(() => {
        _cb([error, item, iScoped, first, last, arr]);
      }, minimalTime);
    }
  }
  r(index)

};