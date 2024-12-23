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
  pendingRequests: FriendRequests[],
  createdAt: Date,
  updatedAt: Date,
}

export interface FriendRequests {
  from: number,
  _id: string,
  status: RequestStatus,
}

enum RequestStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DENIED = 'denied',
}
