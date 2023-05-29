import * as net from "net";
import { QueryResponse } from "../interfaces/QueryResponse";
import ConnectionSettings from "../interfaces/ConnectionSettingsInterface";
import { QueryQueue } from "./QueryQueue";
import { v4 as uuidv4 } from "uuid";
import { ConnectionState } from "../types/ConnectionState";

export default class Connection {
  private client: net.Socket;
  private queryQueue: QueryQueue;
  private connectionState: ConnectionState = ConnectionState.NotConnected;

  /**
   * Initialize connection with established socket
   * @param client Client socket
   */
  constructor(settings: ConnectionSettings) {
    this.client = new net.Socket();
    this.connectionState = ConnectionState.Connecting;

    this.client.connect(settings.port, settings.host, () => {
      this.connectionState = ConnectionState.Connected;
    });

    this.client.on("data", (data) => {
      this.queryQueue.handle(data.toString());
    });

    this.client.on("close", () => {
      this.connectionState = ConnectionState.NotConnected;
    });

    // Initialize query queue
    this.queryQueue = new QueryQueue();
  }

  /**
   * Query TallyDB server
   * @param query query as a string
   * @param callback callback to handle response
   * @param error callback to handle errors
   */
  query(
    query: string,
    callback: (response: QueryResponse) => void,
    errorCallback: (error: Error) => void,
  ): void {
    if (this.connectionState !== ConnectionState.Connected) {
      throw Error("Connection to TallyDB server is not yet established");
    }

    const requestId = uuidv4();

    this.client.write(
      JSON.stringify({
        query,
        requestId,
      }),
    );

    this.queryQueue.enqueue({
      requestId,
      callback,
      errorCallback,
    });
  }

  /**
   * Close socket connection between client and server
   */
  async close() {
    this.client.end();
  }
}
