export interface useCallStackInterface {
  arr: Array<unknown>;
  _cb: (error: string,
 item: unknown,
 index?: number,
 isFristItem?: boolean,
 isLastItem?: boolean,
 arr?: Array<unknown>) => void;
}

export interface useEventLoopInterface extends useCallStackInterface {
  minimalTime: number;
}