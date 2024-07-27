export type SigninResponse = {
  username: string;
  authenticated: boolean;
  created?: Date;
  expiration?: Date;
  accessToken: string;
  refreshToken: string;
  tokenType: string;
};
