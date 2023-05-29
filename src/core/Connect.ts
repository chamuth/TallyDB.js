import ConnectionSettings from "../interfaces/ConnectionSettingsInterface";
import Connection from "./Connection";

const connect = (settings: ConnectionSettings): Connection => {
  return new Connection(settings);
};

export { connect };
