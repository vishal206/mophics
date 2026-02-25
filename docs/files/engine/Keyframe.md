## Keyframe.ts

Keyframe.ts defines the data structure for a single animation keyframe.
Its responsibility is purely structural: it stores the value of one property (like x or y) at a specific frame number.

It does not handle interpolation, timing, or rendering — it simply represents a snapshot of a property at a moment in time. Think of it as the smallest unit of animation data.
