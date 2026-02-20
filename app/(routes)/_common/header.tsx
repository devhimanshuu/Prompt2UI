"use client";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { MoonIcon, SunIcon, ArrowRightIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDark = theme === "dark";

  return (
    <div className="sticky top-0 right-0 left-0 z-50">
      <header
        className={cn(
          "h-[72px] py-4 px-6 sm:px-10 lg:px-16 transition-all duration-700 ease-out",
          scrolled
            ? "bg-background/60 backdrop-blur-3xl border-b border-border/10 shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between">
          <Logo />

          {/* Nav Links */}
          <div className="hidden flex-1 items-center justify-center gap-1 md:flex">
            {["Home", "Pricing"].map((item) => (
              <Link
                key={item}
                href="/"
                className="relative text-muted-foreground/80 text-[13px] font-heading font-bold uppercase tracking-widest px-6 py-2 rounded-full
                  hover:text-foreground transition-all duration-300
                  after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[3px]
                  after:bg-primary after:rounded-full after:transition-all after:duration-500
                  hover:after:w-6"
              >
                {item}
              </Link>
            ))}
          </div>

          <div className="flex flex-1 items-center justify-end gap-4">
            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full h-10 w-10 hover:bg-primary/5 border border-transparent hover:border-primary/10 transition-all duration-500"
              onClick={() => setTheme(isDark ? "light" : "dark")}
            >
              {mounted && (
                <div className="relative h-5 w-5">
                  <SunIcon
                    className={cn(
                      "absolute inset-0 transition-all duration-700",
                      isDark ? "scale-110 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0"
                    )}
                  />
                  <MoonIcon
                    className={cn(
                      "absolute inset-0 transition-all duration-700",
                      isDark ? "scale-0 -rotate-90 opacity-0" : "scale-110 rotate-0 opacity-100"
                    )}
                  />
                </div>
              )}
            </Button>

            {/* Auth */}
            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  className="rounded-xl px-6 h-10 gap-2.5 font-heading font-black text-[13px] uppercase tracking-wider
                  bg-foreground text-background hover:bg-foreground/90
                  shadow-2xl hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-500"
                >
                  Get Started
                  <div className="bg-background/20 rounded-md p-0.5">
                    <ArrowRightIcon className="size-3.5" />
                  </div>
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-10 w-10 ring-2 ring-primary/10 hover:ring-primary/40 p-[1px] bg-linear-to-tr from-primary/20 to-accent/20 transition-all duration-500",
                  },
                }}
              />
            </SignedIn>
          </div>
        </div>
      </header>
    </div>
  );
};


export default Header;
