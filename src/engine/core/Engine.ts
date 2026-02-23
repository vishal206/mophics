import { CanvasRenderer } from "../renderer/CanvasRenderer";
import { Scene } from "../scene/Scene";

export class Engine {
  private scene: Scene;
  private renderer: CanvasRenderer;
  private animationFrameId: number | null = null;

  constructor(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Canvas context not available");
    }

    this.scene = new Scene();
    this.renderer = new CanvasRenderer(ctx, canvas.width, canvas.height);
  }

  start() {
    const loop = () => {
      this.renderer.render(this.scene);
      this.animationFrameId = requestAnimationFrame(loop);
    };

    loop();
  }

  stop() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}
