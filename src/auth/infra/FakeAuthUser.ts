import { users } from "../../fake-data/fake-data";
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
    return Promise.resolve(this.willSucceedForGoogleAuth);
  }
}



export class FakeAuthUserGAtewayWithFakeData implements AuthUserGateway {
  auhtuser!: string;
  willSucceedForGoogleAuth!: string;
 
  getAuthUser(): string {
    return this.auhtuser;
  }

  async authenticateWithGoogleAccount(): Promise<string> {
    this.willSucceedForGoogleAuth = [...users.values()][0];
    this.auhtuser = [...users.values()][0];
    return Promise.resolve(this.willSucceedForGoogleAuth);
  }
}
