## CanvasRenderer

CanvasRenderer is the drawing layer of your engine.

It has ONE responsibility:

> Take the current scene state → draw it to the canvas.

It does NOT:

- Control time
- Store objects
- Record keyframes
- Handle dragging
- Talk to React

It only draws.

### Clear Screen

`this.ctx.fillRect(0, 0, this.width, this.height)`

Without this, you’d see “ghost trails”.

Every animation frame:

1. Clear canvas
2. Draw everything fresh

This is how all 2D engines work.

### Loop Through Objects

`scene.objects.forEach(...)`

Scene contains your objects.

Renderer asks:

> What objects exist right now?

It doesn’t care how they got there.

### Draw Based on Transform

`obj.transform.x`
`obj.transform.y`

Renderer uses position to draw rectangle.

If transform changes:
Renderer automatically reflects it next frame.

That’s important.
