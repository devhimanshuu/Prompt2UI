"use server";

import { inngest } from "@/inngest/client";
import { getSubscriptionToken } from "@inngest/realtime";
import { auth } from "@clerk/nextjs/server";

export async function fetchRealtimeSubscriptionToken() {
	const { userId } = await auth();
	if (!userId) throw new Error("Unauthorized");

	// This creates a token using the Inngest API that is bound to the channel and topic:
	const token = await getSubscriptionToken(inngest, {
		channel: `user:${userId}`,
		topics: [
			"generation.start",
			"analysis.start",
			"analysis.complete",
			"frame.created",
			"generation.complete",
		],
	});

	return token;
}
