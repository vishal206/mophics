## Object2D.ts

Creates a rectangle object.
Hardcode defaults. Keep simple.

The `tracks` property inside Object2D is responsible for storing all keyframes related to that object, organized per property (e.g., x, y). Each track is essentially a timeline for one property. This allows the engine to animate each property independently and interpolate values during playback. In short, tracks hold the animation history of the object.

### containsPoint(px: number, py:number)

This allows us to detect if the mouse is inside the object.
Here px and py will be the coordinates of mouse pointer.
