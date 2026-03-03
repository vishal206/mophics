# Engine.ts — Core Animation Engine (Mophics)

`Engine.ts` is the central runtime controller of Mophics.

It is responsible for:

- Creating the Scene
- Connecting the Renderer
- Running the animation loop
- Orchestrating frame updates

It does NOT:

- Handle UI logic
- Store React state
- Perform interpolation (yet)
- Handle recording (yet)

This file represents the heart of the animation runtime.

## 🏗 Architecture Role

React UI
↓
Engine (this file)
↓
Scene + Renderer
↓
Canvas

The Engine owns the animation lifecycle.

## Responsibilities

### Loop()

1. Gets the current frame from the timeline

2. For each object:

- - Finds the surrounding keyframes for x and y
- - Uses the interpolator to calculate the correct in-between value
- - Updates the object’s transform before rendering

So instead of the object staying static, the loop now:

> Reads stored keyframes → calculates interpolated value → updates transform → renders updated position.

### Initialize Scene

Creates the Scene instance which contains all objects.

### Initialize Renderer

Creates the CanvasRenderer and connects it to the canvas context.

### Run Animation Loop

Uses `requestAnimationFrame` to continuously render frames.

### Manage Loop Lifecycle

Provides `start()` and `stop()` methods.

### setupMouseEvents()

Takes care of moving the object selected.
Uses Scene Object to find the object, this returns an bject2D object.
Now whenaan bject selected and mouse is moved, we update the object's position.

### recordKeyframe(obj: Object2D)

The recordKeyframe() method is responsible for capturing the current state of an object during recording.
When recording is active, it reads the object's current transform values and stores them as keyframes in the appropriate tracks. It ensures that keyframes are only added when values change, preventing unnecessary duplicates. Its job is to convert user movement into structured animation data.

### getSurroundingKeyframes( track: { frame: number; value: number }[], currentFrame: number )

This function finds the two keyframes that wrap around the current frame — one before (previous) and one after (next).

These two keyframes are necessary for interpolation, because the engine needs to know the start value and end value to calculate the smooth in-between value. In short, this function determines which two keyframes should be used to compute the current animated state.
