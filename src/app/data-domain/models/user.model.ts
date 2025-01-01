export interface User {
  _id: string,
  user_id: number,
  displayed_name: string,
  email: string,
  isConfirmed: boolean,
  isVisible: boolean,
  bio: string,
  chats: number[],
  friends: number[],
  pendingRequests: FriendRequest[],
  createdAt: Date,
  updatedAt: Date,
}

export interface FriendRequest {
  from: number,
  _id: string,
  status: RequestStatus,
}

export enum RequestStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DENIED = 'denied',
}
