"use client";
import React from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, MoonIcon, SunIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const Header = ({ projectName }: { projectName?: string }) => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";

  return (
    <div className="sticky top-0 z-40">
      <header className="border-b border-border/30 bg-card/50 backdrop-blur-2xl shadow-sm">
        <div className="flex items-center justify-between px-4 py-2.5">
          <div className="flex items-center gap-3">
            <Logo />
            <div className="h-5 w-px bg-border/50 mx-1"></div>
            <Button
              size="icon-sm"
              variant="ghost"
              className="rounded-full hover:bg-muted transition-colors duration-200"
              onClick={() => router.push("/")}
            >
              <ArrowLeftIcon className="size-4" />
            </Button>
            <p className="max-w-[220px] truncate font-medium text-sm text-foreground/80">
              {projectName || "Untitled Project"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full h-8 w-8 hover:bg-muted transition-all duration-300"
              onClick={() => setTheme(isDark ? "light" : "dark")}
            >
              {mounted && (
                <>
                  <SunIcon
                    className={cn(
                      "absolute h-4 w-4 transition-all duration-500",
                      isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"
                    )}
                  />
                  <MoonIcon
                    className={cn(
                      "absolute h-4 w-4 transition-all duration-500",
                      isDark ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
                    )}
                  />
                </>
              )}
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
