"use client";
import React, { memo, useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { Suggestion, Suggestions } from "@/components/ai-elements/suggestion";
import { useUser } from "@clerk/nextjs";
import PromptInput from "@/components/prompt-input";
import Header from "./header";
import { useCreateProject, useGetProjects } from "@/features/use-project";
import { Spinner } from "@/components/ui/spinner";
import { ProjectType } from "@/types/project";
import { useRouter } from "next/navigation";
import InteractiveBackground from "@/components/interactive-background";
import {
  FolderOpenDotIcon,
  ZapIcon,
  PaletteIcon,
  LayersIcon,
  ArrowUpRightIcon,
} from "lucide-react";

const LandingSection = () => {
  const { user } = useUser();
  const [promptText, setPromptText] = useState<string>("");
  const userId = user?.id;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: projects, isLoading, isError } = useGetProjects(userId);
  const { mutate, isPending } = useCreateProject();

  const suggestions = [
    {
      label: "Finance Tracker",
      icon: "💸",
      value: `Finance app statistics screen. Current balance at top with dollar amount, bar chart showing spending over months (Oct-Mar) with month selector pills below, transaction list with app icons, amounts, and categories. Bottom navigation bar. Mobile app, single screen. Style: Dark theme, chunky rounded cards, playful but professional, modern sans-serif typography, Gen Z fintech vibe. Fun and fresh, not corporate.`,
    },
    {
      label: "Fitness Activity",
      icon: "🔥",
      value: `Fitness tracker summary screen. Large central circular progress ring showing steps and calories with neon glow. Line graph showing heart rate over time. Bottom section with grid of health metrics (Sleep, Water, SpO2). Mobile app, single screen. Style: Deep Dark Mode (OLED friendly). Pitch black background with electric neon green and vibrant blue accents. High contrast, data-heavy but organized, sleek and sporty aesthetic.`,
    },
    {
      label: "Food Delivery",
      icon: "🍔",
      value: `Food delivery home feed. Top search bar with location pin. Horizontal scrolling hero carousel of daily deals. Vertical list of restaurants with large delicious food thumbnails, delivery time badges, and rating stars. Floating Action Button (FAB) for cart. Mobile app, single screen. Style: Vibrant and Appetizing. Warm colors (orange, red, yellow), rounded card corners, subtle drop shadows to create depth. Friendly and inviting UI.`,
    },
    {
      label: "Travel Booking",
      icon: "✈️",
      value: `Travel destination detail screen. Full-screen immersive photography of a tropical beach. Bottom sheet overlay with rounded top corners containing hotel title, star rating, price per night, and a large "Book Now" button. Horizontal scroll of amenity icons. Mobile app, single screen. Style: Minimalist Luxury. ample whitespace, elegant serif typography for headings, clean sans-serif for body text. Sophisticated, airy, high-end travel vibe.`,
    },
    {
      label: "E-Commerce",
      icon: "👟",
      value: `Sneaker product page. Large high-quality product image on a light gray background. Color selector swatches, size selector grid, and a sticky "Add to Cart" button at the bottom. Title and price in bold, oversized typography. Mobile app, single screen. Style: Neo-Brutalism. High contrast, thick black outlines on buttons and cards, hard shadows (no blur), unrefined geometry, bold solid colors (yellow and black). Trendy streetwear aesthetic.`,
    },
    {
      label: "Meditation",
      icon: "🧘",
      value: `Meditation player screen. Central focus is a soft, abstract breathing bubble animation. Play/Pause controls and a time slider below. Background is a soothing solid pastel sage green. Mobile app, single screen. Style: Soft Minimal. Rounded corners on everything, low contrast text for relaxation, pastel color palette, very little UI clutter. Zen, calming, and therapeutic atmosphere.`,
    },
  ];

  const handleSuggestionClick = (val: string) => {
    setPromptText(val);
  };

  const handleSubmit = () => {
    if (!promptText) return;
    mutate(promptText);
  };

  return (
    <div className="w-full min-h-screen relative" id="landing-root">
      <div className="flex flex-col">
        <Header />

        {/* ═══════════ INTERACTIVE BACKGROUND ═══════════ */}
        <InteractiveBackground />

        {/* ═══════════ HERO SECTION ═══════════ */}
        <div className="relative pt-6 sm:pt-10 lg:pt-10 2xl:pt-10 pb-10">
          <div className="max-w-[1600px] mx-auto flex flex-col items-center justify-center gap-10 px-6 sm:px-10 lg:px-16">
            {/* Announcement badge */}
            <div
              className={`inline-flex items-center gap-3 px-4 py-2 rounded-full
              border border-primary/15 bg-primary/5 backdrop-blur-xl
              transition-all duration-1000 ease-out ${mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
                }`}
            >
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
              </div>
              <span className="text-[10px] font-bold text-primary/60 uppercase">
                AI Design Made Simple
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-6 max-w-6xl mx-auto px-4 flex flex-col items-center">
              <h1
                className={`text-center font-heading font-bold text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] 2xl:text-[6.5rem]
                leading-[0.9] tracking-tighter transition-all duration-1000 delay-100 ease-out ${mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                  }`}
              >
                Turn your ideas into
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, var(--primary), #fb923c, var(--primary))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    backgroundSize: "200% auto",
                  }}
                  className="animate-gradient-shift inline-block pb-4"
                >
                  apps in seconds
                </span>
              </h1>
              <p
                className={`text-center text-muted-foreground/80 font-medium leading-relaxed text-base sm:text-xl lg:text-2xl 2xl:text-3xl max-w-3xl 2xl:max-w-5xl mx-auto transition-all duration-1000 delay-300 ease-out ${mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
                  }`}
              >
                Just describe what you want to build. Prompt2UI uses AI to design
                beautiful, modern mobile screens for your next big idea instantly.
              </p>
            </div>

            {/* ═══ Prompt Input ═══ */}
            <div
              className={`flex w-full max-w-[720px] 2xl:max-w-[1000px] flex-col items-center gap-5 relative z-10 transition-all duration-700 delay-300 ease-out ${mounted
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
                }`}
            >
              <div className="w-full">
                <PromptInput
                  promptText={promptText}
                  setPromptText={setPromptText}
                  isLoading={isPending}
                  onSubmit={handleSubmit}
                />
              </div>

              {/* Suggestion pills */}
              <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2.5 2xl:gap-4 px-4 sm:px-2 max-w-full">
                <Suggestions>
                  {suggestions.map((s) => (
                    <Suggestion
                      key={s.label}
                      suggestion={s.label}
                      className="text-[11px] sm:text-xs! h-7 sm:h-8! 2xl:h-11! px-2.5 sm:px-3.5! 2xl:px-6! rounded-full! border-border/50 bg-card/60 backdrop-blur-sm
                        hover:border-primary/30 hover:bg-primary/5 hover:text-primary 2xl:text-base!
                        transition-all duration-200 shadow-sm hover:shadow active:scale-95"
                      onClick={() => handleSuggestionClick(s.value)}
                    >
                      <span className="text-xs sm:text-sm 2xl:text-lg">{s.icon}</span>
                      <span className="whitespace-nowrap 2xl:font-medium">{s.label}</span>
                    </Suggestion>
                  ))}
                </Suggestions>
              </div>
            </div>

            {/* ═══ Feature highlights ═══ */}
            <div
              className={`grid grid-cols-1 sm:flex sm:flex-wrap justify-center items-center gap-6 sm:gap-10 2xl:gap-16 mt-8 2xl:mt-12 transition-all duration-700 delay-[450ms] ease-out ${mounted
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
                }`}
            >
              {[
                {
                  icon: ZapIcon,
                  label: "Instant Generation",
                  color: "text-amber-500",
                },
                {
                  icon: PaletteIcon,
                  label: "Beautiful Themes",
                  color: "text-primary",
                },
                {
                  icon: LayersIcon,
                  label: "Multi-Screen Flows",
                  color: "text-accent",
                },
              ].map((feature) => (
                <div
                  key={feature.label}
                  className="flex items-center gap-3 2xl:gap-4 text-muted-foreground text-sm 2xl:text-lg group/feat px-4 sm:px-0"
                >
                  <div className="flex items-center justify-center w-9 h-9 sm:w-8 sm:h-8 2xl:w-12 2xl:h-12 rounded-xl sm:rounded-lg bg-muted/60 group-hover/feat:bg-muted transition-colors duration-200 shadow-sm">
                    <feature.icon className={`size-4.5 sm:size-4 2xl:size-6 ${feature.color}`} />
                  </div>
                  <span className="font-semibold sm:font-medium">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════ RECENT PROJECTS ═══════════ */}
        <div className="w-full py-14 sm:py-24 2xl:py-32 px-6 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-[1600px]">
            {userId && (
              <div>
                {/* Section header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px flex-1 bg-linear-to-r from-transparent to-border"></div>
                  <h2 className="font-heading font-semibold text-sm tracking-widest uppercase text-muted-foreground">
                    Recent Projects
                  </h2>
                  <div className="h-px flex-1 bg-linear-to-l from-transparent to-border"></div>
                </div>

                {isLoading ? (
                  <div className="flex items-center justify-center py-16">
                    <div className="flex flex-col items-center gap-3">
                      <Spinner className="size-8 text-primary" />
                      <span className="text-sm text-muted-foreground">Loading your projects...</span>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 sm:gap-8">
                    {projects?.map((project: ProjectType) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {isError && (
              <p className="text-destructive text-center py-6 text-sm">
                Failed to load projects. Please try again.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════ PROJECT CARD ═══════════ */
const ProjectCard = memo(({ project }: { project: ProjectType }) => {
  const router = useRouter();
  const createdAtDate = new Date(project.createdAt);
  const timeAgo = formatDistanceToNow(createdAtDate, { addSuffix: true });
  const thumbnail = project.thumbnail || null;

  const onRoute = () => {
    router.push(`/project/${project.id}`);
  };

  return (
    <div
      role="button"
      className="group relative w-full flex flex-col rounded-2xl cursor-pointer overflow-hidden
      bg-card/40 backdrop-blur-md border border-border/40 shadow-sm
      hover:shadow-2xl hover:border-primary/20 hover:-translate-y-2
      transition-all duration-500 ease-out
    "
      onClick={onRoute}
    >
      {/* Thumbnail area */}
      <div className="h-44 bg-muted/20 relative overflow-hidden flex items-center justify-center">
        {thumbnail ? (
          <img
            src={thumbnail}
            className="w-full h-full object-cover object-top-left
            group-hover:scale-110 group-hover:rotate-1 transition-transform duration-1000 ease-out
          "
          />
        ) : (
          <div
            className="w-16 h-16 rounded-3xl bg-primary/5 border border-primary/10
              flex items-center justify-center text-primary/40
              group-hover:scale-110 group-hover:bg-primary/10 group-hover:text-primary
              transition-all duration-500
            "
          >
            <FolderOpenDotIcon className="size-8" />
          </div>
        )}

        {/* Premium shimmer overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="absolute inset-0 bg-linear-to-tr from-primary/5 to-accent/5" />
          <div className="absolute inset-0 animate-shimmer-sweep w-[200%] bg-linear-to-r from-transparent via-white/5 to-transparent" />
        </div>

        {/* Open indicator badge */}
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background/80 backdrop-blur-xl border border-border/20
          flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100
          transition-all duration-500 shadow-xl group-active:scale-90">
          <ArrowUpRightIcon className="size-4 text-primary" />
        </div>
      </div>

      {/* Content area */}
      <div className="p-5 flex flex-col gap-2 relative bg-card/60 backdrop-blur-xl border-t border-border/10">
        <div className="flex items-center justify-between gap-2 overflow-hidden">
          <h3 className="font-heading font-bold text-lg tracking-tight truncate text-foreground group-hover:text-primary transition-colors duration-300">
            {project.name || "Untitled Project"}
          </h3>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-1.5 rounded-full bg-primary/30 group-hover:bg-primary group-hover:animate-pulse transition-all duration-300" />
            <span className="text-xs font-medium text-muted-foreground/60 transition-colors duration-300 group-hover:text-muted-foreground">
              {timeAgo}
            </span>
          </div>

          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/30 px-2.5 py-1 rounded-md border border-border/10 group-hover:border-primary/20 group-hover:text-primary/40 transition-all duration-300">
            Design
          </span>
        </div>
      </div>

      {/* Reveal border glow on hover */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-primary/0 group-hover:ring-primary/10 transition-all duration-500 pointer-events-none" />
    </div>
  );
});


ProjectCard.displayName = "ProjectCard";

export default LandingSection;
