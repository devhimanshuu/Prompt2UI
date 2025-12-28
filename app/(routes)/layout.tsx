import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "@/app/globals.css";

const jostSans = Jost({weight: ["400", "500", "600", "700", "800", "900"],});

export const metadata: Metadata = {
  title: "Prompt2UI",
  description: "Prompt2UI is a tool that helps you create UI components from prompts.",
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
