## Timeline.ts

Timeline.ts is the time controller of your animation engine.
It manages **how time progresses**, whether the animation is playing or paused, and converts real elapsed time (seconds) into animation frames based on FPS.

It does not render anything or modify objects directly. It only tracks currentTime, calculates the current frame, and exposes control methods like play(), pause(), and reset().

Think of it as the engine’s internal clock.
