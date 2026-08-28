import type { JobId } from "./types";

export type SiteKind = "calendar" | "notes" | "tracker" | "workspace";

export type ChromeTab = {
  id: string;
  host: string;
  label: string;
};

export type ComputerBeat = {
  pill: string;
  host: string;
  path?: string;
  title: string;
  site: SiteKind;
  tabs: ChromeTab[];
};

const calendar = {
  id: "calendar",
  host: "calendar.google.com",
  label: "Calendar",
};
const notes = {
  id: "notes",
  host: "docs.google.com",
  label: "Approved notes",
};
const tracker = {
  id: "tracker",
  host: "docs.google.com",
  label: "Tracker",
};
const workspace = {
  id: "workspace",
  host: "app.slack.com",
  label: "Workspace",
};

export const SCREENS: Record<JobId, Record<string, ComputerBeat>> = {
  "steering-brief": {
    m1: {
      pill: "Checking the approved calendar",
      host: "calendar.google.com",
      path: "/calendar/u/0/r/day",
      title: "AI Pod steering call",
      site: "calendar",
      tabs: [calendar, notes, tracker, workspace],
    },
    m2: {
      pill: "Gathering approved context",
      host: "docs.google.com",
      path: "/document/d/approved-steering-context",
      title: "Approved steering context",
      site: "notes",
      tabs: [calendar, notes, tracker, workspace],
    },
    m3: {
      pill: "Organizing the brief",
      host: "docs.google.com",
      path: "/document/d/steering-brief-draft",
      title: "AI Pod steering brief",
      site: "notes",
      tabs: [calendar, notes, tracker, workspace],
    },
    m4: {
      pill: "Finishing the steering brief",
      host: "docs.google.com",
      path: "/document/d/steering-brief",
      title: "AI Pod steering brief",
      site: "notes",
      tabs: [calendar, notes, tracker, workspace],
    },
    m5: {
      pill: "Waiting for review",
      host: "docs.google.com",
      path: "/document/d/steering-brief",
      title: "AI Pod steering brief",
      site: "notes",
      tabs: [calendar, notes, tracker, workspace],
    },
  },
  "workshop-handoff": {
    m1: {
      pill: "Opening approved workshop notes",
      host: "docs.google.com",
      path: "/document/d/approved-workshop-notes",
      title: "Approved workshop notes",
      site: "notes",
      tabs: [notes, tracker, workspace],
    },
    m2: {
      pill: "Extracting actions and owners",
      host: "docs.google.com",
      path: "/document/d/approved-workshop-notes",
      title: "Approved workshop notes",
      site: "notes",
      tabs: [notes, tracker, workspace],
    },
    m3: {
      pill: "Checking the delivery tracker",
      host: "docs.google.com",
      path: "/spreadsheets/d/pod-delivery-tracker",
      title: "Pod delivery tracker",
      site: "tracker",
      tabs: [notes, tracker, workspace],
    },
    m4: {
      pill: "Finishing the workshop handoff",
      host: "docs.google.com",
      path: "/spreadsheets/d/workshop-handoff",
      title: "Workshop handoff",
      site: "tracker",
      tabs: [notes, tracker, workspace],
    },
    m5: {
      pill: "Waiting for review",
      host: "docs.google.com",
      path: "/spreadsheets/d/workshop-handoff",
      title: "Workshop handoff",
      site: "tracker",
      tabs: [notes, tracker, workspace],
    },
  },
  "pod-onboarding": {
    m1: {
      pill: "Checking approved workspace access",
      host: "app.slack.com",
      path: "/client/pod-workspace",
      title: "Approved pod workspace",
      site: "workspace",
      tabs: [workspace, notes, tracker],
    },
    m2: {
      pill: "Finding current approved documents",
      host: "docs.google.com",
      path: "/document/d/pod-charter",
      title: "Approved pod charter",
      site: "notes",
      tabs: [workspace, notes, tracker],
    },
    m3: {
      pill: "Ordering the setup context",
      host: "app.slack.com",
      path: "/client/pod-workspace/onboarding",
      title: "Pod onboarding",
      site: "workspace",
      tabs: [workspace, notes, tracker],
    },
    m4: {
      pill: "Finishing the onboarding brief",
      host: "app.slack.com",
      path: "/client/pod-workspace/onboarding",
      title: "Pod onboarding brief",
      site: "workspace",
      tabs: [workspace, notes, tracker],
    },
    m5: {
      pill: "Waiting for review",
      host: "app.slack.com",
      path: "/client/pod-workspace/onboarding",
      title: "Pod onboarding brief",
      site: "workspace",
      tabs: [workspace, notes, tracker],
    },
  },
};

export function beatFor(
  jobId: JobId,
  messageId: string | undefined,
): ComputerBeat | undefined {
  if (!messageId) return undefined;
  return SCREENS[jobId]?.[messageId];
}
