import type { Artifact, DemoMessage } from "@/data/types";
import type { ComputerBeat } from "@/data/screens";
import { ArtifactCard } from "./ArtifactCard";

function supportedArtifact(
  artifact: Artifact | undefined,
): Extract<Artifact, { kind: "one-pager" | "table" | "packet" }> | undefined {
  if (
    artifact?.kind === "one-pager" ||
    artifact?.kind === "table" ||
    artifact?.kind === "packet"
  ) {
    return artifact;
  }
  return undefined;
}

function ArtifactPreview({
  artifact,
}: {
  artifact: Extract<Artifact, { kind: "one-pager" | "table" | "packet" }>;
}) {
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

export function SiteScreen({
  beat,
  message,
  account,
}: {
  beat: ComputerBeat;
  message?: DemoMessage;
  account: string;
  sent: boolean;
}) {
  const artifact = supportedArtifact(message?.artifact);

  switch (beat.site) {
    case "calendar":
      return <CalendarScreen account={account} />;
    case "notes":
      return <NotesScreen account={account} artifact={artifact} />;
    case "tracker":
      return <TrackerScreen artifact={artifact} />;
    case "workspace":
      return <WorkspaceScreen account={account} artifact={artifact} />;
  }
}

function CalendarScreen({ account }: { account: string }) {
  return (
    <div className="site site-gdoc">
      <header>
        <strong>Calendar</strong>
        <span>Approved pod calendar</span>
      </header>
      <article>
        <p className="gdoc-status">Next steering call</p>
        <p>
          <b>{account}.</b> Agenda and approved workspace links are attached.
        </p>
        <p>Preparation is ready to begin.</p>
      </article>
    </div>
  );
}

function NotesScreen({
  account,
  artifact,
}: {
  account: string;
  artifact?: Extract<Artifact, { kind: "one-pager" | "table" | "packet" }>;
}) {
  return (
    <div className="site site-gdoc">
      <header>
        <strong>Docs</strong>
        <span>{artifact?.title || `${account} approved context`}</span>
      </header>
      <article>
        {artifact ? (
          <ArtifactPreview artifact={artifact} />
        ) : (
          <>
            <p className="gdoc-status">Current approved sources</p>
            <p>
              <b>Charter.</b> Current pod purpose and working boundaries.
            </p>
            <p>
              <b>Decision log.</b> Approved decisions and unresolved questions.
            </p>
            <p>
              <b>Action tracker.</b> Open actions and recorded owner labels.
            </p>
          </>
        )}
      </article>
    </div>
  );
}

function TrackerScreen({
  artifact,
}: {
  artifact?: Extract<Artifact, { kind: "one-pager" | "table" | "packet" }>;
}) {
  if (artifact) {
    return (
      <div className="site site-sheets">
        <header>
          <span className="sheets-mark">Tracker</span>
          <strong>{artifact.title}</strong>
        </header>
        <ArtifactPreview artifact={artifact} />
      </div>
    );
  }

  return (
    <div className="site site-sheets">
      <header>
        <span className="sheets-mark">Tracker</span>
        <strong>Pod delivery tracker</strong>
      </header>
      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>Owner</th>
            <th>Source</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Confirm working scope</td>
            <td>Pod team</td>
            <td>Workshop notes</td>
            <td>Review</td>
          </tr>
          <tr>
            <td>Share approved inputs</td>
            <td>Client team</td>
            <td>Workshop notes</td>
            <td>Review</td>
          </tr>
          <tr>
            <td>Update tracker</td>
            <td>Pod team</td>
            <td>Decision log</td>
            <td>Draft</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function WorkspaceScreen({
  account,
  artifact,
}: {
  account: string;
  artifact?: Extract<Artifact, { kind: "one-pager" | "table" | "packet" }>;
}) {
  return (
    <div className="site site-slack">
      <header>
        <h4>{account}</h4>
        <em>Approved workspace</em>
      </header>
      <div className="slack-draft">
        {artifact ? (
          <ArtifactPreview artifact={artifact} />
        ) : (
          <>
            <p>
              <b>Pod charter</b>
            </p>
            <p>
              <b>Working agreement</b>
            </p>
            <p>
              <b>Decision log</b>
            </p>
            <p>
              <b>Action tracker</b>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
