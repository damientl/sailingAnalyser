export class DateUtil{
  toJSDate (dateTime:string):Date {
    // format: yyyy-mm-ddThh:mm:ssZ
    return new Date(dateTime);
  }

  difTime (a:Date, b:Date):number {
    const date1_ms = a.getTime();
    const date2_ms = b.getTime();

    var difference_ms = date2_ms - date1_ms;
    return difference_ms;
  }
}
