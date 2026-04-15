import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, Target, Trophy, X } from 'lucide-react';

const iconMap = [Sparkles, Target, Trophy];
const swipeThreshold = 90;

const RoadmapCoachModal = ({ roadmap, onClose }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = useMemo(() => (Array.isArray(roadmap?.slides) ? roadmap.slides : []), [roadmap?.slides]);
  const stages = useMemo(() => (Array.isArray(roadmap?.stages) ? roadmap.stages : []), [roadmap?.stages]);
  const current = slides[activeSlide] || slides[0];
  const CurrentIcon = iconMap[activeSlide] || Sparkles;
  const isLastSlide = activeSlide >= slides.length - 1;

  const goPrev = () => setActiveSlide((slide) => Math.max(0, slide - 1));
  const goNext = () => setActiveSlide((slide) => Math.min(slides.length - 1, slide + 1));

  useEffect(() => {
    setActiveSlide(0);
  }, [roadmap?.title]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') {
        setActiveSlide((slide) => Math.max(0, slide - 1));
      }
      if (event.key === 'ArrowRight' && !isLastSlide) {
        setActiveSlide((slide) => Math.min(slides.length - 1, slide + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLastSlide, onClose, slides.length]);

  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/65 p-3 backdrop-blur-md sm:p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/15 bg-white shadow-2xl dark:bg-slate-900"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="AI roadmap motivation slides"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${current.title}-${activeSlide}`}
            initial={{ x: 64, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -64, opacity: 0 }}
            transition={{ duration: 0.35 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_event, info) => {
              if (info.offset.x >= swipeThreshold) {
                goPrev();
              } else if (info.offset.x <= -swipeThreshold && !isLastSlide) {
                goNext();
              }
            }}
            className={`bg-gradient-to-r ${current.accent} p-6 text-white sm:p-8`}
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="inline-flex items-center gap-3 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
                <CurrentIcon className="h-4 w-4" />
                AI Learning Coach
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-white/15 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em]">
                  {activeSlide + 1}/{slides.length}
                </span>
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold"
                >
                  <X className="h-4 w-4" />
                  Close
                </button>
              </div>
            </div>

            <div className="mb-5 flex items-center gap-2">
              {slides.map((slide, index) => (
                <button
                  key={`${slide.title}-${index}`}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Open slide ${index + 1}`}
                  className={`h-2 rounded-full transition-all ${index === activeSlide ? 'w-12 bg-white' : 'w-6 bg-white/35 hover:bg-white/50'}`}
                />
              ))}
            </div>

            <h2 className="mb-3 text-2xl font-black sm:text-3xl">{current.title}</h2>
            <p className="max-w-2xl whitespace-pre-line text-sm text-white/90 sm:text-base">{current.body}</p>
            <div className="mt-5 text-xs font-medium uppercase tracking-[0.25em] text-white/75">
              Swipe or use arrow keys to move slides
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Roadmap Overview</p>
            <h3 className="mb-3 text-2xl font-bold">{roadmap.title}</h3>
            <p className="mb-6 text-foreground/70">{roadmap.summary}</p>
            <div className="mb-6 rounded-3xl bg-primary/8 p-5">
              <p className="text-sm font-semibold text-primary">Why this helps you</p>
              <p className="mt-2 text-sm text-foreground/75">{roadmap.whyItMatters}</p>
            </div>
            <div className="max-h-[320px] space-y-4 overflow-y-auto pr-1">
              {stages.map((stage) => (
                <div key={`${stage.step}-${stage.title}`} className="rounded-3xl border border-glass/40 bg-background/60 p-5">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="font-semibold">{stage.step}. {stage.title}</div>
                    <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{stage.duration}</div>
                  </div>
                  <p className="text-sm text-foreground/70">{stage.focus || stage.project || 'Stage guidance added by the AI roadmap.'}</p>
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
              {slides.map((slide, index) => (
                <button
                  key={`${slide.title}-progress-${index}`}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  className={`h-2 flex-1 rounded-full transition-all ${index === activeSlide ? 'bg-white' : 'bg-white/20'}`}
                />
              ))}
            </div>

            <div className="mb-4 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-400 to-emerald-400 transition-all"
                style={{ width: `${slides.length ? ((activeSlide + 1) / slides.length) * 100 : 0}%` }}
              />
            </div>

            <div className="mb-6 rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-white/55">Current message</p>
              <p className="mt-2 text-sm text-white/80">{current.title}</p>
            </div>

            <div className="flex items-center justify-between gap-3">
              <button
                onClick={goPrev}
                disabled={activeSlide === 0}
                className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>
              {!isLastSlide ? (
                <button
                  onClick={goNext}
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
                  Back To Dashboard
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
