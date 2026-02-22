export default function EditorLayout() {
  return (
    <div className="h-screen w-screen flex flex-col bg-background text-foreground">
      <div className="h-14 border-b flex items-center px-4">Toolbar</div>

      <div className="flex-1 flex">
        <div className="w-64 border-r">Layers</div>

        <div className="flex-1 flex items-center justify-center bg-muted">
          Stage
        </div>

        <div className="w-72 border-l">Inspector</div>
      </div>

      <div className="h-32 border-t">Timeline (later)</div>
    </div>
  );
}
