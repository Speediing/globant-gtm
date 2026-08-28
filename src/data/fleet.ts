import type { JobId } from "./types";

export type FleetBot = {
  id: string;
  name: string;
  blurb: string;
  color: string;
  jobId?: JobId;
  mark?: string;
  seat?: boolean;
};

export const FLEET: FleetBot[] = [
  {
    id: "human-review",
    name: "Human review",
    blurb: "Approves sources, checks finished artifacts, and controls sharing.",
    color: "#E8E8ED",
    mark: "OK",
    seat: true,
  },
  {
    id: "atlas",
    name: "Atlas",
    blurb: "Gathers approved steering context.",
    jobId: "steering-brief",
    color: "#158574",
  },
  {
    id: "relay",
    name: "Relay",
    blurb: "Turns approved workshop notes into actions.",
    jobId: "workshop-handoff",
    color: "#0B5F55",
  },
  {
    id: "scout",
    name: "Scout",
    blurb: "Locates current approved onboarding sources.",
    jobId: "pod-onboarding",
    color: "#6A8684",
  },
  {
    id: "draft",
    name: "Draft",
    blurb: "Formats reviewable pod artifacts.",
    color: "#B9EE78",
  },
  {
    id: "watch",
    name: "Watch",
    blurb: "Checks actions against the approved tracker.",
    color: "#D98468",
  },
  {
    id: "guide",
    name: "Guide",
    blurb: "Orders approved setup context.",
    color: "#B5D66D",
  },
];
