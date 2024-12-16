import {Message} from "./message.model";

export interface Chat {
  members: number[],
  messages: Message[],
}
