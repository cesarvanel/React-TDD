import { ExpectedPostMessage } from "../../types/types";


export interface MessageGateway {

    postMessage:(expectedPostMessage:ExpectedPostMessage) => Promise<void>

}