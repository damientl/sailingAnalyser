export class DateUtil {
  static toJSDate (dateTime: string): Date {
    // format: yyyy-mm-ddThh:mm:ssZ
    return new Date(dateTime);
  }

  static difTime (a: Date, b: Date): number {
    const date1_ms = a.getTime();
    const date2_ms = b.getTime();

    return date2_ms - date1_ms;
  }
}
