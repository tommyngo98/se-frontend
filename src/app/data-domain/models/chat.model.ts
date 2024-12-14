export interface Chat {
  chat_id: number,
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
