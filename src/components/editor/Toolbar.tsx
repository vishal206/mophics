import { Engine } from "@/engine/core/Engine";
import { useEffect, useState } from "react";

type ToolbarProps = {
  engine: Engine | null;
};

export default function Toolbar({ engine }: ToolbarProps) {
  const [frame, setFrame] = useState(0);
  const [status, setStatus] = useState<"recording" | "playing" | "paused">(
    "paused",
  );

  useEffect(() => {
    if (!engine) return;

    const interval = setInterval(() => {
      setFrame(engine.getCurrentFrame());
      setStatus(engine.getStatus());
    }, 50); // update UI every 50ms (~20fps)

    return () => clearInterval(interval);
  }, [engine]);

  return (
    <div className="h-14 border-b bg-zinc-900 flex items-center px-4 gap-3 text-white">
      <button
        onClick={() => engine?.startRecording()}
        className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
      >
        ⏺ Record
      </button>

      <button
        onClick={() => engine?.stopRecording()}
        className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded text-sm"
      >
        ⏹ Stop
      </button>

      <button
        onClick={() => engine?.play()}
        className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm"
      >
        ▶ Play
      </button>

      <button
        onClick={() => engine?.pause()}
        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
      >
        ⏸ Pause
      </button>

      <div className="ml-6 text-xs opacity-70">Frame: {frame}</div>

      <div className="ml-6 text-sm opacity-70">Status: {status}</div>
    </div>
  );
}
