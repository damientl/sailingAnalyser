import { Segment } from '../model/segment';
import { TrackWindow } from '../model/track.window';
import { WindowCenter } from '../track/window.center';
import { CanvasPoint } from '../model/canvas.point';
import { SEGMENTS } from '../test/mock.segment';
import {Option, option, some, none} from 'ts-option';

describe('center tests', () => {
  it('center defined', () => {
    const segs:Segment[] = Segment.createSegments(SEGMENTS);


    const windowCenter = new WindowCenter(segs);
    const center: Option<CanvasPoint>  = windowCenter.centerOnTime(0);
    expect(center.isDefined).toBeTruthy();

  });
  it('center precise', () => {
    const segs:Segment[] = Segment.createSegments(SEGMENTS);


    const windowCenter = new WindowCenter(segs);
    const center: Option<CanvasPoint>  = windowCenter.centerOnTime(0);
    expect(center.isDefined).toBeTruthy();
    expect(center.get.equals(segs[0].segToPoint())).toBeTruthy();

  });
  it('center total time', () => {
    const segs:Segment[] = Segment.createSegments(SEGMENTS);

    const initialTime = new Date(segs[0].time);
    const finalTime =  new Date(segs[segs.length-1].time);
    expect( WindowCenter.totalTime(initialTime,finalTime) > 0).toBeTruthy();

  });
  it('center perc time 0', () => {
    const segs:Segment[] = Segment.createSegments(SEGMENTS);

    const initialTime = new Date(segs[0].time);
    const finalTime =  new Date(segs[segs.length-1].time);

    const time = 0;
    const percentTime = WindowCenter.percTime(initialTime, time, WindowCenter.totalTime(initialTime,finalTime));

    expect( percentTime.getTime() ).toBe(initialTime.getTime());

  });
  it('center perc time 100', () => {
    const segs:Segment[] = Segment.createSegments(SEGMENTS);

    const initialTime = new Date(segs[0].time);
    const finalTime =  new Date(segs[segs.length-1].time);

    const time = 100;
    const percentTime = WindowCenter.percTime(initialTime, time, WindowCenter.totalTime(initialTime,finalTime));

    expect( percentTime.getTime() ).toBe(finalTime.getTime());

  });
  it('center perc time 50', () => {
    const segs:Segment[] = Segment.createSegments(SEGMENTS);

    const initialTime = new Date(segs[0].time);
    const beforeMiddleTime = new Date(segs[1].time);
    const afterMiddleTime = new Date(segs[2].time);
    const finalTime =  new Date(segs[segs.length-1].time);

    const time = 50;
    const percentTime = WindowCenter.percTime(initialTime, time, WindowCenter.totalTime(initialTime,finalTime));

    expect( percentTime.getTime() ).toBeGreaterThan(beforeMiddleTime.getTime());
    expect( percentTime.getTime() ).toBeLessThan(afterMiddleTime.getTime());

  });
  it('center closest perc time 50', () => {
    const segs:Segment[] = Segment.createSegments(SEGMENTS);

    const initialTime = new Date(segs[0].time);
    const beforeMiddleTime = new Date(segs[1].time);
    const finalTime =  new Date(segs[segs.length-1].time);

    const time = 50;
    const percentTime = WindowCenter.percTime(initialTime, time, WindowCenter.totalTime(initialTime,finalTime));

    const windowCenter = new WindowCenter(segs);
    const centerSeg:Segment = windowCenter.findClosestTime(percentTime);

    expect( new Date(centerSeg.time).getTime() ).toBe(beforeMiddleTime.getTime());

  });
});
