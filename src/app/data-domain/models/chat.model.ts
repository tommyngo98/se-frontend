import {Message} from "./message.model";

export interface Chat {
  chat_id: number,
  members: number[],
  messages: Message[],
}
