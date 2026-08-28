const TOOLS = ["Grok Bot", "Claude Cowork", "ChatGPT", "Perplexity"] as const;

const ROWS: { label: string; values: string[] }[] = [
  {
    label: "Working environment",
    values: [
      "Each bot has a persistent computer",
      "A managed computer session",
      "A chat with connected tools and task modes",
      "A research and answer interface",
    ],
  },
  {
    label: "Approved tools",
    values: [
      "Works across the tools you approve",
      "Works in the tools available to the assigned task",
      "Uses the connected tools available to the task",
      "Searches connected and public sources",
    ],
  },
  {
    label: "How work starts",
    values: [
      "A message, reusable routine, or supported event",
      "An assigned task",
      "A prompt or task",
      "A research question",
    ],
  },
  {
    label: "Review",
    values: [
      "Reviewable output and visible computer activity",
      "A result for review",
      "An answer, analysis, or draft",
      "A sourced answer",
    ],
  },
];

export function CompareTable() {
  return (
    <section id="compare" className="compare">
      <h2>Grok Bot comparison</h2>
      <p className="section-lede">
        Grok Bot combines persistent computers, approved tools, reusable
        triggers, and reviewable output.
      </p>
      <div className="compare-wrap">
        <table className="compare-table">
          <thead>
            <tr>
              <th scope="col">
                <span className="sr-only">Capability</span>
              </th>
              {TOOLS.map((tool) => (
                <th key={tool} scope="col">
                  {tool}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                {row.values.map((value, index) => (
                  <td key={TOOLS[index]}>
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
