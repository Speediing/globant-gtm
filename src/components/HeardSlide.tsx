import type { SlideCard } from "@/data/types";

export function HeardSlide({
  slides,
  size = "lg",
}: {
  slides: SlideCard[];
  size?: "sm" | "lg";
  wash?: string;
}) {
  return (
    <div className={`leave leave-heard size-${size}`}>
      <article className="heard-slide">
        <header className="leave-pack-top">
          <p className="leave-kicker">Finished artifact</p>
          <h3>Review packet</h3>
        </header>
        <ol className="leave-cards">
          {slides.map((slide) => (
            <li key={slide.n}>
              <p className="leave-seat">
                {slide.kicker || `Section ${slide.n}`}
              </p>
              <h3>{slide.title}</h3>
              <p className="leave-line">{slide.body}</p>
            </li>
          ))}
        </ol>
      </article>
    </div>
  );
}
