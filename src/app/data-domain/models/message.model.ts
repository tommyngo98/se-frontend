export interface Message {
  from: number,
  to: number,
  text: string,
  timestamp: Date,
  isDeleted: boolean,
}
