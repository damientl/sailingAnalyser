import { Calculation } from './calculation';
import { TrackWindow } from './track.window';
import { CanvasPoint } from './canvas.point';

describe('1st tests', () => {
  it('point on canvas', () => {

    let trackWindow = new TrackWindow();
    trackWindow.canvasHeight = 200;
    trackWindow.canvasWidth = 200;
    trackWindow.center = new CanvasPoint(50,50);
    trackWindow.lonZoom = 10;
    let point = new Calculation().pointOnCanvas(new CanvasPoint(45,45), trackWindow);
    expect(point.x).toBe(50);
    expect(point.y).toBe(50);
  })
  it('centerOffset', () => {

    let point = new Calculation().centerOffset(new CanvasPoint(45,45), new CanvasPoint(50,50));
    expect(point.x).toBe(-5);
    expect(point.y).toBe(-5);
  })
});
