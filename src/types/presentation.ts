export interface SlideMeta {
  id: number;
  title: string;
  subtitle: string;
  phase?: string;
  tags: string[];
  notes: string[];
}

export const SLIDES_DATA: SlideMeta[] = [
  {
    id: 1,
    title: "Reimagining React Without the Virtual DOM",
    subtitle: "The Reactive Architecture Evolution: From jQuery & Two-Way Binding to Fine-Grained Signals, TSRX, and OctaneJS",
    phase: "Keynote Architecture Deck",
    tags: ["Keynote", "Avi Levkovich", "React", "Virtual DOM", "TSRX", "OctaneJS"],
    notes: [
      "Welcome to 'Reimagining React Without the Virtual DOM'.",
      "Presenter: Avi Levkovich (10-Minute Executive Keynote).",
      "For over a decade, React's Virtual DOM shaped the entire web. Today we examine why the V-DOM is reaching its limits, and how compiler-first architectures replace it with direct O(1) DOM mutation."
    ]
  },
  {
    id: 2,
    title: "The Keynote Roadmap: Four Core Pillars",
    subtitle: "From Imperative DOM Chaos to Direct O(1) Mutation in 10 Minutes",
    phase: "Roadmap",
    tags: ["Roadmap", "Context", "Ceiling", "Direct DOM", "Adoption"],
    notes: [
      "Pillar 1: The Context (Pre-React DOM chaos & React's one-way revolution).",
      "Pillar 2: The Ceiling (Garbage Collection freezes & Hook terror).",
      "Pillar 3: The Next Generation (Svelte, Dominic Gannaway's TSRX, and OctaneJS).",
      "Pillar 4: The Pragmatic Adoption (OctaneCompat & ReactCompat)."
    ]
  },
  {
    id: 3,
    title: "The Virtual DOM as an Overloaded Middle Manager",
    subtitle: "Why tree reconciliation became the bureaucratic bottleneck between application state and the user's screen",
    phase: "Visual Metaphor",
    tags: ["Illustration", "Middle Manager", "V-DOM", "Data Updates", "User Screen"],
    notes: [
      "Walk through the central metaphor: In 2013, the Virtual DOM was hired to tame messy manual DOM updates.",
      "In 2026, with fast browser engines, the V-DOM is buried in redundant paperwork (object allocations, diffing traversals, GC pauses).",
      "The user waits on an hourglass, while the engineer demands: 'Just let data go directly to the screen!'"
    ]
  },
  {
    id: 4,
    title: "From Pre-React Chaos to the One-Way Revolution",
    subtitle: "How jQuery desync and MVC domino loops led to React's declarative breakthrough",
    phase: "Pillar 01 // Context",
    tags: ["jQuery", "Domino Effect", "React", "Unidirectional Flow"],
    notes: [
      "Imperative jQuery caused chronic desynchronization: UI and memory drifted apart.",
      "Two-way binding produced cascading domino loops where change sources were lost.",
      "React solved this with one-way data flow and UI = f(State), bringing sanity to complex apps."
    ]
  },
  {
    id: 5,
    title: "The Hidden Ceiling of the Virtual DOM",
    subtitle: "Why in-memory tree reconciliation stalls at scale: 54ms latency, GC pauses & O(t) diffing",
    phase: "Pillar 02 // The Ceiling",
    tags: ["Virtual DOM", "Diffing", "Garbage Collection", "Latency"],
    notes: [
      "React update lifecycle: State change -> Re-render -> Tree allocation -> Diffing -> Real DOM patch (54ms cumulative).",
      "Compiler-first (Octane/TSRX/Svelte): Direct pinpoint DOM update in 2ms.",
      "Every keystroke allocates synthetic event wrappers and temporary objects that trigger garbage collection freezes."
    ]
  },
  {
    id: 6,
    title: "Hook Terror & The Svelte Rebellion",
    subtitle: "When memoization arrays became a nightmare and Rich Harris declared: 'Virtual DOM is pure overhead'",
    phase: "Pillar 03 // The Resistance",
    tags: ["Hook Terror", "useMemo", "Svelte", "Rich Harris", "AOT Compiler"],
    notes: [
      "Functional React components introduced Hook Terror: developers manually micro-managing useMemo and useCallback dependency arrays.",
      "One missed dependency caused stale closures or infinite re-render loops.",
      "Svelte proved that an Ahead-Of-Time compiler can eliminate the V-DOM entirely."
    ]
  },
  {
    id: 7,
    title: "Dominic Gannaway & TSRX Innovations",
    subtitle: "Bringing compiler statements (@if, @for), hoisted hooks, and scoped CSS into TypeScript JSX",
    phase: "Pillar 03 // The Architect",
    tags: ["Dominic Gannaway", "TSRX", "Compiler Hoisting", "Scoped CSS"],
    notes: [
      "Dominic Gannaway (veteran of React core and Svelte core) created TSRX.",
      "Native statements replace awkward ternaries and .map() keys.",
      "Compiler hoisting allows calling hooks inside conditionals and loops without breaking order.",
      "Zero-runtime scoped CSS built into the language."
    ]
  },
  {
    id: 8,
    title: "OctaneJS: From O(t) Tree Traversal to O(1) Direct Mutation",
    subtitle: "Eliminating the diff: Template cloning, pinpoint dynamic pointers, and zero async waterfalls",
    phase: "Pillar 03 // Algorithmic Shift",
    tags: ["OctaneJS", "O(1) Mutation", "Static Cloning", "Waterfall Elimination"],
    notes: [
      "React's diffing is O(t), scaling with subtree size. OctaneJS achieves O(1) constant-time direct mutation.",
      "Static skeletons are cloned in a single browser cloneNode operation.",
      "Build-time dependency analysis fires parallel network requests, eliminating React use() serial waterfalls."
    ]
  },
  {
    id: 9,
    title: "Architecture Comparison & Incremental Adoption",
    subtitle: "Zero all-or-nothing risk: Accelerating existing React codebases with OctaneCompat",
    phase: "Pillar 04 // Practical Adoption",
    tags: ["Comparison Matrix", "OctaneCompat", "ReactCompat", "Interoperability"],
    notes: [
      "Matrix comparison: Virtual DOM, Rules of Hooks, Event System, and Dependencies.",
      "OctaneCompat embeds blazing-fast O(1) components inside existing React apps to fix bottlenecks.",
      "ReactCompat hosts complex third-party React libraries inside modern Octane apps."
    ]
  },
  {
    id: 10,
    title: "The Reactive Architecture Evolution Summary",
    subtitle: "The future combines the familiarity of React, the clean syntax of TSRX, and the O(1) speed of OctaneJS",
    phase: "Keynote Synthesis",
    tags: ["Synthesis", "Keynote Thesis", "The Future", "Direct DOM"],
    notes: [
      "Grand thesis quote summarizing the entire 10-minute presentation.",
      "The 4-era timeline: Manual DOM -> Virtual DOM -> Compiler Rebellion -> Direct Fine-Grained Reactive Primitives."
    ]
  },
  {
    id: 11,
    title: "The End ~ Fin ~",
    subtitle: "Classic vintage cinema title card • Presented by Avi Levkovich",
    phase: "Conclusion",
    tags: ["The End", "Vintage Cinema", "Credits", "Avi Levkovich", "Q&A"],
    notes: [
      "Vintage cinema closing title card.",
      "Thank the audience for their time.",
      "Open the floor for questions and architecture discussion."
    ]
  }
];
