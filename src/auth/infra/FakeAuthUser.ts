import { AuthUserGateway } from "../domain/auhtUserGateway";

export class FakeAuthUserGAteway implements AuthUserGateway {
  auhtuser!: string;
  willSucceedForGoogleAuth!: string;
  getAuthUser(): string {
    return this.auhtuser;
  }

  async authenticateWithGoogleAccount(): Promise<string> {
    this.willSucceedForGoogleAuth = "cesar";
    this.auhtuser = "cesar";
    return Promise.resolve("cesar");
  }
}
