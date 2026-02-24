import { CanvasRenderer } from "../renderer/CanvasRenderer";
import type { Object2D } from "../scene/Object2D";
import { Scene } from "../scene/Scene";

export class Engine {
  private canvas: HTMLCanvasElement;
  private scene: Scene;
  private renderer: CanvasRenderer;
  private animationFrameId: number | null = null;

  private isDragging = false;
  private selectedObject: Object2D | null = null;
  private dragOffsetX = 0;
  private dragOffsetY = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Canvas context not available");
    }

    this.scene = new Scene();
    this.setupMouseEvents();
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

  private setupMouseEvents() {
    this.canvas.addEventListener("mousedown", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const obj = this.scene.getObjectAtPosition(mouseX, mouseY);

      if (obj) {
        this.selectedObject = obj;
        this.isDragging = true;

        this.dragOffsetX = mouseX - obj.transform.x;
        this.dragOffsetY = mouseY - obj.transform.y;
      }
    });

    this.canvas.addEventListener("mousemove", (e) => {
      if (!this.isDragging || !this.selectedObject) return;

      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      this.selectedObject.transform.x = mouseX - this.dragOffsetX;

      this.selectedObject.transform.y = mouseY - this.dragOffsetY;
    });

    this.canvas.addEventListener("mouseup", () => {
      this.isDragging = false;
      this.selectedObject = null;
    });
  }
}
