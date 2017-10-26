import { Segment } from '../model/segment';
import { TrackWindow } from '../model/track.window';
import { WindowCenter } from '../track/window.center';
import { CanvasPoint } from '../model/canvas.point';
import { SEGMENTS } from '../test/mock.segment';
import {Option, option, some, none} from 'ts-option';

describe('center tests', () => {
  it('center', () => {
    const segs:Segment[] = Segment.createSegments(SEGMENTS);


    const windowCenter = new WindowCenter(new TrackWindow(), segs);
    const center: Option<CanvasPoint>  = windowCenter.centerOnTime(0);

  });
});
