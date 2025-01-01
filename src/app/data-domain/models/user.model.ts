export interface User {
  user_id: number,
  displayed_name: string,
  email: string,
  isConfirmed: boolean,
  isVisible: boolean,
  bio: string,
  chats: number[],
  friends: string[],
  pendingRequests: FriendRequests[],
  createdAt: Date,
  updatedAt: Date,
}

interface FriendRequests {
  from: number,
  to: number,
  timestamp: Date,
  status: RequestStatus,
}

enum RequestStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DENIED = 'denied',
}
