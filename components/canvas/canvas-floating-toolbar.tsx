"use client";

import { CameraIcon, ChevronDown, Palette, Save, Wand2 } from "lucide-react";
import { useCanvas } from "@/context/canvas-context";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import PromptInput from "../prompt-input";
import { useState } from "react";
import { parseThemeColors } from "@/lib/themes";
import ThemeSelector from "./theme-selector";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import {
  useGenerateDesignById,
  useUpdateProject,
} from "@/features/use-project-id";
import { Spinner } from "../ui/spinner";

const CanvasFloatingToolbar = ({
  projectId,
  isScreenshotting,
  onScreenshot,
}: {
  projectId: string;
  isScreenshotting: boolean;
  onScreenshot: () => void;
}) => {
  const { themes, theme: currentTheme, setTheme } = useCanvas();
  const [promptText, setPromptText] = useState<string>("");

  const { mutate, isPending } = useGenerateDesignById(projectId);
  const update = useUpdateProject(projectId);

  const handleAIGenerate = () => {
    if (!promptText) return;
    mutate(promptText);
  };

  const handleUpdate = () => {
    if (!currentTheme) return;
    update.mutate(currentTheme.id);
  };

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div
        className="w-full max-w-2xl bg-card/70 backdrop-blur-2xl
        rounded-full shadow-xl border border-border/40"
      >
        <div className="flex flex-row items-center gap-2 px-3">
          {/* AI Generate */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                size="icon-sm"
                className="px-4 rounded-2xl cursor-pointer
                  bg-foreground text-background hover:bg-foreground/90
                  shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-px"
              >
                <Wand2 className="size-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-80 p-2! rounded-xl! shadow-2xl border border-border/40 mt-1 bg-card/90 backdrop-blur-2xl"
            >
              <PromptInput
                promptText={promptText}
                setPromptText={setPromptText}
                className="min-h-[150px] ring-1! ring-border! rounded-xl! shadow-none"
                hideSubmitBtn={true}
              />
              <Button
                disabled={isPending}
                className="mt-2 w-full rounded-xl cursor-pointer
                  bg-foreground text-background hover:bg-foreground/90
                  shadow-md transition-all duration-200 font-semibold"
                onClick={handleAIGenerate}
              >
                {isPending ? <Spinner /> : <>Generate Design</>}
              </Button>
            </PopoverContent>
          </Popover>

          {/* Theme Palette */}
          <Popover>
            <PopoverTrigger>
              <div className="flex items-center gap-2 px-3 py-2">
                <Palette className="size-4 text-muted-foreground" />
                <div className="flex gap-1.5">
                  {themes?.slice(0, 4)?.map((theme, index) => {
                    const color = parseThemeColors(theme.style);
                    return (
                      <div
                        role="button"
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setTheme(theme.id);
                        }}
                        className={cn(
                          `w-6 h-6 rounded-full cursor-pointer transition-all duration-200 hover:scale-110 border border-white/10`,
                          currentTheme?.id === theme.id &&
                          "ring-2 ring-primary ring-offset-1 ring-offset-card scale-110"
                        )}
                        style={{
                          background: `linear-gradient(135deg, ${color.primary}, ${color.accent})`,
                        }}
                      />
                    );
                  })}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  +{themes?.length - 4} more
                  <ChevronDown className="size-3.5" />
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="px-0 rounded-xl shadow-2xl border border-border/40 bg-card/90 backdrop-blur-2xl"
            >
              <ThemeSelector />
            </PopoverContent>
          </Popover>

          <Separator orientation="vertical" className="h-4! bg-border/30" />

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="icon-sm"
              className="rounded-full cursor-pointer hover:bg-muted transition-all duration-200"
              disabled={isScreenshotting}
              onClick={onScreenshot}
            >
              {isScreenshotting ? (
                <Spinner />
              ) : (
                <CameraIcon className="size-4" />
              )}
            </Button>
            <Button
              variant="default"
              size="sm"
              className="rounded-full cursor-pointer gap-1.5 font-semibold
                shadow-md hover:shadow-lg transition-all duration-200"
              onClick={handleUpdate}
            >
              {update.isPending ? (
                <Spinner />
              ) : (
                <>
                  <Save className="size-3.5" />
                  Save
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanvasFloatingToolbar;
