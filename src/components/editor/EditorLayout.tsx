import { useState } from "react";
import StageCanvas from "./StageCanvas";
import type { Engine } from "@/engine/core/Engine";
import Toolbar from "./Toolbar";

export default function EditorLayout() {
  const [engine, setEngine] = useState<Engine | null>(null);
  return (
    <div className="h-screen w-screen flex flex-col bg-background text-foreground">
      <div className="h-14 border-b flex items-center px-4">
        <Toolbar engine={engine} />
      </div>

      <div className="flex-1 flex">
        <div className="w-64 border-r">Layers</div>

        <div className="flex-1 flex items-center justify-center bg-muted">
          <StageCanvas onEngineReady={setEngine} />
        </div>

        <div className="w-72 border-l">Inspector</div>
      </div>

      <div className="h-32 border-t">Timeline (later)</div>

      <div className="absolute bottom-0 right-0 text-black text-xs p-1">
        Mophics v0.1.0 — Keyframe Recording Prototype
      </div>
    </div>
  );
}
