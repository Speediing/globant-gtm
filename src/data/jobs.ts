import type { Artifact, CroJob } from "./types";

export const STEERING_BRIEF: Extract<Artifact, { kind: "one-pager" }> = {
  kind: "one-pager",
  title: "AI Pod steering brief",
  eyebrow: "Ready for review",
  sections: [
    {
      heading: "Purpose",
      body: "Align the pod on current priorities, decisions, and support needed.",
    },
    {
      heading: "Approved context",
      body: "Current charter, recent approved notes, open actions, and the next steering agenda.",
    },
    {
      heading: "Decision prompts",
      body: "Confirm the next priority, resolve the listed dependency, and assign owners to open actions.",
    },
    {
      heading: "Review gate",
      body: "The pod lead reviews the brief before it is shared.",
    },
  ],
};

export const WORKSHOP_HANDOFF: Extract<Artifact, { kind: "table" }> = {
  kind: "table",
  title: "Workshop handoff",
  caption: "Prepared from approved workshop notes. Owners review before updates are posted.",
  columns: ["Action", "Owner", "Source", "Status"],
  rows: [
    ["Confirm the working scope", "Pod team", "Workshop notes", "Review"],
    ["Share the approved inputs", "Client team", "Workshop notes", "Review"],
    ["Update the delivery tracker", "Pod team", "Decision log", "Draft"],
  ],
};

export const POD_ONBOARDING_BRIEF: Extract<Artifact, { kind: "packet" }> = {
  kind: "packet",
  title: "Pod onboarding brief",
  fields: [
    {
      label: "Start here",
      value: "Read the approved pod charter and current working agreement.",
    },
    {
      label: "Current context",
      value: "Review the latest approved brief, decision log, and open action tracker.",
    },
    {
      label: "Workspace",
      value: "Use the approved document folders, calendar, notes, and tracker.",
    },
    {
      label: "First check",
      value: "Confirm access and review open questions with the pod lead.",
    },
  ],
};

const POD_ONBOARDING_DEMO: Extract<Artifact, { kind: "one-pager" }> = {
  kind: "one-pager",
  title: POD_ONBOARDING_BRIEF.title,
  eyebrow: "Packet ready for review",
  sections: POD_ONBOARDING_BRIEF.fields.map((field) => ({
    heading: field.label,
    body: field.value,
  })),
};

export const JOBS: CroJob[] = [
  {
    id: "steering-brief",
    number: 1,
    title: "Prepare for the steering call",
    trigger: "An AI Pod steering call appears on the approved calendar",
    backgroundAction: "Gathering approved context and preparing the brief",
    problem:
      "The useful context sits across the calendar, approved notes, decision log, and action tracker.",
    botJob:
      "Atlas gathers only approved sources. Draft turns that context into a reviewable steering brief.",
    storyboard: [
      {
        when: "Day before",
        label: "The steering call appears on the approved calendar.",
        scene: "call",
        visual: {
          kind: "live-call",
          title: "AI Pod steering call",
          people: [
            { initials: "Y", name: "You" },
            { initials: "P", name: "Pod team" },
            { initials: "C", name: "Client team" },
          ],
        },
      },
      {
        when: "Two hours before",
        label: "Atlas gathers the agenda, approved notes, decisions, and open actions.",
        scene: "inspect",
        visual: {
          kind: "answers-found",
          sources: [
            { name: "Calendar", answer: "Agenda linked" },
            { name: "Notes", answer: "Current version" },
            { name: "Tracker", answer: "Open actions found" },
          ],
          status: "Sources checked",
        },
      },
      {
        when: "Thirty minutes before",
        label: "Draft organizes the context and flags open questions for human review.",
        scene: "notes",
        visual: {
          kind: "deck-update",
          eyebrow: "AI Pod steering",
          headline: "Brief in review",
          product: "Decisions, owners, next steps",
          status: "Draft ready",
        },
      },
      {
        when: "Ready for review",
        label: "The finished AI Pod steering brief is ready.",
        scene: "deck",
        artifact: STEERING_BRIEF,
      },
    ],
    unlock:
      "Approved context becomes one reviewable brief before the steering call.",
    outcome:
      "The pod lead opens a finished steering brief instead of assembling context by hand.",
    clips: [],
    demo: {
      title: "Steering brief",
      subtitle: "Approved context to finished brief",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "atlas",
          name: "Atlas",
          role: "bot",
          persona: "Gathers approved steering context",
          color: "#158574",
        },
        {
          id: "draft",
          name: "Draft",
          role: "bot",
          persona: "Formats reviewable pod artifacts",
          color: "#B9EE78",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "atlas",
          kind: "routine",
          body: "Steering call found on the approved calendar. Gathering the linked agenda, approved notes, decision log, and open actions.",
        },
        {
          id: "m2",
          from: "atlas",
          kind: "text",
          body: "Approved sources are open. I found current priorities, one unresolved dependency, and the actions that still need owners.",
        },
        {
          id: "m3",
          from: "draft",
          kind: "text",
          body: "I am organizing that context into purpose, approved context, decision prompts, and a review gate.",
        },
        {
          id: "m4",
          from: "draft",
          kind: "draft",
          draftLabel: "Finished artifact",
          artifact: STEERING_BRIEF,
        },
        {
          id: "m5",
          from: "atlas",
          kind: "system",
          body: "Nothing shared. The finished brief stays in review until you approve it.",
        },
      ],
    },
  },
  {
    id: "workshop-handoff",
    number: 2,
    title: "Turn the workshop into action",
    trigger: "Approved workshop notes are added to the workspace",
    backgroundAction: "Turning decisions and next steps into a handoff",
    problem:
      "Actions can disappear when workshop notes and the delivery tracker are reviewed separately.",
    botJob:
      "Relay extracts approved decisions and actions. Watch checks the tracker before the handoff is prepared for review.",
    storyboard: [
      {
        when: "Workshop ends",
        label: "Approved notes land in the workspace.",
        scene: "notes",
        visual: {
          kind: "live-call",
          title: "AI Pod workshop",
          people: [
            { initials: "Y", name: "You" },
            { initials: "P", name: "Pod team" },
            { initials: "C", name: "Client team" },
          ],
        },
      },
      {
        when: "Ten minutes later",
        label: "Relay separates decisions, actions, owners, and unresolved items.",
        scene: "inspect",
        visual: {
          kind: "answers-found",
          sources: [
            { name: "Decisions", answer: "Separated" },
            { name: "Actions", answer: "Owner labels kept" },
            { name: "Questions", answer: "Held for review" },
          ],
          status: "Notes checked",
        },
      },
      {
        when: "Twenty minutes later",
        label: "Watch checks each action against the approved tracker.",
        scene: "map",
        visual: {
          kind: "deck-update",
          eyebrow: "Workshop handoff",
          headline: "Actions ready for review",
          product: "Owners, sources, status",
          status: "Tracker draft ready",
        },
      },
      {
        when: "Ready for review",
        label: "The finished Workshop handoff is ready.",
        scene: "deck",
        artifact: WORKSHOP_HANDOFF,
      },
    ],
    unlock:
      "Approved workshop notes become a clear action table with a human review gate.",
    outcome:
      "The pod team gets a finished handoff with actions, owners, sources, and status.",
    clips: [],
    demo: {
      title: "Workshop handoff",
      subtitle: "Approved notes to reviewable actions",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "relay",
          name: "Relay",
          role: "bot",
          persona: "Turns approved workshop notes into actions",
          color: "#0B5F55",
        },
        {
          id: "watch",
          name: "Watch",
          role: "bot",
          persona: "Checks actions against the approved tracker",
          color: "#D98468",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "relay",
          kind: "routine",
          body: "Approved workshop notes were added to the workspace. Reading the decisions, next steps, and unresolved items.",
        },
        {
          id: "m2",
          from: "relay",
          kind: "text",
          body: "The action set is ready. Each item keeps its approved source and uses only the owner label recorded in the notes.",
        },
        {
          id: "m3",
          from: "watch",
          kind: "text",
          body: "I checked the action set against the delivery tracker. New entries remain drafts until the pod lead reviews them.",
        },
        {
          id: "m4",
          from: "relay",
          kind: "draft",
          draftLabel: "Finished artifact",
          artifact: WORKSHOP_HANDOFF,
        },
        {
          id: "m5",
          from: "watch",
          kind: "system",
          body: "Nothing posted. The finished handoff and tracker updates are waiting for approval.",
        },
      ],
    },
  },
  {
    id: "pod-onboarding",
    number: 3,
    title: "Give a new pod member the right start",
    trigger: "A new pod member is added to the approved workspace",
    backgroundAction: "Assembling setup context from approved documents",
    problem:
      "A new pod member needs the current charter, working agreement, decisions, and setup steps in one place.",
    botJob:
      "Scout locates approved onboarding sources. Guide assembles them into a bounded setup packet for review.",
    storyboard: [
      {
        when: "Access is approved",
        label: "The new pod member is added to the approved workspace.",
        scene: "launch",
        visual: {
          kind: "account-research",
          account: "Sample AI Pod",
          sources: ["Charter", "Workspace", "Decision log"],
          signal: "Access approved",
        },
      },
      {
        when: "Five minutes later",
        label: "Scout checks the charter, working agreement, decision log, and tracker.",
        scene: "inspect",
        visual: {
          kind: "answers-found",
          sources: [
            { name: "Charter", answer: "Current version" },
            { name: "Agreement", answer: "Current version" },
            { name: "Tracker", answer: "Open actions found" },
          ],
          status: "Sources checked",
        },
      },
      {
        when: "Ten minutes later",
        label: "Guide orders the approved context into a clear first path.",
        scene: "notes",
        visual: {
          kind: "deck-update",
          eyebrow: "First-day path",
          headline: "Setup context in one place",
          product: "Access, decisions, contacts",
          status: "Brief ready",
        },
      },
      {
        when: "Ready for review",
        label: "The finished Pod onboarding brief is ready.",
        scene: "deck",
        artifact: POD_ONBOARDING_BRIEF,
      },
    ],
    unlock:
      "Approved setup context becomes one reviewable onboarding packet.",
    outcome:
      "A new pod member gets a finished onboarding brief with the current approved context.",
    clips: [],
    demo: {
      title: "Pod onboarding",
      subtitle: "Approved documents to setup packet",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "scout",
          name: "Scout",
          role: "bot",
          persona: "Locates approved onboarding sources",
          color: "#6A8684",
        },
        {
          id: "guide",
          name: "Guide",
          role: "bot",
          persona: "Orders approved setup context",
          color: "#B5D66D",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "scout",
          kind: "routine",
          body: "Workspace access is approved. Checking the current charter, working agreement, decision log, and action tracker.",
        },
        {
          id: "m2",
          from: "scout",
          kind: "text",
          body: "All four approved sources are available. I marked the current versions and left older drafts out.",
        },
        {
          id: "m3",
          from: "guide",
          kind: "text",
          body: "I am ordering the material into start here, current context, workspace, and first check.",
        },
        {
          id: "m4",
          from: "guide",
          kind: "draft",
          draftLabel: "Finished artifact",
          artifact: POD_ONBOARDING_DEMO,
        },
        {
          id: "m5",
          from: "scout",
          kind: "system",
          body: "Nothing shared. The finished onboarding brief waits for pod lead approval.",
        },
      ],
    },
  },
];

export function getJob(id: string): CroJob | undefined {
  return JOBS.find((job) => job.id === id);
}
