import Link from "next/link";

const LogoIcon = () => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="transition-all duration-500 group-hover:scale-110 group-hover:rotate-[6deg] drop-shadow-lg"
  >
    <defs>
      {/* Warm rose-coral gradient */}
      <linearGradient id="logo-warm" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#e11d48" />
        <stop offset="45%" stopColor="#f43f5e" />
        <stop offset="100%" stopColor="#fb7185" />
      </linearGradient>

      {/* Cool teal accent */}
      <linearGradient id="logo-cool" x1="36" y1="0" x2="0" y2="36" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#14b8a6" />
        <stop offset="100%" stopColor="#2dd4bf" />
      </linearGradient>

      {/* Highlight shimmer */}
      <linearGradient id="logo-shimmer" x1="0" y1="0" x2="36" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="white" stopOpacity="0" />
        <stop offset="50%" stopColor="white" stopOpacity="0.15" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </linearGradient>

      {/* Drop shadow */}
      <filter id="icon-shadow" x="-15%" y="-15%" width="130%" height="130%">
        <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#e11d48" floodOpacity="0.25" />
      </filter>

      {/* Glow for accent elements */}
      <filter id="accent-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="1.2" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Background shape — squircle */}
    <rect
      x="0.5"
      y="0.5"
      width="35"
      height="35"
      rx="10"
      fill="url(#logo-warm)"
      filter="url(#icon-shadow)"
    />

    {/* Inner highlight border */}
    <rect
      x="1.5"
      y="1.5"
      width="33"
      height="33"
      rx="9"
      fill="none"
      stroke="white"
      strokeOpacity="0.18"
      strokeWidth="0.75"
    />

    {/* Shimmer overlay */}
    <rect
      x="0.5"
      y="0.5"
      width="35"
      height="35"
      rx="10"
      fill="url(#logo-shimmer)"
    />

    {/* ═══ Abstract "UI screens" layered composition ═══ */}

    {/* Back screen (larger, translucent) */}
    <rect
      x="11"
      y="6"
      width="19"
      height="24"
      rx="3"
      fill="white"
      fillOpacity="0.18"
      stroke="white"
      strokeOpacity="0.25"
      strokeWidth="0.5"
    />

    {/* Front screen (smaller, solid) */}
    <rect
      x="6"
      y="10"
      width="16"
      height="20"
      rx="2.5"
      fill="white"
      fillOpacity="0.92"
    />

    {/* Content lines inside front screen */}
    <rect x="9" y="14" width="8" height="1.8" rx="0.9" fill="#e11d48" fillOpacity="0.7" />
    <rect x="9" y="17.5" width="10" height="1.2" rx="0.6" fill="#374151" fillOpacity="0.35" />
    <rect x="9" y="20" width="7" height="1.2" rx="0.6" fill="#374151" fillOpacity="0.25" />

    {/* Mini button in front screen */}
    <rect x="9" y="23.5" width="6" height="3" rx="1.5" fill="#e11d48" fillOpacity="0.8" />

    {/* ═══ AI sparkle — teal accent ═══ */}
    {/* Star shape made with paths */}
    <g filter="url(#accent-glow)" transform="translate(26, 10)">
      <path
        d="M0 -3.5 L1 -1 L3.5 0 L1 1 L0 3.5 L-1 1 L-3.5 0 L-1 -1 Z"
        fill="url(#logo-cool)"
      />
    </g>

    {/* Small secondary sparkle */}
    <g transform="translate(24, 25)">
      <path
        d="M0 -2 L0.6 -0.6 L2 0 L0.6 0.6 L0 2 L-0.6 0.6 L-2 0 L-0.6 -0.6 Z"
        fill="white"
        fillOpacity="0.7"
      />
    </g>
  </svg>
);

const Logo = () => {
  return (
    <Link href="/" className="flex-1 flex items-center gap-3 group select-none">
      <div className="relative">
        <LogoIcon />
        {/* Hover glow */}
        <div className="absolute inset-0 rounded-[10px] bg-primary/0 group-hover:bg-primary/25 blur-2xl transition-all duration-700 -z-10 scale-[1.8]"></div>
      </div>

      {/* Wordmark */}
      <div className="flex items-baseline font-heading">
        <span className="text-[1.4rem] font-semibold tracking-tight text-foreground/90 transition-colors duration-300 group-hover:text-foreground">
          Prompt
        </span>
        <span className="text-[1.4rem] font-black tracking-tight bg-clip-text text-transparent bg-linear-to-br from-[#f43f5e] via-[#fb7185] to-[#fb923c]">
          2
        </span>
        <span className="text-[1.4rem] font-semibold tracking-tight text-foreground/90 transition-colors duration-300 group-hover:text-foreground">
          UI
        </span>
      </div>
    </Link>
  );
};

export default Logo;
