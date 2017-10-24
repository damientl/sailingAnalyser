import { CanvasMath } from '../util/canvas.math';
import { SpeedMath } from '../util/speed.math';
import { TrackWindow } from '../model/track.window';
import { CanvasPoint } from '../model/canvas.point';

describe('1st tests', () => {
  it('point on canvas', () => {

    const trackWindow = new TrackWindow();
    trackWindow.canvasHeight = 200;
    trackWindow.canvasWidth = 200;
    trackWindow.center = new CanvasPoint(50, 50);
    trackWindow.lonZoom = 10;
    const point = new CanvasMath().pointOnCanvas(new CanvasPoint(45, 45), trackWindow);
    expect(point.x).toBe(50);
    expect(point.y).toBe(150);
  });
  it('point on canvas neg', () => {

    const trackWindow = new TrackWindow();
    trackWindow.canvasHeight = 200;
    trackWindow.canvasWidth = 200;
    trackWindow.center = new CanvasPoint(-50, -50);
    trackWindow.lonZoom = 10;
    const point = new CanvasMath().pointOnCanvas(new CanvasPoint(-55, -55), trackWindow);
    expect(point.x).toBe(50);
    expect(point.y).toBe(150);
  });
  it('centerOffset', () => {

    const point = new CanvasMath().centerOffset(new CanvasPoint(45, 45), new CanvasPoint(50, 50));
    expect(point.x).toBe(-5);
    expect(point.y).toBe(-5);
  });
  it('centerOffsetNeg', () => {

    const point = new CanvasMath().centerOffset(new CanvasPoint(-55, -55), new CanvasPoint(-50, -50));
    expect(point.x).toBe(-5);
    expect(point.y).toBe(-5);
  });
  it('speed time', () => {

    const a = new CanvasPoint(-52.218395, -31.773808);
    const b = new CanvasPoint(-52.218495, -31.773908);

    const diffTime1 = 1;
    const diffTime2 = 2;

    const speed1 = new SpeedMath().speed(a, b, diffTime1);
    const speed2 = new SpeedMath().speed(a, b, diffTime2);
    expect(speed1).toBe(speed2 * 2);
  });
});
