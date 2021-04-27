import { useCallStackInterface } from "./EventLoop.models"

export function useEventLoopHighPriority<useCallStackInterface>(arr, _cb): void  {
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
    const first = index===0;
    const last = index===arr.length-1;

    setTimeout(() => {
      _cb([error, item, index, first, last, arr]);
    }, 0);

    index ++;

  } while (--length)
};
