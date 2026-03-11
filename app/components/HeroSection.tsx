"use client";

import { useState } from "react";
import { HeroWordReveal, HeroBlurIn } from "./HeroReveal";
import NeuralCanvas from "./NeuralCanvas";
import SynapseOasisLogo from "./SynapseOasisLogo";

const ForgeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

const AiIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

export default function HeroSection() {
  const [heroReady, setHeroReady] = useState(false);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{ background: "var(--hero-gradient)" }}
    >
      {/* Neural canvas only in hero */}
      <NeuralCanvas />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.44) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.44) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Atmospheric gradients */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 32% 28% at 17% 25%, rgba(81,162,231,0.13) 0%, rgba(81,162,231,0.05) 38%, transparent 72%), radial-gradient(ellipse 34% 30% at 82% 72%, rgba(126,124,222,0.15) 0%, rgba(126,124,222,0.06) 42%, transparent 74%), radial-gradient(circle at 50% 48%, rgba(255,255,255,0.035) 0%, transparent 26%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,7,34,0.06) 0%, rgba(5,7,34,0) 18%, rgba(5,7,34,0) 78%, rgba(5,7,34,0.18) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, transparent 56%, rgba(4,6,24,0.14) 100%)",
        }}
      />

      <div
        className="absolute left-1/2 z-10 -translate-x-1/2"
        style={{ top: "clamp(172px, 20vh, 212px)" }}
      >
        <HeroBlurIn delayMs={120}>
          <div className="flex items-center justify-center" style={{ width: 128, height: 128 }}>
            <SynapseOasisLogo size={128} />
          </div>
        </HeroBlurIn>
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12 text-center">
        {/* Badge */}
        <HeroBlurIn delayMs={200}>
          <div className="flex justify-center mb-8">
            <span className="hero-trust-badge inline-flex items-center gap-2 px-4 py-2 text-[11px] font-bold uppercase tracking-widest rounded-full"
              style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              Atlassian Forge Apps
            </span>
          </div>
        </HeroBlurIn>

        {/* Heading */}
        <h1
          className="text-white mb-6"
          style={{
            fontSize: "clamp(48px, 7vw, 96px)",
            lineHeight: 1,
            letterSpacing: "-0.05em",
            fontWeight: 600,
          }}
        >
          <HeroWordReveal delayMs={400} staggerMs={150} onComplete={() => setHeroReady(true)}>
            {"Intelligent Apps"}
          </HeroWordReveal>
          <br />
          <span style={{ color: "rgba(255,255,255,0.4)" }}>
            <HeroWordReveal delayMs={900} staggerMs={150}>
              {"for Atlassian"}
            </HeroWordReveal>
          </span>
        </h1>

        {/* Subtitle */}
        <HeroBlurIn delayMs={1600} trigger={heroReady}>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            AI-powered, Forge-native apps built by consultants who spent 15+ years
            solving the same problems you face every day in Jira and JSM.
          </p>
        </HeroBlurIn>

        {/* CTAs */}
        <HeroBlurIn delayMs={1900} trigger={heroReady}>
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <a href="#what-we-build" className="cta-button">
              What We Build
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#about" className="cta-button-outline">
              Our Story
            </a>
          </div>
        </HeroBlurIn>

        {/* Trust badges */}
        <HeroBlurIn delayMs={2200} trigger={heroReady}>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { icon: <ForgeIcon />, label: "Forge Native", color: "#7E7CDE" },
              { icon: <AiIcon />, label: "AI-Powered", color: "#51A2E7" },
              { icon: <ShieldIcon />, label: "Enterprise Ready", color: "#2BC48A" },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold hero-trust-badge"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: badge.color,
                }}
              >
                {badge.icon}
                {badge.label}
              </div>
            ))}
          </div>
        </HeroBlurIn>
      </div>
    </section>
  );
}
