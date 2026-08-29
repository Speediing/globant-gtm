"use client";

import { useState } from "react";
import { HERO_JOBS, type HeroJobIcon } from "@/data/hero-jobs";

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="m14.5 6-6 6 6 6"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function ComputerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="4"
        y="5"
        width="16"
        height="11"
        rx="1.8"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M9 20h6M12 16v4"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="9"
        y="3.5"
        width="6"
        height="11"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M6.5 11.5a5.5 5.5 0 0 0 11 0M12 17v3M9 20h6"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function JobIcon({ kind }: { kind: HeroJobIcon }) {
  switch (kind) {
    case "brief":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M7 3.5h7l3 3V20H7V3.5Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path
            d="M14 3.5V7h3M9.5 11h5M9.5 14h5M9.5 17h3"
            stroke="currentColor"
            strokeWidth="1.7"
          />
        </svg>
      );
    case "handoff":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M4 8h11M12 5l3 3-3 3M20 16H9M12 13l-3 3 3 3"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "onboarding":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle
            cx="9"
            cy="8"
            r="3"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <path
            d="M3.5 19c.7-3.2 2.5-5 5.5-5s4.8 1.8 5.5 5M18 8v6M15 11h6"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      );
    case "decision":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 3.5 19 6v5.2c0 4.2-2.8 7.5-7 9.3-4.2-1.8-7-5.1-7-9.3V6l7-2.5Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path
            d="m8.8 11.8 2.1 2.1 4.4-4.5"
            stroke="currentColor"
            strokeWidth="1.7"
          />
        </svg>
      );
    case "tracker":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M5 6h2M10 6h9M5 12h2M10 12h9M5 18h2M10 18h9"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      );
    case "source":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle
            cx="10.5"
            cy="10.5"
            r="5.5"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <path
            d="m15 15 4.5 4.5"
            stroke="currentColor"
            strokeWidth="1.7"
          />
        </svg>
      );
    case "update":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M5 6.5h14v9H9l-4 3v-12Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path
            d="m9 11 2 2 4-4"
            stroke="currentColor"
            strokeWidth="1.7"
          />
        </svg>
      );
    case "review":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 4.5c.65 4.15 2.85 6.35 7 7-.4.07-.78.15-1.14.25-3.35.92-5.02 3.1-5.86 6.75-.84-3.65-2.51-5.83-5.86-6.75-.36-.1-.74-.18-1.14-.25 4.15-.65 6.35-2.85 7-7Z"
            fill="currentColor"
          />
        </svg>
      );
  }
}

export function HeroDemo() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedJob = HERO_JOBS[selectedIndex] ?? HERO_JOBS[0];

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">Grok Bot for Globant</p>
        <h1 id="hero-title">The agents that keep every AI Pod moving.</h1>
        <p className="hero-intro">
          Each example starts with an approved trigger. The agent works on its
          own computer, then brings back a draft for review.
        </p>

        <div
          className="hero-phone-jobs"
          aria-label="Choose a Grok Bot job"
        >
          {HERO_JOBS.map((job, index) => {
            const selected = index === selectedIndex;

            return (
              <button
                key={job.id}
                type="button"
                className={selected ? "is-active" : undefined}
                aria-pressed={selected}
                aria-controls="hero-phone-thread"
                onClick={() => setSelectedIndex(index)}
              >
                {selected ? (
                  <span aria-hidden>
                    <JobIcon kind={job.icon} />
                  </span>
                ) : null}
                {job.label}
              </button>
            );
          })}
        </div>
      </div>

      <aside className="hero-bot-demo" aria-label="Live Grok Bot phone demo">
        <div className="hero-phone">
          <div className="hero-phone-notch notch" aria-hidden />

          <header className="hero-phone-header header">
            <span className="hero-phone-back" aria-hidden>
              <BackIcon />
            </span>
            <span className="hero-phone-agent hero-phone-avatar" aria-hidden>
              <JobIcon kind={selectedJob.icon} />
            </span>
            <p>
              <strong>{selectedJob.agent} Agent</strong>
              <small>
                <span aria-hidden />
                Working on its computer
              </small>
            </p>
            <span className="hero-phone-desktop" aria-hidden>
              <ComputerIcon />
            </span>
          </header>

          <div
            key={selectedJob.id}
            id="hero-phone-thread"
            className="hero-phone-thread thread"
            role="region"
            aria-live="polite"
            aria-label={`${selectedJob.label} example thread`}
          >
            <article className="hero-phone-work">
              <p className="hero-phone-work-label">
                <span aria-hidden />
                Example workflow
              </p>
              <p className="hero-phone-work-meta">
                <span>Context</span>
                {selectedJob.context}
              </p>
              <p className="hero-phone-work-meta">
                <span>Trigger</span>
                {selectedJob.trigger}
              </p>
              <p className="hero-phone-work-copy">{selectedJob.work}</p>
              <strong>{selectedJob.result}</strong>
            </article>

            <p className="hero-phone-message is-user">{selectedJob.user}</p>
            <p className="hero-phone-message is-bot">{selectedJob.bot}</p>
          </div>

          <footer className="hero-phone-composer composer" aria-hidden>
            <span>
              <PlusIcon />
            </span>
            <p>Message {selectedJob.agent} Agent</p>
            <span>
              <MicIcon />
            </span>
          </footer>
        </div>
      </aside>
    </section>
  );
}
