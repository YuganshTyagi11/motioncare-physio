import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { generateText } from "ai";
import { createLovableAiGatewayProvider } from "../ai-gateway.server";

const Input = z.object({
  area: z.string().min(1).max(100),
  pain: z.number().min(0).max(10),
  goal: z.string().min(1).max(300),
});

export const recommendExercises = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => Input.parse(d))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const gateway = createLovableAiGatewayProvider(key);
    const model = gateway("google/gemini-3-flash-preview");

    const { text } = await generateText({
      model,
      system:
        "You are a licensed physiotherapist's assistant at MotionCare Physio. " +
        "Given an injury area, pain level, and recovery goal, recommend exactly 3 safe, " +
        "evidence-based exercises. For each, give: name, target (1 sentence), how-to (2-3 short steps), " +
        "and dosage (sets x reps or duration). Format as clean markdown with ### headings. " +
        "End with one short safety reminder. Keep total under 300 words. " +
        "Never diagnose; defer to in-person assessment for severe symptoms.",
      prompt: `Injury area: ${data.area}\nCurrent pain (0-10): ${data.pain}\nRecovery goal: ${data.goal}`,
    });

    return { recommendation: text };
  });
