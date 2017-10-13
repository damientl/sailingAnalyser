//yyyy-mm-ddThh:mm:ssZ
export class DateUtil{
  toJSDate (dateTime:string):Date {
    return new Date(dateTime);
  }

  difTime (a:Date, b:Date):number {
    var date1_ms = a.getTime();
    var date2_ms = b.getTime();

    var difference_ms = date2_ms - date1_ms;
    return difference_ms;
  }
}
