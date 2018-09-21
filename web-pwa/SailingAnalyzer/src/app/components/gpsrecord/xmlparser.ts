
import { Segment } from '../model/segment';

export class XmlParser{


  parseRecord(text):Segment[]{
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text,'text/xml');

    const nList: NodeListOf<Element> = xmlDoc.getElementsByTagName('trkpt');

    const segments:Segment[] = [];

    for (let i = 0; i < nList.length; i++) {
        const node:Element = nList[i];
        segments.push(new Segment(node.getAttribute('lat'),
              node.getAttribute('lon'),
              node.getElementsByTagName('time')[0].innerHTML));
    }
    return segments;
  }


}
