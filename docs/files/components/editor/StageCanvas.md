## StageCanvas

StageCanvas is responsible for mounting and managing the canvas rendering surface.

It:

- Creates and attaches the `<canvas>` element
- Initializes and connects the animation engine
- Starts and stops the render loop
- Handles canvas sizing

It does NOT:

- Store animation state in React
- Perform interpolation logic
- Manage UI layout

It is the bridge between React and the animation engine.
