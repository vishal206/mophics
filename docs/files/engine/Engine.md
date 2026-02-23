# Engine.ts — Core Animation Engine (Mophics)

## 📌 Purpose

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

---

## 🏗 Architecture Role

React UI
↓
Engine (this file)
↓
Scene + Renderer
↓
Canvas

The Engine owns the animation lifecycle.

## 🧠 Responsibilities

### 1️⃣ Initialize Scene

Creates the Scene instance which contains all objects.

### 2️⃣ Initialize Renderer

Creates the CanvasRenderer and connects it to the canvas context.

### 3️⃣ Run Animation Loop

Uses `requestAnimationFrame` to continuously render frames.

### 4️⃣ Manage Loop Lifecycle

Provides `start()` and `stop()` methods.
