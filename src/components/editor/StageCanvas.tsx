import { useEffect, useRef } from "react";
import { Engine } from "@/engine/core/Engine";

export default function StageCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<Engine | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 120;

    const engine = new Engine(canvas);
    engine.start();

    engineRef.current = engine;

    return () => {
      engine.stop();
    };
  }, []);

  return <canvas ref={canvasRef} className="flex-1 bg-black" />;
}
