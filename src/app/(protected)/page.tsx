import { CompareTable } from "@/components/CompareTable";
import { HeroTelemetry } from "@/components/HeroTelemetry";
import { JobSection } from "@/components/JobSection";
import { QuoteWall } from "@/components/QuoteWall";
import { RosterChart } from "@/components/RosterChart";
import { SiteNav } from "@/components/SiteNav";
import { JOBS } from "@/data/jobs";

export default function HomePage() {
  return (
    <main id="top">
      <div className="hero-watercolor">
        <img
          className="hero-watercolor-image"
          src="/brand/globant-watercolor-hero.jpg"
          alt=""
        />
        <SiteNav />
      </div>

      <div className="report">
        <div className="report-hero">
          <HeroTelemetry />
          <section className="hero">
            <div>
              <p className="eyebrow">Grok Bot for Globant</p>
              <h1>The agents that keep every pod moving.</h1>
              <p className="hero-intro">
                A managed fleet carries approved context, actions, and
                approvals across an AI Pod. A person stays in control.
              </p>
            </div>
          </section>

          <section className="usecase-framing">
            <p className="eyebrow">Three scenes from one working day</p>
            <h2>
              The request starts the scene. The finished artifact ends it.
            </h2>
            <p>
              These are example workflows. They do not describe observed
              Globant activity.
            </p>
          </section>

          <div className="metric-grid">
            {JOBS.map((job) => (
              <a
                key={job.id}
                className="metric-card"
                href={`#${job.id}`}
              >
                <div className="metric-card-top">
                  <p>Sample {String(job.number).padStart(2, "0")}</p>
                </div>
                <h2>{job.title}</h2>
                <p className="metric-trigger">
                  Starts when {job.trigger.toLowerCase()}
                </p>
              </a>
            ))}
          </div>

          <section className="globant-fit" aria-labelledby="globant-fit-title">
            <p className="eyebrow">Why this maps to Globant</p>
            <h2 id="globant-fit-title">
              Glob.AI sets the model. AI Pods organize the work.
            </h2>
            <div className="globant-fit-links">
              <a
                href="https://www.globant.com/news/globant-introduces-glob-ai-reinventing-technology-services-ai-era"
                target="_blank"
                rel="noreferrer"
              >
                Glob.AI and AI Pods
              </a>
              <a
                href="https://www.globant.com/news/globant-vercel-strategic-alliance"
                target="_blank"
                rel="noreferrer"
              >
                Globant and Vercel alliance
              </a>
            </div>
          </section>

          <RosterChart />
        </div>

        <div id="jobs">
          {JOBS.map((job) => (
            <JobSection key={job.id} job={job} />
          ))}
        </div>
      </div>

      <div className="orbit-break" aria-hidden>
        <img src="/brand/globant-watercolor-hero.jpg" alt="" />
      </div>

      <div className="report">
        <CompareTable />
        <QuoteWall />
      </div>

      <footer className="site-footer">
        <div>
          <p className="footer-title">Globant × SpaceXAI</p>
          <p>Grok Bot for Globant</p>
        </div>
        <address className="footer-contact">
          <p>Your Cursor contact</p>
          <strong>Biz Eshetu</strong>
          <a href="mailto:biz.eshetu@cursor.com">
            biz.eshetu@cursor.com
          </a>
        </address>
      </footer>
    </main>
  );
}
