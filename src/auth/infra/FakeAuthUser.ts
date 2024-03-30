import { AuthUserGateway } from "../domain/auhtUserGateway";

export class FakeAuthUserGAteway implements AuthUserGateway {
  auhtuser!: string;
  getAuthUser(): string {
    return this.auhtuser;
  }
}
