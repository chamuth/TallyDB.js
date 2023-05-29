import { QueryQueueItem } from "../interfaces/QueryQueueItem";
import { QueryResponse } from "../interfaces/QueryResponse";

export class QueryQueue {
  private queue: QueryQueueItem[];

  constructor() {
    this.queue = [];
  }

  /**
   * Enqueues a query and callback events into the queue
   * @param item Query queue item to enqueue
   */
  enqueue(item: QueryQueueItem) {
    this.queue.push(item);
  }

  /**
   * Handle data responses from server
   * @param data Data as string from the server
   */
  handle(data: string): void {
    const response: QueryResponse = JSON.parse(data.toString());

    var requestIndex = this.queue.findIndex(
      (item) => item.requestId === response.requestId,
    );

    if (requestIndex === -1) {
      // request not in the queue
      return;
    }

    // Find and call request callback with response
    const request = this.queue[requestIndex];
    request.callback(response);

    // Remove handler from queue
    this.queue.splice(requestIndex, 1);
  }
}
