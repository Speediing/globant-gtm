export const HERO_AGENTS = [
  "Atlas",
  "Relay",
  "Scout",
  "Draft",
  "Watch",
  "Guide",
] as const;

export type HeroAgent = (typeof HERO_AGENTS)[number];
export type HeroJobIcon =
  | "brief"
  | "handoff"
  | "onboarding"
  | "decision"
  | "tracker"
  | "source"
  | "update"
  | "review";

export type HeroJob = {
  id: string;
  label: string;
  icon: HeroJobIcon;
  agent: HeroAgent;
  context: string;
  trigger: string;
  work: string;
  result: string;
  user: string;
  bot: string;
};

type HeroJobs = readonly [
  HeroJob,
  HeroJob,
  HeroJob,
  HeroJob,
  HeroJob,
  HeroJob,
  HeroJob,
  HeroJob,
];

export const HERO_JOBS: HeroJobs = [
  {
    id: "steering-brief",
    label: "Steering brief",
    icon: "brief",
    agent: "Atlas",
    context: "Example AI Pod",
    trigger: "Steering session added to the approved calendar",
    work: "I opened the approved agenda, decision log, and action tracker. Open items still need a person to check the owner fields.",
    result: "Steering brief ready for review",
    user: "hold the open items for my review",
    bot: "done. nothing has been shared.",
  },
  {
    id: "workshop-handoff",
    label: "Workshop handoff",
    icon: "handoff",
    agent: "Relay",
    context: "Example workshop",
    trigger: "Approved notes added to the workspace",
    work: "I sorted the decisions, actions, owner labels, and open questions. Every tracker change is still a draft.",
    result: "Workshop handoff ready for approval",
    user: "show me the tracker changes first",
    bot: "ready. i kept every change in draft.",
  },
  {
    id: "pod-onboarding",
    label: "Pod onboarding",
    icon: "onboarding",
    agent: "Guide",
    context: "Example AI Pod",
    trigger: "New member gets approved workspace access",
    work: "I opened the current charter, working agreement, and decision log. The first-day steps now point to the approved sources.",
    result: "Onboarding packet ready for review",
    user: "leave access changes for the pod lead",
    bot: "done. the packet only links approved access.",
  },
  {
    id: "decision-log",
    label: "Decision log",
    icon: "decision",
    agent: "Scout",
    context: "Example meeting",
    trigger: "Approved note contains a new decision",
    work: "I checked the note against the current log, linked the source, and left the open follow-up marked for review.",
    result: "Decision log entry ready for approval",
    user: "keep the follow-up open",
    bot: "kept open. the source is attached.",
  },
  {
    id: "action-tracker",
    label: "Action tracker",
    icon: "tracker",
    agent: "Watch",
    context: "Example handoff",
    trigger: "Approved handoff includes new actions",
    work: "I compared the handoff with the current tracker and checked each owner label. Nothing has been posted.",
    result: "Tracker update ready for approval",
    user: "flag the two owner checks",
    bot: "flagged. the tracker is still a draft.",
  },
  {
    id: "source-check",
    label: "Source check",
    icon: "source",
    agent: "Scout",
    context: "Example brief",
    trigger: "Draft brief enters the review queue",
    work: "I opened the draft beside each approved source and marked one line that needs a source before anyone shares it.",
    result: "Source check ready for review",
    user: "hold the line without a source",
    bot: "held. the checked lines are ready.",
  },
  {
    id: "weekly-update",
    label: "Weekly update",
    icon: "update",
    agent: "Draft",
    context: "Example AI Pod",
    trigger: "Weekly review date arrives",
    work: "I opened the approved decision log, action tracker, and prior update. Confirmed items and open questions are kept apart.",
    result: "Weekly update ready for review",
    user: "keep the open questions at the top",
    bot: "done. the update has not been sent.",
  },
  {
    id: "review-queue",
    label: "Review queue",
    icon: "review",
    agent: "Guide",
    context: "Example review cycle",
    trigger: "Pod artifacts enter review",
    work: "I opened each artifact and ordered the queue by its stated review date. Review and approval steps stay separate.",
    result: "Review queue ready",
    user: "put approvals after content review",
    bot: "done. the queue follows that order.",
  },
];
