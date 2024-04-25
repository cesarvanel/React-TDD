import { ExpectedPostMessage } from "../../types/types";
import { MessageGateway } from "../domain/MessageGateway";

export class FakeMessageGateway implements MessageGateway {
  lastPostedMessage!: ExpectedPostMessage;

  postMessage(expectedPostMessage: ExpectedPostMessage): Promise<void> {
    this.lastPostedMessage = expectedPostMessage;

    return Promise.resolve();
  }
}
