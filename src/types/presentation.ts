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
      "Welcome the audience to 'Reimagining React Without the Virtual DOM'.",
      "Presenter: Avi Levkovich.",
      "Introduce the core thesis: For over a decade, React's Virtual DOM shaped web architecture. But modern workloads, high-frequency UIs, and compiler advancements have triggered a profound paradigm shift.",
      "Preview the journey: From the chaos of jQuery and early MVC, through Knockout and React's revolutionary one-way flow, to Svelte's compiler manifesto, Dominic Gannaway's TSRX, and OctaneJS's O(1) direct mutation."
    ]
  },
  {
    id: 2,
    title: "The Keynote Roadmap: Four Architectural Pillars",
    subtitle: "The four core pillars of reactive architecture: Context, Challenge, Outcome, and Meaning",
    phase: "Keynote Roadmap",
    tags: ["Roadmap", "4 Drawers", "Context", "Challenge", "Outcome", "Meaning"],
    notes: [
      "Explain the 4-drawer structural narrative of the keynote:",
      "1. Context (Where Did We Come From?): jQuery chaos, Two-way binding collapse, and React's unidirectional flow revolution.",
      "2. Challenge (Why the Virtual DOM Stalls at Scale): CPU/Memory overhead, GC pauses, O(t) tree diffing, and hook terror.",
      "3. Outcome (The Next Generation): How Svelte and OctaneJS/TSRX eliminate the Virtual DOM for direct DOM mutation.",
      "4. Meaning (How Do We Implement Tomorrow?): Pragmatic adoption via OctaneCompat and ReactCompat without total rewrites."
    ]
  },
  {
    id: 3,
    title: "The Virtual DOM as an Overloaded Middle Manager",
    subtitle: "Why tree diffing became the bureaucratic bottleneck between application state and the user's screen",
    phase: "Visual Metaphor",
    tags: ["Illustration", "Middle Manager", "V-DOM", "Data Updates", "User Screen"],
    notes: [
      "Walk through the cartoon metaphor on screen:",
      "Point to the left: Applications and users are constantly pushing data updates at high frequency.",
      "Point to the center: The Virtual DOM is a frantic middle manager buried under piles of binders (object trees, snapshot comparisons, synthetic event wrappers). It used to bring order in 2013, but now it's drowned in paperwork.",
      "Point to the right: The user's screen is frozen on a loading spinner, while the engineer shouts: 'Just let it go directly to the screen!'",
      "Conclude: This is precisely what compiler-first architectures (Svelte, TSRX, OctaneJS) accomplish."
    ]
  },
  {
    id: 4,
    title: "State Management Architecture",
    subtitle: "The paradigm shift from manual DOM manipulation to automatic synchronisation",
    phase: "Drawer 1 // Context",
    tags: ["jQuery", "Vanilla JS", "Two-Way Binding", "Desync Bug"],
    notes: [
      "Explain the fundamental fragility of imperative jQuery programming: developers had to manually keep DOM nodes and in-memory variables in sync.",
      "Show how an uncaught event or failed selector introduces state drift where the user sees stale UI while memory has updated.",
      "Knockout.js demonstrated that declarative bindings remove the entire class of DOM push/pull bugs."
    ]
  },
  {
    id: 5,
    title: "Classic MVC vs. One-Way Data Flow",
    subtitle: "Why Facebook abandoned bidirectional binding to stop the cascading Domino Effect",
    phase: "Drawer 1 // Context",
    tags: ["MVC", "React", "Unidirectional Flow", "Domino Effect"],
    notes: [
      "In early 2010s MVC, Model A mutated View A, which fired a change handler into Controller B, mutating Model B.",
      "This circular mesh led to the infamous 'chat unread counter' bug at Facebook where notifications wouldn't clear.",
      "React's one-way data flow enforced state changes only via explicit events, flowing strictly downward."
    ]
  },
  {
    id: 6,
    title: "Virtual DOM Overhead vs. Compiler-First Execution",
    subtitle: "Timeline breakdown of UI update lifecycle & runtime latency",
    phase: "Drawer 2 // Challenge",
    tags: ["Virtual DOM", "Diffing", "AOT Compiler", "Latency"],
    notes: [
      "Walk through each step in the React lifecycle: State change -> Component re-render -> Object tree allocation -> Diffing algorithm -> Real DOM mutation.",
      "Point out that React does massive work in JavaScript before touching the DOM (54ms cumulative).",
      "By contrast, an Ahead-Of-Time compiler (OctaneJS/TSRX/Svelte) generates the precise DOM update instruction at build time, resulting in ~2ms instant mutation."
    ]
  },
  {
    id: 7,
    title: "The Hidden Cost of Virtual DOM Reconciliation",
    subtitle: "Abstraction Overhead at Scale: From Garbage Collection spikes to O(t) subtree stalls",
    phase: "Drawer 2 // Challenge",
    tags: ["Synthetic Events", "Garbage Collection", "O(t) Traversal", "Heap Allocation"],
    notes: [
      "The Virtual DOM was a great solution when browser DOM was slow, but modern browser engines are fast and JS heap allocation is the new bottleneck.",
      "Every keystroke allocates synthetic event wrappers and temporary objects that trigger garbage collection micro-stalls.",
      "Reconciliation cost scales with tree size O(t) rather than the size of the change."
    ]
  },
  {
    id: 8,
    title: "Knockout.js & The MVVM Pattern",
    subtitle: "Steve Sanderson's 2010 breakthrough: Declarative programming and observable state",
    phase: "Phase 01 // 2010 Breakthrough",
    tags: ["Steve Sanderson", "Knockout.js", "MVVM", "Observables"],
    notes: [
      "Steve Sanderson pioneered declarative data-binding with Knockout.js.",
      "Rather than writing code that imperative pushes HTML, developers bound HTML to observables.",
      "Introduced the MVVM (Model-View-ViewModel) pattern to single-page web development."
    ]
  },
  {
    id: 9,
    title: "Angular: Complete Framework & The Domino Collapse",
    subtitle: "When end-to-end solutions hit scale limits: Digest cycles and cascading state mutations",
    phase: "Phase 02 // Framework Evolution",
    tags: ["AngularJS", "Digest Cycle", "Dirty Checking", "Domino Effect"],
    notes: [
      "AngularJS packaged routers, dependency injection, and two-way binding into a comprehensive enterprise framework.",
      "The dirty-checking digest cycle scanned all registered watchers up to 10 iterations per event to reach stability.",
      "In large apps with thousands of watchers, the browser reflow and digest delays caused noticeable frame drops."
    ]
  },
  {
    id: 10,
    title: "React: Unidirectional Flow & In-Memory Reconciliation",
    subtitle: "Replacing two-way chaos with predictable downward state flow",
    phase: "Phase 03 // React Revolution",
    tags: ["React", "Virtual DOM", "Declarative UI", "Snapshots"],
    notes: [
      "Jordan Walke and the Facebook team reimagined UI as a pure function of state: f(state) = UI.",
      "Reconciliation compared two in-memory virtual DOM snapshots and dispatched minimal browser mutations.",
      "This eliminated the domino effect and made UI debugging predictable for large engineering teams."
    ]
  },
  {
    id: 11,
    title: "Hook Terror & The Svelte Rebellion",
    subtitle: "When memoization arrays became a nightmare and Rich Harris declared: 'Virtual DOM is pure overhead'",
    phase: "Drawer 2 & 3 // The Resistance",
    tags: ["React Hooks", "useMemo Hell", "Svelte", "Rich Harris"],
    notes: [
      "With React Hooks (2018), functional components required strict dependency arrays in useEffect, useMemo, and useCallback.",
      "Missed dependencies caused stale closures, infinite re-render loops, and memory leaks.",
      "Rich Harris introduced Svelte: an AOT compiler that compiles components into direct imperative DOM code, eliminating the VDOM completely."
    ]
  },
  {
    id: 12,
    title: "Dominic Gannaway & TSRX",
    subtitle: "Former React and Svelte core team member creating a TypeScript Superset combining compiler speed with familiar JSX",
    phase: "Drawer 3 // Outcome",
    tags: ["Dominic Gannaway", "TSRX", "TypeScript Superset", "Compiler Hoisting"],
    notes: [
      "Dominic Gannaway worked on both React core and Svelte core, observing the pros and cons of both paradigms.",
      "TSRX brings statement-based rendering (@if, @for) directly into TypeScript, eliminating ternary and array map gymnastics.",
      "Compiler hoisting automatically moves hooks to component roots, liberating developers from the rigid Rules of Hooks."
    ]
  },
  {
    id: 13,
    title: "TSRX Innovations: Beyond JSX & Statement-Based Rendering",
    subtitle: "Dominic Gannaway's TypeScript Render Extension: replacing awkward expressions with native compiler directives",
    phase: "Drawer 3 // Outcome",
    tags: ["Control Flow", "Breaking Rules of Hooks", "Scoped CSS", "Error Boundaries"],
    notes: [
      "Tab 1: Native control flow (@if/@else/@for) replaces nested ternaries and required key props.",
      "Tab 2: Hook calls inside conditionals and loops are hoisted safely at compile time.",
      "Tab 3: Built-in scoped <style> tags eliminate CSS-in-JS runtime overhead and CSS module file clutter.",
      "Tab 4: Unified @try, @catch, and @pending directives combine Suspense and Error Boundaries into intuitive syntax."
    ]
  },
  {
    id: 14,
    title: "OctaneJS: From O(t) Tree Traversal to O(1) Direct Mutation",
    subtitle: "Eliminating the Diff entirely: Clone-based static templates and parallel data fetching",
    phase: "Drawer 3 // Outcome",
    tags: ["OctaneJS", "O(1) Mutation", "Static Cloning", "Waterfall Elimination"],
    notes: [
      "React's diffing algorithm is O(t), where t is the subtree size. OctaneJS achieves O(1) by compiling direct memory paths to dynamic nodes.",
      "Static markup is cloned via native browser cloneNode in a single micro-operation.",
      "Octane's compiler analyzes asynchronous data dependencies and initiates parallel requests upfront, preventing async waterfalls."
    ]
  },
  {
    id: 15,
    title: "Comprehensive Framework Comparison",
    subtitle: "Evolution across paradigms: Classic React, React Compiler, and OctaneJS + TSRX",
    phase: "Drawer 3 // Matrix",
    tags: ["Matrix", "React Compiler", "OctaneJS", "TSRX"],
    notes: [
      "Compare the 4 primary axes: Virtual DOM, Rules of Hooks, Event System, and Dependency Management.",
      "Note that while Meta's React Compiler automates useMemo, it retains the underlying Virtual DOM and SyntheticEvent runtime.",
      "OctaneJS + TSRX achieves both developer ergonomics and true compiled O(1) performance."
    ]
  },
  {
    id: 16,
    title: "Incremental Migration & Compatibility Wrappers",
    subtitle: "Zero all-or-nothing risk: Bridge legacy React codebases and modern Octane pipelines",
    phase: "Drawer 4 // Meaning",
    tags: ["OctaneCompat", "ReactCompat", "Interoperability", "Future Frontend"],
    notes: [
      "Migration does not require a risky greenfield rewrite.",
      "OctaneCompat lets developers isolate high-frequency performance bottlenecks (grids, live feeds) within existing React apps.",
      "ReactCompat allows an Octane app to host complex third-party React libraries (charts, 3D canvases), preserving full ecosystem leverage."
    ]
  },
  {
    id: 17,
    title: "The Reactive Architecture Evolution Summary",
    subtitle: "Synthesizing the Keynote: From manual jQuery DOM to Ahead-of-Time direct mutation",
    phase: "Keynote Synthesis",
    tags: ["Summary", "Synthesis", "The Future", "O(1)", "TSRX", "OctaneJS"],
    notes: [
      "Review the grand synthesis of the keynote:",
      "Highlight the core thesis: 'The future of frontend combines the developer familiarity of React, the clean syntax of TSRX, and the raw O(1) performance of OctaneJS.'",
      "Reinforce the 4-era timeline: Manual DOM, Virtual DOM, Svelte's Rebellion, and the compiled fine-grained reactive era."
    ]
  },
  {
    id: 18,
    title: "The End ~ Fin ~",
    subtitle: "Classic vintage cinema title card • Presented by Avi Levkovich",
    phase: "Conclusion",
    tags: ["The End", "Vintage Cinema", "Credits", "Avi Levkovich", "Q&A"],
    notes: [
      "Vintage cinema closing title card.",
      "Thank the audience for their time and attention.",
      "Open the floor for questions, architecture discussions, and feedback."
    ]
  }
];
