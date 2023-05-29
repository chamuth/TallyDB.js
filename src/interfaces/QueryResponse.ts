import { DatabaseError } from "./DatabaseError";

export interface SliceRecordData {
  type: string;
  value: string;
}

export interface SliceRecord {
  time: Date;
  data: SliceRecordData[];
}

export interface QueryResponse {
  requestId: string;
  sliceName: string;
  records: SliceRecord[];
  errors: DatabaseError[];
}
