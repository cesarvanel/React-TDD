import { DateProvider } from "../../domain/DateProvider";

export class TestDateProvider implements DateProvider {
  now = new Date();
  getNow(): Date {
    return this.now;
  }
}
