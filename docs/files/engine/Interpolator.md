## Interpolator.ts

**Interpolation:** Calculating the in-between values between two known values.

Contains the pure math function responsible for generating smooth values between two keyframes.
Given a start keyframe, an end keyframe, and the current frame number, it calculates how far along the animation is (progress) and returns the correct in-between value using linear interpolation.

It does not modify objects or know anything about the engine, it simply converts two stored snapshots into smooth motion.
