import {Message} from "./message.model";

export interface Chat {
  _id: number,
  messages: Message[],
  participants: number[],
  createdAt: Date,
  updatedAt: Date,
}
