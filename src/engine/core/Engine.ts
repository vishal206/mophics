import { CanvasRenderer } from "../renderer/CanvasRenderer";
import type { Object2D } from "../scene/Object2D";
import { Scene } from "../scene/Scene";
import { Timeline } from "../timeline/Timeline";
import type { Keyframe } from "../timeline/Keyframe";

export class Engine {
  private canvas: HTMLCanvasElement;
  private scene: Scene;
  private renderer: CanvasRenderer;
  private animationFrameId: number | null = null;

  private isDragging = false;
  private selectedObject: Object2D | null = null;
  private dragOffsetX = 0;
  private dragOffsetY = 0;

  private timeline: Timeline;
  private lastTime = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.timeline = new Timeline();
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Canvas context not available");
    }

    this.scene = new Scene();
    this.setupMouseEvents();
    this.renderer = new CanvasRenderer(ctx, canvas.width, canvas.height);
  }

  start() {
    const loop = (time: number) => {
      const delta = (time - this.lastTime) / 1000; // convert to seconds
      this.lastTime = time;

      this.timeline.update(delta);

      this.renderer.render(this.scene);

      this.animationFrameId = requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
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

      if (this.timeline.isRecording) {
        this.recordKeyframe(this.selectedObject);
      }
    });

    this.canvas.addEventListener("mouseup", () => {
      this.isDragging = false;
      this.selectedObject = null;
    });
  }

  private recordKeyframe(obj: Object2D) {
    const frame = this.timeline.getCurrentFrame();

    const lastX = obj.tracks.x[obj.tracks.x.length - 1];
    const lastY = obj.tracks.y[obj.tracks.y.length - 1];

    // Only record if value changed (avoid spam)
    if (!lastX || lastX.value !== obj.transform.x) {
      obj.tracks.x.push({
        frame,
        value: obj.transform.x,
      });
    }

    if (!lastY || lastY.value !== obj.transform.y) {
      obj.tracks.y.push({
        frame,
        value: obj.transform.y,
      });
    }
  }
}
