import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  IndianRupee,
  Languages,
  LocateFixed,
  LogIn,
  Mic,
  Package,
  Play,
  Recycle,
  ShieldCheck,
  Sparkles,
  WalletCards,
  WifiOff,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import useTranslation from "../../i18n/useTranslation";
import { speakLearningText } from "./learningVoice";
import { LEARNING_STEPS } from "./learningData";
import LearningHeader from "./LearningHeader";

const LearningPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [currentStep, setCurrentStep] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const step = LEARNING_STEPS[currentStep];

  const progress = useMemo(
    () =>
      Math.round(
        ((currentStep + 1) / LEARNING_STEPS.length) * 100
      ),
    [currentStep]
  );

  const handleSpeak = () => {
    const text = [
      t(step.titleKey),
      t(step.descriptionKey),
      ...(step.points || []).map((point) => t(point)),
    ].join(". ");

    speakLearningText(text, {
      lang:
        document.documentElement.lang ||
        "hi-IN",
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  const handleNext = () => {
    if (currentStep < LEARNING_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
      return;
    }

    navigate("/collector/login");
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const Icon = step.icon;

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">

      <LearningHeader
  currentStep={currentStep}
  totalSteps={LEARNING_STEPS.length}
/>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        {/* INTRO */}
        <section className="mb-6">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--primary)]/15 bg-[var(--accent)] px-3 py-1 text-[10px] font-bold text-[var(--primary)]">
              <CircleHelp size={13} />
              {t("learning.badge")}
            </span>

            <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl">
              {t("learning.heading")}
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)] sm:text-base">
              {t("learning.subheading")}
            </p>
          </div>
        </section>

        {/* PROGRESS */}
        <section className="mb-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-[var(--muted)]">
                {t("learning.stepLabel")}
              </p>

              <p className="mt-0.5 text-sm font-black">
                {currentStep + 1} / {LEARNING_STEPS.length}
              </p>
            </div>

            <span className="rounded-full bg-[var(--surface-soft)] px-2.5 py-1 text-[10px] font-bold text-[var(--primary)]">
              {progress}%
            </span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--border)]">
            <div
              className="h-full rounded-full bg-[var(--primary)] transition-all duration-300"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </section>

        {/* CURRENT LESSON */}
        <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Visual */}
          <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[var(--accent)] blur-3xl" />

            <div className="relative flex min-h-[280px] flex-col items-center justify-center p-6 text-center sm:min-h-[340px]">
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-[var(--accent)] text-[var(--primary)] shadow-sm sm:h-28 sm:w-28">
                <Icon
                  size={48}
                  strokeWidth={1.8}
                />
              </div>

              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
                {t("learning.listenLabel")}
              </p>

              <button
                type="button"
                onClick={handleSpeak}
                className={`
                  mt-3 inline-flex min-h-12 items-center gap-2 rounded-2xl px-5 py-3
                  text-sm font-bold transition active:scale-[0.98]
                  ${
                    isSpeaking
                      ? "bg-amber-100 text-amber-700"
                      : "bg-[var(--primary)] text-[var(--primary-foreground)]"
                  }
                `}
              >
                <Mic
                  size={18}
                  className={
                    isSpeaking
                      ? "animate-pulse"
                      : ""
                  }
                />

                {isSpeaking
                  ? t("learning.stopListening")
                  : t("learning.listen")}
              </button>

              <p className="mt-3 max-w-xs text-[11px] leading-5 text-[var(--muted)]">
                {t("learning.voiceHint")}
              </p>
            </div>
          </div>

          {/* Explanation */}
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--primary)]">
                  {t("learning.simpleStep")}
                </span>

                <h2 className="mt-2 text-xl font-black tracking-tight sm:text-2xl">
                  {t(step.titleKey)}
                </h2>
              </div>

              <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-soft)] text-[var(--muted)] sm:flex">
                <Languages size={18} />
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-[var(--muted)] sm:text-base">
              {t(step.descriptionKey)}
            </p>

            <div className="mt-5 space-y-3">
              {step.points.map((pointKey) => (
                <div
                  key={pointKey}
                  className="flex items-start gap-3 rounded-2xl bg-[var(--surface-soft)] p-3.5"
                >
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)] text-[var(--primary)]">
                    <span className="text-xs font-black">
                      ✓
                    </span>
                  </div>

                  <p className="text-xs leading-5 text-[var(--foreground)] sm:text-sm">
                    {t(pointKey)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* QUICK BENEFITS */}
        <section className="mt-6">
          <div className="mb-3">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
              {t("learning.quickTitle")}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: IndianRupee,
                title: "learning.quickPrice",
              },
              {
                icon: Recycle,
                title: "learning.quickRecycler",
              },
              {
                icon: WalletCards,
                title: "learning.quickPayment",
              },
              {
                icon: ShieldCheck,
                title: "learning.quickSafety",
              },
            ].map((item) => {
              const ItemIcon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--primary)]">
                    <ItemIcon size={18} />
                  </div>

                  <p className="mt-3 text-sm font-bold">
                    {t(item.title)}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* OFFLINE NOTE */}
        <section className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-amber-700">
              <WifiOff size={17} />
            </div>

            <div>
              <p className="text-sm font-bold text-amber-900">
                {t("learning.offlineTitle")}
              </p>

              <p className="mt-1 text-xs leading-5 text-amber-800">
                {t("learning.offlineText")}
              </p>
            </div>
          </div>
        </section>

        {/* NAVIGATION */}
        <section className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 text-sm font-semibold text-[var(--foreground)] transition hover:bg-[var(--surface-soft)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={18} />
            {t("learning.previous")}
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-5 text-sm font-bold text-[var(--primary-foreground)] shadow-sm transition hover:opacity-90 active:scale-[0.98]"
          >
            {currentStep ===
            LEARNING_STEPS.length - 1
              ? t("learning.startUsing")
              : t("learning.next")}

            {currentStep ===
            LEARNING_STEPS.length - 1 ? (
              <LogIn size={17} />
            ) : (
              <ChevronRight size={17} />
            )}
          </button>
        </section>

        {/* LOGIN / SIGNUP */}
        <section className="mt-8 rounded-3xl border border-[var(--primary)]/15 bg-[var(--accent)] p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-black">
                {t("learning.readyTitle")}
              </p>

              <p className="mt-1 text-xs leading-5 text-[var(--muted)] sm:text-sm">
                {t("learning.readyText")}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() =>
                  navigate("/collector/login")
                }
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 text-xs font-bold text-[var(--foreground)]"
              >
                <LogIn size={15} />
                {t("learning.login")}
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/collector/signup")
                }
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-4 text-xs font-bold text-[var(--primary-foreground)]"
              >
                <ArrowRight size={15} />
                {t("learning.signup")}
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LearningPage;