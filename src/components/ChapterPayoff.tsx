import type { Artifact, StoryBeat } from "@/data/types";
import { ArtifactCard } from "./ArtifactCard";
import { HeardSlide } from "./HeardSlide";

function FinalArtifact({ artifact }: { artifact: Artifact }) {
  if (artifact.kind === "packet") {
    return (
      <div className="art art-doc">
        <p className="art-kicker">Packet</p>
        <h3 className="art-title">{artifact.title}</h3>
        {artifact.fields.map((field) => (
          <div key={field.label} className="art-block">
            <p className="art-label">{field.label}</p>
            <p>{field.value}</p>
          </div>
        ))}
      </div>
    );
  }

  return <ArtifactCard artifact={artifact} />;
}

export function ChapterPayoff({
  beat,
  wash,
  value,
}: {
  beat: StoryBeat;
  wash?: string;
  value?: string;
}) {
  const body = beat.slides?.length ? (
    <HeardSlide slides={beat.slides} size="lg" wash={wash} />
  ) : beat.artifact ? (
    <div
      className="leave leave-pack is-finished-artifact"
      aria-label="Finished artifact"
    >
      <p className="finished-artifact-label">Finished artifact</p>
      <FinalArtifact artifact={beat.artifact} />
    </div>
  ) : null;

  if (!body) return null;

  return (
    <div className="chapter-payoff">
      <p className="payoff-label">
        {beat.when ? <span>{beat.when}</span> : null}
        {beat.label}
      </p>
      {body}
      {value ? <p className="leave-value">{value}</p> : null}
    </div>
  );
}
