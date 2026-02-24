export class Timeline {
  fps: number = 60;
  duration: number = 10; // seconds

  currentTime: number = 0;
  isPlaying: boolean = false;
  isRecording: boolean = false;

  update(deltaTime: number) {
    if (!this.isPlaying) return;

    this.currentTime += deltaTime;

    // Stop at duration
    if (this.currentTime > this.duration) {
      this.currentTime = this.duration;
      this.isPlaying = false;
    }
  }

  getCurrentFrame(): number {
    return Math.floor(this.currentTime * this.fps);
  }

  play() {
    this.isPlaying = true;
  }

  pause() {
    this.isPlaying = false;
  }

  reset() {
    this.currentTime = 0;
  }
}
