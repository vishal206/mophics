import type { Keyframe } from "./Keyframe";

export function interpolate(k1: Keyframe, k2: Keyframe, frame: number): number {
  if (k1.frame === k2.frame) return k1.value;

  const progress = (frame - k1.frame) / (k2.frame - k1.frame);

  return k1.value + (k2.value - k1.value) * progress;
}
