import { Object2D } from "./Object2D";

export class Scene {
  objects: Object2D[] = [];

  constructor() {
    // Create one rectangle for now
    const rect = new Object2D("rect-1");
    this.objects.push(rect);
  }

  getObjectAtPosition(x: number, y: number) {
    // Reverse order later for z-index, but fine for now
    return this.objects.find((obj) => obj.containsPoint(x, y));
  }
}
