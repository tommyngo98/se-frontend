export interface Message {
  _id: string,
  from: string,
  text: string,
  timestamp: Date,
  isDeleted: boolean,
}
