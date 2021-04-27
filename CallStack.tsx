import { useCallStackInterface } from "./EventLoop.models"

export function useCallStack<useCallStackInterface>(arr: Array<unknown>, _cb){
  if (!Array.isArray(arr)) {
    throw new Error("The first param most be an array")
  }

  if (typeof _cb !== "function") {
    throw new Error("The second param most be a function")
  }

    let index = 0;
    let length = arr.length
    do {
      let error = null;
      const item = arr[index];
      const first = index===0
      const last = index===arr.length-1
 
      _cb([error, item, index, first, last, arr]);

      index ++;

    } while (--length)
};
