/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Notification {
  actor: {
    name: string;
    username: string;
    avatarUrl?: string;
  };
  message: string;
  createdAt: string;
}
