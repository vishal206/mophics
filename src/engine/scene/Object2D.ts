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
}
