import { Engine } from "@/engine/core/Engine";

type ToolbarProps = {
  engine: Engine | null;
};

export default function Toolbar({ engine }: ToolbarProps) {
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
    </div>
  );
}
