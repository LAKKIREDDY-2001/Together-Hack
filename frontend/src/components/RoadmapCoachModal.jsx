import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, Target, Trophy } from 'lucide-react';

const iconMap = [Sparkles, Target, Trophy];

const RoadmapCoachModal = ({ roadmap, onClose }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const current = roadmap.slides[activeSlide];
  const CurrentIcon = iconMap[activeSlide] || Sparkles;

  useEffect(() => {
    setActiveSlide(0);
  }, [roadmap.title]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-md">
      <div className="w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/15 bg-white shadow-2xl dark:bg-slate-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.title}
            initial={{ x: 64, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -64, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className={`bg-gradient-to-r ${current.accent} p-8 text-white`}
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="inline-flex items-center gap-3 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
                <CurrentIcon className="h-4 w-4" />
                AI Learning Coach
              </div>
              <button onClick={onClose} className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
                Skip
              </button>
            </div>
            <h2 className="mb-3 text-3xl font-black">{current.title}</h2>
            <p className="max-w-2xl text-sm text-white/90 sm:text-base">{current.body}</p>
          </motion.div>
        </AnimatePresence>

        <div className="grid gap-8 p-8 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Roadmap Overview</p>
            <h3 className="mb-3 text-2xl font-bold">{roadmap.title}</h3>
            <p className="mb-6 text-foreground/70">{roadmap.summary}</p>
            <div className="mb-6 rounded-3xl bg-primary/8 p-5">
              <p className="text-sm font-semibold text-primary">Why this helps you</p>
              <p className="mt-2 text-sm text-foreground/75">{roadmap.whyItMatters}</p>
            </div>
            <div className="space-y-4">
              {roadmap.stages.map((stage) => (
                <div key={stage.step} className="rounded-3xl border border-glass/40 bg-background/60 p-5">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="font-semibold">{stage.step}. {stage.title}</div>
                    <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{stage.duration}</div>
                  </div>
                  <p className="text-sm text-foreground/70">{stage.focus}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-[1.75rem] bg-slate-950 p-6 text-white">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.25em] text-white/60">Motivation</p>
              <h3 className="mb-4 text-2xl font-bold">You can turn this target into visible proof.</h3>
              <p className="text-sm text-white/75">
                Every finished skill improves your roadmap progress, boosts your dashboard score, and makes your profile stronger.
              </p>
            </div>
            <div className="my-8 flex gap-2">
              {roadmap.slides.map((slide, index) => (
                <button
                  key={slide.title}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  className={`h-2 flex-1 rounded-full transition-all ${index === activeSlide ? 'bg-white' : 'bg-white/20'}`}
                />
              ))}
            </div>
            <div className="mb-4 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-400 to-emerald-400 transition-all"
                style={{ width: `${((activeSlide + 1) / roadmap.slides.length) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => setActiveSlide((slide) => Math.max(0, slide - 1))}
                disabled={activeSlide === 0}
                className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>
              {activeSlide < roadmap.slides.length - 1 ? (
                <button
                  onClick={() => setActiveSlide((slide) => Math.min(roadmap.slides.length - 1, slide + 1))}
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 rounded-2xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950"
                >
                  Start My Roadmap
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapCoachModal;
