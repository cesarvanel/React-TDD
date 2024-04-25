import { DateProvider } from "../../domain/DateProvider";

export class RealDateProvider implements DateProvider {
  getNow(): Date {
    return new Date();
  }
}
