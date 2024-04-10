export interface AuthUserGateway {
  getAuthUser: () => string;

  authenticateWithGoogleAccount: () => Promise<string>;
}
