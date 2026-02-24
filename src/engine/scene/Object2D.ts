export type Transform = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export class Object2D {
  id: string;
  transform: Transform;
  color: string;

  constructor(id: string) {
    this.id = id;
    this.transform = {
      x: 200,
      y: 200,
      width: 120,
      height: 80,
    };
    this.color = "#4f46e5"; // nice indigo
  }

  //This allows us to detect if mouse is inside rectangle.
  containsPoint(px: number, py: number) {
    // px - pointer x, py - pointer y
    const { x, y, width, height } = this.transform;

    return px >= x && px <= x + width && py >= y && py <= y + height;
  }
}
