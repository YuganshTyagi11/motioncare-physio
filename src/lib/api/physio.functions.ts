import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Input = z.object({
  area: z.string().min(1).max(100),
  pain: z.number().min(0).max(10),
  goal: z.string().min(1).max(300),
});

function getFallbackExercises(data: { area: string; pain: number; goal: string }): string {
  const areaLower = data.area.toLowerCase();
  
  const exercises: Record<string, string> = {
    knee: `### 1. Quad Sets (Isometric Quad Activation)
**Target:** Activates quadriceps without stressing the knee joint.
**How-to:** Sit with leg extended, towel under knee. Press knee down into towel, tightening thigh muscle. Hold 5 seconds.
**Dosage:** 3 sets × 10 reps, 3× daily

### 2. Straight Leg Raises
**Target:** Strengthens quads and hip flexors with zero knee load.
**How-to:** Lie on back, one knee bent. Lift straight leg to 45°, hold 3 seconds. Lower slowly.
**Dosage:** 3 sets × 12 reps each leg

### 3. Heel Slides
**Target:** Restores knee flexion range of motion gently.
**How-to:** Sit or lie with leg extended. Slide heel toward buttock, bending knee comfortably. Return slowly.
**Dosage:** 2 sets × 15 reps, 2× daily

⚠️ **Safety:** Stop if sharp pain >3/10. This is a starting guide — see a physiotherapist for progression.`,

    back: `### 1. Cat-Camel (Spinal Mobility)
**Target:** Restores segmental spinal motion, reduces stiffness.
**How-to:** On hands/knees. Inhale: arch back, look up. Exhale: round spine, tuck chin. Move slowly.
**Dosage:** 2 sets × 10 cycles, 3× daily

### 2. Bird Dog
**Target:** Activates deep core stabilisers (multifidus, transverse abdominis).
**How-to:** On hands/knees. Extend opposite arm/leg, keeping pelvis stable. Hold 5 seconds. Alternate.
**Dosage:** 3 sets × 8 reps each side

### 3. Pelvic Tilts
**Target:** Re-educates lumbar control, reduces anterior pelvic tilt.
**How-to:** Lie on back, knees bent. Flatten low back into floor (posterior tilt), hold 5 seconds. Release.
**Dosage:** 3 sets × 15 reps, 2× daily

⚠️ **Safety:** Avoid end-range flexion if disc-related. Not a diagnosis — book assessment for persistent symptoms.`,

    shoulder: `### 1. Pendulum (Codman) Circles
**Target:** Decompresses glenohumeral joint, restores passive motion.
**How-to:** Lean forward, supported by good arm. Let affected arm hang. Swing in small circles, gravity-assisted.
**Dosage:** 2 sets × 30 seconds each direction, 3× daily

### 2. Scapular Wall Slides
**Target:** Improves upward rotation and posterior tilt of scapula.
**How-to:** Back against wall, elbows at 90°. Slide arms up maintaining contact. Don't shrug.
**Dosage:** 3 sets × 10 reps, 2× daily

### 3. Isometric External Rotation
**Target:** Activates rotator cuff without impingement.
**How-to:** Elbow at side, 90° bent. Press back of hand into wall/doorframe. Hold 5 seconds.
**Dosage:** 3 sets × 10 reps, 3× daily

⚠️ **Safety:** Keep pain <3/10. Overhead athletes need sport-specific progression — see a physio.`,
  };

  // Match by keyword
  for (const [key, value] of Object.entries(exercises)) {
    if (areaLower.includes(key)) return value;
  }

  // Generic fallback
  return `### 1. Gentle Range of Motion
**Target:** Maintains joint mobility without aggravation.
**How-to:** Move the affected area through pain-free range. Slow, controlled movements.
**Dosage:** 2 sets × 10-15 reps, 3× daily

### 2. Isometric Activation
**Target:** Activates muscles around the area without joint motion.
**How-to:** Gently contract muscles around the painful area. Hold 5 seconds. Breathe normally.
**Dosage:** 3 sets × 10 reps, 2× daily

### 3. Diaphragmatic Breathing
**Target:** Reduces pain sensitivity, promotes relaxation.
**How-to:** Lie comfortably. Breathe into belly (not chest). Exhale longer than inhale.
**Dosage:** 5 minutes, 3× daily

⚠️ **Safety:** This is general guidance only. For your specific condition, book an in-person assessment with a licensed physiotherapist.`;
}

export const recommendExercises = createServerFn({ method: "POST" })
  .validator((d: unknown) => Input.parse(d))
  .handler(async ({ data }) => {
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    
    if (!apiKey) {
      // Fallback mode - works without API key
      const recommendation = getFallbackExercises(data);
      return { recommendation };
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const systemPrompt =
        "You are a licensed physiotherapist's assistant at MotionCare Physio. " +
        "Given an injury area, pain level, and recovery goal, recommend exactly 3 safe, " +
        "evidence-based exercises. For each, give: name, target (1 sentence), how-to (2-3 short steps), " +
        "and dosage (sets x reps or duration). Format as clean markdown with ### headings. " +
        "End with one short safety reminder. Keep total under 300 words. " +
        "Never diagnose; defer to in-person assessment for severe symptoms.";

      const userPrompt = `Injury area: ${data.area}\nCurrent pain (0-10): ${data.pain}\nRecovery goal: ${data.goal}`;

      const result = await model.generateContent(`${systemPrompt}\n\n${userPrompt}`);
      const response = await result.response;
      const text = response.text();

      return { recommendation: text };
    } catch (error) {
      console.error("AI generation failed, using fallback:", error);
      const recommendation = getFallbackExercises(data);
      return { recommendation };
    }
  });
