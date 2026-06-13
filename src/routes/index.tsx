import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  ArrowRight,
  CalendarCheck,
  ClipboardList,
  PlayCircle,
  Activity,
  Sparkles,
  Loader2,
  Quote,
} from "lucide-react";

import heroImg from "@/assets/hero-physio.jpg";
import ex1 from "@/assets/exercise-1.jpg";
import ex2 from "@/assets/exercise-2.jpg";
import ex3 from "@/assets/exercise-3.jpg";
import { recommendExercises } from "@/lib/api/physio.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MotionCare Physio — Move better. Recover stronger." },
      {
        name: "description",
        content:
          "Personalised physiotherapy with online booking, tailored treatment plans, guided exercise videos, recovery tracking, and an AI exercise assistant.",
      },
      { property: "og:title", content: "MotionCare Physio" },
      {
        property: "og:description",
        content:
          "Move better. Recover stronger. Personalised physiotherapy, online booking, and an AI exercise assistant.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Marquee />
      <Features />
      <TreatmentPlans />
      <ExerciseVideos />
      <RecoveryTracking />
      <AIAssistant />
      <Testimonial />
      <Booking />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/60">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2">
          <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-emerald shadow-soft">
            <span className="absolute inset-0 rounded-full bg-accent/40 animate-pulse-ring" />
            <Activity className="h-4 w-4 text-primary-foreground relative" />
          </span>
          <span className="font-serif text-xl tracking-tight">MotionCare</span>
          <span className="hidden sm:inline text-xs text-muted-foreground uppercase tracking-[0.2em]">
            Physio
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition">Care</a>
          <a href="#plans" className="hover:text-foreground transition">Plans</a>
          <a href="#exercises" className="hover:text-foreground transition">Library</a>
          <a href="#assistant" className="hover:text-foreground transition">AI Assistant</a>
        </nav>
        <a
          href="#book"
          className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground text-sm px-5 py-2.5 hover:bg-accent transition shadow-soft"
        >
          Book a session <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-12 gap-10 px-6 pt-20 pb-28">
        <div className="lg:col-span-7 flex flex-col justify-center">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-accent">
            <span className="h-px w-8 bg-accent" /> Est. 2014 — London
          </span>
          <h1 className="text-display mt-6 text-[clamp(3rem,7vw,6.5rem)] text-foreground">
            Move better.<br />
            <em className="text-accent">Recover</em> stronger.
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
            One-on-one physiotherapy designed around your body, your goals, and the
            life you want to get back to — guided by therapists and supported by
            intelligent recovery tools.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#book"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 hover:bg-accent transition shadow-elegant"
            >
              Book your assessment <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#assistant"
              className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 hover:border-accent transition"
            >
              <Sparkles className="h-4 w-4 text-accent" />
              Ask the AI assistant
            </a>
          </div>
          <div className="mt-14 flex items-center gap-10 text-sm">
            <Stat n="12k+" l="Recoveries guided" />
            <span className="h-10 w-px bg-border" />
            <Stat n="4.9★" l="Patient rating" />
            <span className="h-10 w-px bg-border" />
            <Stat n="94%" l="Return to activity" />
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-elegant">
            <img
              src={heroImg}
              alt="Physiotherapist guiding a patient through a stretching movement"
              width={1600}
              height={1200}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-8 -left-6 max-w-[260px] rounded-2xl bg-card p-5 shadow-elegant border border-border/70 animate-float">
            <div className="flex items-center gap-3">
              <span className="h-10 w-10 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
                <Activity className="h-5 w-5 text-gold-foreground" />
              </span>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Today</div>
                <div className="font-serif text-lg leading-tight">Knee mobility, week 3</div>
              </div>
            </div>
            <div className="mt-4 h-1.5 rounded-full bg-muted overflow-hidden">
              <div className="h-full w-[72%] bg-gradient-emerald rounded-full" />
            </div>
            <div className="mt-2 text-xs text-muted-foreground">72% recovered</div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-gold/15 blur-3xl" />
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="font-serif text-3xl text-foreground">{n}</div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{l}</div>
    </div>
  );
}

function Marquee() {
  const items = ["NHS-trained therapists", "Sports-injury specialists", "Post-op rehab", "Pre-natal care", "Manual therapy", "Dry needling"];
  return (
    <div className="border-y border-border/60 bg-secondary/50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-5 flex items-center gap-10 text-xs uppercase tracking-[0.25em] text-muted-foreground overflow-hidden whitespace-nowrap">
        {items.concat(items).map((it, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="h-1 w-1 rounded-full bg-accent" />
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}

function Features() {
  const items = [
    { icon: CalendarCheck, t: "Online booking", d: "Reserve assessments and follow-ups in under a minute. Reschedule any time." },
    { icon: ClipboardList, t: "Treatment plans", d: "Therapist-built, weekly-adjusted plans tailored to your diagnosis and pace." },
    { icon: PlayCircle, t: "Exercise videos", d: "Hundreds of guided movements filmed with our clinical team — clear cues, every angle." },
    { icon: Activity, t: "Recovery tracking", d: "See pain, range of motion, and strength trend across every session." },
  ];
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-28">
      <div className="grid md:grid-cols-12 gap-10 items-end mb-16">
        <h2 className="md:col-span-7 text-display text-5xl md:text-6xl">
          Care that <em className="text-accent">follows</em> you,<br />beyond the clinic.
        </h2>
        <p className="md:col-span-5 text-muted-foreground text-lg">
          Every patient gets a digital recovery space — your plan, your videos,
          your progress, all in one calm place.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map(({ icon: Icon, t, d }) => (
          <div
            key={t}
            className="group relative rounded-2xl border border-border/70 bg-card p-7 hover:border-accent/60 hover:shadow-soft transition"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-emerald text-primary-foreground shadow-soft">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-6 font-serif text-2xl">{t}</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{d}</p>
            <div className="absolute inset-x-7 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
          </div>
        ))}
      </div>
    </section>
  );
}

function TreatmentPlans() {
  const plans = [
    {
      name: "Reset",
      tag: "Acute injury",
      price: "£85",
      per: "/session",
      points: ["60-min one-to-one assessment", "Hands-on treatment", "At-home exercise plan", "Weekly check-ins"],
      featured: false,
    },
    {
      name: "Restore",
      tag: "Most chosen",
      price: "£240",
      per: "/month",
      points: ["3 in-clinic sessions", "Custom video programme", "Recovery tracking dashboard", "AI exercise assistant", "Direct therapist messaging"],
      featured: true,
    },
    {
      name: "Perform",
      tag: "Return to sport",
      price: "£420",
      per: "/month",
      points: ["Weekly clinic sessions", "Movement screening", "Strength & conditioning plan", "Match-day readiness checks"],
      featured: false,
    },
  ];
  return (
    <section id="plans" className="bg-gradient-cream py-28 relative grain">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-accent">Treatment plans</span>
          <h2 className="text-display text-5xl md:text-6xl mt-4">A plan for every <em className="text-accent">stage</em>.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-3xl p-8 border transition ${
                p.featured
                  ? "bg-primary text-primary-foreground border-primary shadow-elegant scale-[1.02]"
                  : "bg-card border-border hover:shadow-soft"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className={`font-serif text-3xl ${p.featured ? "text-primary-foreground" : ""}`}>{p.name}</h3>
                <span
                  className={`text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full ${
                    p.featured ? "bg-gold text-gold-foreground" : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {p.tag}
                </span>
              </div>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-serif text-5xl">{p.price}</span>
                <span className={`text-sm ${p.featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{p.per}</span>
              </div>
              <ul className="mt-8 space-y-3 text-sm">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-3">
                    <span className={`mt-2 h-1 w-1 rounded-full ${p.featured ? "bg-gold" : "bg-accent"}`} />
                    <span className={p.featured ? "text-primary-foreground/90" : ""}>{pt}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#book"
                className={`mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm transition ${
                  p.featured
                    ? "bg-gold text-gold-foreground hover:bg-gold/90 shadow-gold"
                    : "bg-primary text-primary-foreground hover:bg-accent"
                }`}
              >
                Choose {p.name} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExerciseVideos() {
  const vids = [
    { img: ex1, t: "Banded knee mobility", d: "Rehab · 6 min", level: "Beginner" },
    { img: ex2, t: "Hip & hamstring flow", d: "Mobility · 9 min", level: "Intermediate" },
    { img: ex3, t: "Restorative roll-out", d: "Recovery · 12 min", level: "All levels" },
  ];
  return (
    <section id="exercises" className="mx-auto max-w-7xl px-6 py-28">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-accent">Exercise library</span>
          <h2 className="text-display text-5xl md:text-6xl mt-4">Guided by our <em>clinical</em> team.</h2>
        </div>
        <a href="#" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-2">
          Browse 240+ videos <ArrowRight className="h-4 w-4" />
        </a>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {vids.map((v) => (
          <article key={v.t} className="group relative rounded-3xl overflow-hidden bg-card border border-border/70">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={v.img}
                alt={v.t}
                loading="lazy"
                width={1024}
                height={1280}
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
              <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-background/80 backdrop-blur text-foreground">
                {v.level}
              </span>
              <button
                aria-label={`Play ${v.t}`}
                className="absolute inset-0 m-auto h-16 w-16 rounded-full bg-background/90 backdrop-blur flex items-center justify-center shadow-elegant hover:bg-gold hover:text-gold-foreground transition"
              >
                <PlayCircle className="h-7 w-7" />
              </button>
              <div className="absolute bottom-5 left-5 right-5 text-primary-foreground">
                <div className="text-xs uppercase tracking-widest opacity-80">{v.d}</div>
                <h3 className="font-serif text-2xl mt-1">{v.t}</h3>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function RecoveryTracking() {
  const weeks = [25, 40, 35, 55, 60, 72, 78, 85];
  return (
    <section className="bg-primary text-primary-foreground py-28 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-gold">Recovery tracking</span>
          <h2 className="text-display text-5xl md:text-6xl mt-4">
            See your body <em className="text-gold">come back</em>.
          </h2>
          <p className="mt-6 text-primary-foreground/80 text-lg leading-relaxed max-w-lg">
            Track pain levels, range of motion, and strength milestones. Your therapist
            sees the same dashboard, so every session picks up exactly where you left off.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
            <Metric n="-68%" l="Pain" />
            <Metric n="+42°" l="Range" />
            <Metric n="+31%" l="Strength" />
          </div>
        </div>

        <div className="relative rounded-3xl bg-background text-foreground p-8 shadow-elegant">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Recovery progress</div>
              <div className="font-serif text-2xl mt-1">Lower back — 8 weeks</div>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-accent/15 text-accent">On track</span>
          </div>
          <div className="mt-8 flex items-end gap-3 h-48">
            {weeks.map((w, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-md bg-gradient-emerald"
                  style={{ height: `${w}%` }}
                />
                <span className="text-[10px] text-muted-foreground">W{i + 1}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4 text-sm">
            <Mini t="Next session" v="Tue, 10:30" />
            <Mini t="Therapist" v="Dr. Aoife L." />
            <Mini t="Plan day" v="3 of 7" />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gold/10 blur-3xl" />
    </section>
  );
}

function Metric({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="font-serif text-4xl text-gold">{n}</div>
      <div className="text-xs uppercase tracking-widest text-primary-foreground/70 mt-1">{l}</div>
    </div>
  );
}
function Mini({ t, v }: { t: string; v: string }) {
  return (
    <div className="rounded-xl bg-secondary p-3">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{t}</div>
      <div className="font-serif text-base mt-1">{v}</div>
    </div>
  );
}

function AIAssistant() {
  const recommend = useServerFn(recommendExercises);
  const [area, setArea] = useState("Lower back");
  const [pain, setPain] = useState(4);
  const [goal, setGoal] = useState("Return to running 5k pain-free");

  const m = useMutation({
    mutationFn: () => recommend({ data: { area, pain, goal } }),
  });

  return (
    <section id="assistant" className="mx-auto max-w-7xl px-6 py-28">
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-accent">
            <Sparkles className="h-3.5 w-3.5" /> AI Exercise Assistant
          </span>
          <h2 className="text-display text-5xl md:text-6xl mt-4">
            Three exercises,<br /><em className="text-accent">in seconds</em>.
          </h2>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            Tell us where it hurts and what you want to get back to. Our AI assistant —
            trained alongside our clinical team — drafts a safe, evidence-based starting
            point you can take to your therapist.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            Not a substitute for in-person assessment. For severe symptoms, book a session.
          </p>
        </div>

        <div className="lg:col-span-7 rounded-3xl border border-border bg-card p-8 md:p-10 shadow-soft">
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Injury area">
              <input
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition"
                placeholder="e.g. Right knee"
              />
            </Field>
            <Field label={`Pain level — ${pain}/10`}>
              <input
                type="range"
                min={0}
                max={10}
                value={pain}
                onChange={(e) => setPain(Number(e.target.value))}
                className="w-full accent-[oklch(0.50_0.10_165)] mt-3"
              />
            </Field>
            <div className="md:col-span-2">
              <Field label="Recovery goal">
                <textarea
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  rows={2}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition resize-none"
                  placeholder="What do you want to get back to?"
                />
              </Field>
            </div>
          </div>

          <button
            onClick={() => m.mutate()}
            disabled={m.isPending}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 hover:bg-accent transition shadow-soft disabled:opacity-60"
          >
            {m.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Drafting your plan…
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" /> Recommend exercises
              </>
            )}
          </button>

          {m.isError && (
            <p className="mt-4 text-sm text-destructive">
              Couldn't reach the assistant. Please try again in a moment.
            </p>
          )}

          {m.data && (
            <div className="mt-8 rounded-2xl bg-gradient-cream border border-border p-6 relative grain">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-accent mb-4">
                <Sparkles className="h-3.5 w-3.5" /> Your starting plan
              </div>
              <article className="prose prose-sm max-w-none prose-headings:font-serif prose-headings:text-foreground prose-headings:mt-5 prose-headings:mb-2 prose-p:text-foreground/80 prose-strong:text-foreground prose-li:text-foreground/80">
                <ReactMarkdown>{m.data.recommendation}</ReactMarkdown>
              </article>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function Testimonial() {
  return (
    <section className="bg-secondary/60 py-28">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Quote className="h-10 w-10 text-accent mx-auto" />
        <p className="text-display text-3xl md:text-5xl mt-8 leading-tight">
          "I came in unable to run. Twelve weeks later I finished a half marathon.
          The plan adjusted with me, every single week."
        </p>
        <div className="mt-10 text-sm uppercase tracking-[0.25em] text-muted-foreground">
          Maya R. — patient, 2025
        </div>
      </div>
    </section>
  );
}

function Booking() {
  return (
    <section id="book" className="mx-auto max-w-7xl px-6 py-28">
      <div className="rounded-3xl bg-primary text-primary-foreground p-10 md:p-16 relative overflow-hidden shadow-elegant">
        <div className="grid md:grid-cols-2 gap-10 items-center relative">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-gold">Online booking</span>
            <h2 className="text-display text-5xl md:text-6xl mt-4">
              Start your <em className="text-gold">recovery</em> this week.
            </h2>
            <p className="mt-6 text-primary-foreground/80 text-lg max-w-md">
              60-minute assessments available Monday to Saturday. Most patients book
              their first session within 48 hours.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="bg-background text-foreground rounded-2xl p-6 md:p-8 shadow-elegant space-y-4"
          >
            <Field label="Full name">
              <input className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition" placeholder="Jane Doe" />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Preferred date">
                <input type="date" className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition" />
              </Field>
              <Field label="Time">
                <select className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition">
                  <option>09:00</option><option>10:30</option><option>12:00</option>
                  <option>14:30</option><option>16:00</option><option>17:30</option>
                </select>
              </Field>
            </div>
            <Field label="What's going on?">
              <textarea rows={3} className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition resize-none" placeholder="Brief description of your symptoms or goal" />
            </Field>
            <button className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold text-gold-foreground px-6 py-3.5 hover:opacity-90 transition shadow-gold">
              Confirm booking <CalendarCheck className="h-4 w-4" />
            </button>
          </form>
        </div>
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-gold/15 blur-3xl" />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-12 flex flex-wrap items-center justify-between gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="h-7 w-7 rounded-full bg-gradient-emerald flex items-center justify-center">
            <Activity className="h-3.5 w-3.5 text-primary-foreground" />
          </span>
          <span className="font-serif text-base text-foreground">MotionCare Physio</span>
        </div>
        <div>© {new Date().getFullYear()} MotionCare Clinic Ltd. — London</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Terms</a>
          <a href="#book" className="hover:text-foreground">Book</a>
        </div>
      </div>
    </footer>
  );
}
