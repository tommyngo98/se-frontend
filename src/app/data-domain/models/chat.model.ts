export interface Chat {
  members: number[],
  messages: Message[],
}

interface Message {
  from: number,
  to: number,
  text: string,
  timestamp: Date,
  isDeleted: boolean,
}
