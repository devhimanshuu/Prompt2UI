import { generateText, stepCountIs } from "ai";
import { inngest } from "../client";
import { openrouter } from "@/lib/openrouter";
import { groq } from "@/lib/groq";
import { GENERATION_SYSTEM_PROMPT } from "@/lib/prompt";
import prisma from "@/lib/prisma";
import { BASE_VARIABLES, THEME_LIST } from "@/lib/themes";
import { unsplashTool } from "../tool";

export const regenerateFrame = inngest.createFunction(
	{ id: "regenerate-frame" },
	{ event: "ui/regenerate.frame" },
	async ({ event, step, publish }) => {
		const {
			userId,
			projectId,
			frameId,
			prompt,
			theme: themeId,
			frame,
		} = event.data;
		const CHANNEL = `user:${userId}`;

		await publish({
			channel: CHANNEL,
			topic: "generation.start",
			data: {
				status: "generating",
				projectId: projectId,
			},
		});

		// Generate new frame with the user's prompt
		const updatedFrame = await step.run("regenerate-screen", async () => {
			const selectedTheme = THEME_LIST.find((t) => t.id === themeId);

			//Combine the Theme Styles + Base Variable
			const fullThemeCSS = `
        ${BASE_VARIABLES}
        ${selectedTheme?.style || ""}
      `;

			const result = await generateText({
				model: groq("moonshotai/kimi-k2-instruct") as any,
				system: GENERATION_SYSTEM_PROMPT,
				tools: {
					searchUnsplash: unsplashTool,
				},
				stopWhen: stepCountIs(5),
				prompt: `
        USER REQUEST: ${prompt}

        ORIGINAL SCREEN TITLE: ${frame.title}
        ORIGINAL SCREEN HTML: ${frame.htmlContent}

        THEME VARIABLES (Reference ONLY - already defined in parent, do NOT redeclare these): ${fullThemeCSS}


        CRITICAL REQUIREMENTS A MUST - READ CAREFULLY:
        - **DO NOT BE LAZY.** Maintain high fidelity. Ensure the final result is a complete, polished UI. 
        1. **PRESERVE the overall structure and layout - ONLY modify what the user explicitly requested**
          - Keep all existing components, styling, and layout that are NOT mentioned in the user request
          - Only change the specific elements the user asked for
          - Do not add or remove sections unless requested
          - Maintain the exact same HTML structure and CSS classes except for requested changes

        2. **Generate ONLY raw HTML markup for this mobile app screen using Tailwind CSS.**
          Use Tailwind classes for layout, spacing, typography, shadows, etc.
          Use theme CSS variables ONLY for color-related properties (bg-[var(--background)], text-[var(--foreground)], border-[var(--border)], ring-[var(--ring)], etc.)
        3. **All content must be inside a single root <div> that controls the layout.**
          - No overflow classes on the root.
          - All scrollable content must be in inner containers with hidden scrollbars: [&::-webkit-scrollbar]:hidden scrollbar-none
        4. **For absolute overlays (maps, bottom sheets, modals, etc.):**
          - Use \`relative w-full h-screen\` on the top div of the overlay.
        5. **For regular content:**
          - Use \`w-full h-full min-h-screen\` on the top div.
        6. **Do not use h-screen on inner content unless absolutely required.**
          - Height must grow with content; content must be fully visible inside an iframe.
        7. **For z-index layering:**
          - Ensure absolute elements do not block other content unnecessarily.
        8. **Output raw HTML only, starting with <div>.**
          - Do not include markdown, comments, <html>, <body>, or <head>.
        9. **Ensure iframe-friendly rendering:**
            - All elements must contribute to the final scrollHeight so your parent iframe can correctly resize.
        Generate the complete, production-ready HTML for this screen now
        `.trim(),
			});

			let finalHtml = result.text ?? "";

			// More robust HTML extraction
			const markdownMatch = finalHtml.match(/```html\s*([\s\S]*?)\s*```/);
			if (markdownMatch) {
				finalHtml = markdownMatch[1];
			} else {
				const divMatch = finalHtml.match(/<div[\s\S]*<\/div>/);
				if (divMatch) {
					finalHtml = divMatch[0];
				}
			}

			finalHtml = finalHtml.replace(/```/g, "").trim();

			// Update the frame
			const updated = await prisma.frame.update({
				where: {
					id: frameId,
				},
				data: {
					htmlContent: finalHtml,
				},
			});

			await publish({
				channel: CHANNEL,
				topic: "frame.created",
				data: {
					frame: updated,
					screenId: frameId,
					projectId: projectId,
				},
			});

			return updated;
		});

		await publish({
			channel: CHANNEL,
			topic: "generation.complete",
			data: {
				status: "completed",
				projectId: projectId,
			},
		});

		return { success: true, frame: updatedFrame };
	},
);
