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
