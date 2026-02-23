## EditorLayout

EditorLayout is responsible for defining the structural layout of the editor.

It:

- Organizes the main UI regions (toolbar, stage, panels, timeline)
- Controls overall layout using flex/grid
- Acts as the visual shell of the application

It does NOT:

- Handle animation logic
- Render canvas content
- Manage engine state

It is purely a layout container.
