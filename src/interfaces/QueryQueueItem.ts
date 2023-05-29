import { QueryResponse } from "./QueryResponse";

export interface QueryQueueItem {
  requestId: string;
  callback: (response: QueryResponse) => void;
  errorCallback: (err: Error) => void;
}
