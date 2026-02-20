import { TOOL_MODE_ENUM, ToolModeType } from "@/constant/canvas";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { HandIcon, MinusIcon, MousePointerIcon, PlusIcon } from "lucide-react";
import { Separator } from "../ui/separator";

type PropsType = {
  zoomIn: () => void;
  zoomOut: () => void;
  zoomPercent: number;
  toolMode: ToolModeType;
  setToolMode: (toolMode: ToolModeType) => void;
};

const CanvasControls = ({
  zoomIn,
  zoomOut,
  zoomPercent,
  toolMode,
  setToolMode,
}: PropsType) => {
  return (
    <div
      className="
   -translate-x-1/2 absolute bottom-4 left-1/2
   flex items-center gap-3 rounded-full border border-border/30
   bg-card/80 backdrop-blur-2xl py-1.5 px-4 shadow-xl
  "
    >
      <div className="flex items-center gap-1">
        <Button
          size="icon-sm"
          variant="ghost"
          className={cn(
            "rounded-full cursor-pointer hover:bg-muted text-foreground/70 transition-all duration-200",
            toolMode === TOOL_MODE_ENUM.SELECT && "bg-primary/10 text-primary hover:bg-primary/15"
          )}
          onClick={() => setToolMode(TOOL_MODE_ENUM.SELECT)}
        >
          <MousePointerIcon className="size-4" />
        </Button>
        <Button
          size="icon-sm"
          variant="ghost"
          className={cn(
            "rounded-full cursor-pointer hover:bg-muted text-foreground/70 transition-all duration-200",
            toolMode === TOOL_MODE_ENUM.HAND && "bg-primary/10 text-primary hover:bg-primary/15"
          )}
          onClick={() => setToolMode(TOOL_MODE_ENUM.HAND)}
        >
          <HandIcon className="size-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-5! bg-border/30" />

      <div className="flex items-center gap-1">
        <Button
          size="icon-sm"
          variant="ghost"
          className="rounded-full cursor-pointer hover:bg-muted text-foreground/70 transition-all duration-200"
          onClick={() => zoomOut()}
        >
          <MinusIcon className="size-4" />
        </Button>
        <div className="min-w-11 text-center text-sm font-medium text-foreground/60 tabular-nums">
          {zoomPercent}%
        </div>
        <Button
          size="icon-sm"
          variant="ghost"
          className="rounded-full cursor-pointer hover:bg-muted text-foreground/70 transition-all duration-200"
          onClick={() => zoomIn()}
        >
          <PlusIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
};

export default CanvasControls;
