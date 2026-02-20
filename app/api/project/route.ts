// src/app/api/inngest/route.ts
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { generateProjectName } from "@/app/action/action";
import { inngest } from "@/inngest/client";

export async function GET() {
	try {
		const { userId } = await auth();

		if (!userId) throw new Error("Unauthorized");

		const projects = await prisma.project.findMany({
			where: {
				userId,
			},
			take: 10,
			orderBy: { createdAt: "desc" },
		});

		return NextResponse.json({
			success: true,
			data: projects,
		});
	} catch (error) {
		console.log("Error occured ", error);
		return NextResponse.json(
			{
				error: "Failed to fetch projects",
			},
			{ status: 500 },
		);
	}
}

export async function POST(request: Request) {
	console.log("[POST /api/project] Started");
	try {
		const body = await request.json();
		console.log("[POST /api/project] Body parsed:", body);
		const { prompt } = body;

		const authResult = await auth();
		console.log("[POST /api/project] Auth result:", authResult);
		const { userId } = authResult;

		if (!userId) {
			console.error("[POST /api/project] Missing userId");
			throw new Error("Unauthorized");
		}
		if (!prompt) {
			console.error("[POST /api/project] Missing prompt");
			throw new Error("Missing Prompt");
		}

		console.log(
			"[POST /api/project] Generating project name for prompt:",
			prompt,
		);
		const projectName = await generateProjectName(prompt);
		console.log("[POST /api/project] Generated name:", projectName);

		console.log("[POST /api/project] Creating prisma project...");
		const project = await prisma.project.create({
			data: {
				userId,
				name: projectName,
			},
		});
		console.log("[POST /api/project] Project created with ID:", project.id);

		//Trigger the Inngest
		try {
			console.log(
				"[POST /api/project] Sending Inngest event 'ui/generate.screens'...",
			);
			await inngest.send({
				name: "ui/generate.screens",
				data: {
					userId,
					projectId: project.id,
					prompt,
				},
			});
			console.log("[POST /api/project] Inngest event sent successfully");
		} catch (error) {
			console.error("[POST /api/project] Inngest send error:", error);
			// We don't block the response if Inngest fails?
			// But maybe we should? The user prompt implies "Project failed".
			// For now, let's just log it.
		}

		return NextResponse.json({
			success: true,
			data: project,
		});
	} catch (error) {
		console.error("[POST /api/project] Critical error:", error);
		return NextResponse.json(
			{
				error: "Failed to create project",
				details: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 },
		);
	}
}
