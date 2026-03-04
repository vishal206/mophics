import { CanvasRenderer } from "../renderer/CanvasRenderer";
import type { Object2D } from "../scene/Object2D";
import { Scene } from "../scene/Scene";
import { Timeline } from "../timeline/Timeline";
import { interpolate } from "../timeline/Interpolator";

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

  play() {
    this.timeline.reset();
    this.timeline.isRecording = false;
    this.timeline.play();
  }

  pause() {
    this.timeline.pause();
  }

  startRecording() {
    this.timeline.reset();
    this.timeline.isRecording = true;
    this.timeline.play();
  }

  stopRecording() {
    this.timeline.isRecording = false;
    this.timeline.pause();
  }

  start() {
    const loop = (time: number) => {
      const delta = (time - this.lastTime) / 1000; // convert to seconds
      this.lastTime = time;

      this.timeline.update(delta);

      if (this.timeline.isPlaying && !this.timeline.isRecording) {
        const currentFrame = this.timeline.getCurrentFrame();

        this.scene.objects.forEach((obj) => {
          const xFrames = obj.tracks.x;
          const yFrames = obj.tracks.y;

          const xKeys = this.getSurroundingKeyframes(xFrames, currentFrame);

          const yKeys = this.getSurroundingKeyframes(yFrames, currentFrame);

          if (xKeys) {
            obj.transform.x = interpolate(
              xKeys.previous,
              xKeys.next,
              currentFrame,
            );
          }

          if (yKeys) {
            obj.transform.y = interpolate(
              yKeys.previous,
              yKeys.next,
              currentFrame,
            );
          }
        });
      }

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

  private getSurroundingKeyframes(
    track: { frame: number; value: number }[],
    currentFrame: number,
  ) {
    if (track.length === 0) return null;

    let previous = track[0];
    let next = track[track.length - 1];

    for (let i = 0; i < track.length; i++) {
      if (track[i].frame <= currentFrame) {
        previous = track[i];
      }

      if (track[i].frame >= currentFrame) {
        next = track[i];
        break;
      }
    }

    return { previous, next };
  }
}
