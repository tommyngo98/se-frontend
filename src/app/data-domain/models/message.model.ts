export interface Message {
  _id: string,
  sender: number,
  text: string,
  timestamp: Date,
  isDeleted: boolean,
}
