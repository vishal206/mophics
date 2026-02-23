import { Scene } from "../scene/Scene";

export class CanvasRenderer {
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
  }

  clear() {
    this.ctx.fillStyle = "#0f172a"; // dark background
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  render(scene: Scene) {
    this.clear();

    scene.objects.forEach((obj) => {
      this.ctx.fillStyle = obj.color;
      this.ctx.fillRect(
        obj.transform.x,
        obj.transform.y,
        obj.transform.width,
        obj.transform.height,
      );
    });
  }
}
