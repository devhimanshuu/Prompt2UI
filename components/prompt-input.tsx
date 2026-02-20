"use client";

import { cn } from "@/lib/utils";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "./ui/input-group";
import { ArrowUpIcon, SparklesIcon, Wand2Icon } from "lucide-react";
import { Spinner } from "./ui/spinner";
import React, { useState } from "react";

interface PropsType {
  promptText: string;
  setPromptText: (value: string) => void;
  isLoading?: boolean;
  className?: string;
  hideSubmitBtn?: boolean;
  onSubmit?: () => void;
}

const PromptInput = ({
  promptText,
  setPromptText,
  isLoading,
  className,
  hideSubmitBtn = false,
  onSubmit,
}: PropsType) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={cn("relative w-full group transition-all duration-500", className)}>
      {/* 🔮 MULTI-LAYER GLOW EFFECTS */}
      {/* 1. Underlying large ambient glow */}
      <div
        className={cn(
          "absolute -inset-4 bg-linear-to-br from-primary/20 via-transparent to-accent/20 rounded-[32px] blur-3xl transition-all duration-1000 select-none pointer-events-none opacity-0 group-hover:opacity-100",
          isFocused ? "opacity-100 scale-105" : "scale-100"
        )}
      />

      {/* 2. Focused border glow ring */}
      <div
        className={cn(
          "absolute -inset-[1px] bg-linear-to-r from-primary/40 via-accent/40 to-primary/40 rounded-2xl transition-all duration-700 opacity-0 group-focus-within:opacity-100",
          isFocused ? "blur-sm" : "blur-none"
        )}
      />

      <div className="relative flex flex-col w-full overflow-hidden rounded-2xl bg-card/60 backdrop-blur-2xl border border-border/40 shadow-2xl transition-all duration-500 group-hover:bg-card/75 group-focus-within:bg-card/85">
        <InputGroup className="bg-transparent border-none shadow-none min-h-[160px] flex flex-col w-full">
          <InputGroupTextarea
            className="text-base sm:text-lg! font-medium py-5! px-5! placeholder:text-muted-foreground/40 placeholder:font-normal selection:bg-primary/20"
            placeholder="What would you like to build? (e.g. A gym tracker app with a dark mode glassmorphism UI...)"
            value={promptText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => {
              setPromptText(e.target.value);
            }}
          />

          <InputGroupAddon
            align="block-end"
            className="flex items-center justify-between gap-4 p-4 mt-auto border-t border-border/10"
          >
            <div className="flex items-center gap-2 pr-2">
              <div className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 transition-all duration-300 group-focus-within:bg-primary/15 group-focus-within:border-primary/30">
                <SparklesIcon className="size-3.5 text-primary animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary/80">
                  AI-Powered
                </span>
              </div>

              <div className="hidden sm:flex items-center gap-1 text-[11px] text-muted-foreground/40 font-medium pl-2">
                <Wand2Icon className="size-3" />
                <span>Magic Prompt Active</span>
              </div>
            </div>

            {!hideSubmitBtn && (
              <InputGroupButton
                variant="default"
                className={cn(
                  "h-11 rounded-xl px-5 transition-all duration-500 gap-2.5 font-bold tracking-tight shadow-xl",
                  "bg-foreground text-background hover:bg-foreground/90 active:scale-95 disabled:opacity-50 disabled:active:scale-100",
                  promptText?.trim() ? "translate-y-0 opacity-100" : "translate-y-0",
                  isFocused && promptText?.trim() ? "glow-primary shadow-primary/20" : ""
                )}
                size="sm"
                disabled={!promptText?.trim() || isLoading}
                onClick={() => onSubmit?.()}
              >
                {isLoading ? (
                  <Spinner className="size-5" />
                ) : (
                  <>
                    <span className="font-heading">Generate UI</span>
                    <div className="bg-background/20 rounded-lg p-1">
                      <ArrowUpIcon className="size-3.5 text-background" />
                    </div>
                  </>
                )}
              </InputGroupButton>
            )}
          </InputGroupAddon>
        </InputGroup>

        {/* Subtle background animated mesh for the input area */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none -z-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="input-mesh" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.8" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#input-mesh)" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PromptInput;
