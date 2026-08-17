---
name: prepare-shared-components-llms
description: "Prepare @sapiens-digital/shared-components-kit for AI and Foundation Generative UI by inventorying every public React component, extracting authoritative TypeScript props and Storybook usage, and generating llms.txt, llms-full.txt, and per-component Markdown. Use when creating, refreshing, validating, or publishing AI-readable component-library documentation. This skill documents the library only; it must not create a json-render catalog or registry."
argument-hint: "Optional: package root, Storybook URL, or output directory"
user-invocable: true
disable-model-invocation: false
---

# Prepare Shared Components for AI

Prepare `@sapiens-digital/shared-components-kit` as an authoritative, machine-readable source from which a separate implementation can later generate a Foundation Generative UI catalog and registry.

The deliverable is component-library documentation, not json-render integration. Do not create or modify a json-render catalog, registry, generation prompt, model call, or application action handler.

## Defaults

- Package: `@sapiens-digital/shared-components-kit`
- Published Storybook: `https://dig-pf-storybook-components.sapiens.com/`
- Storybook index: `https://dig-pf-storybook-components.sapiens.com/index.json`
- Expected source area when working in the library monorepo: `libs/shared-components-kit/`
- Preferred published output: the Storybook site's root or a stable `/ai/` path

Treat these as defaults, not assumptions. Confirm the actual repository layout, package exports, Storybook version, build output, and static-asset configuration before editing.

## Required Outputs

Generate all of these artifacts from one canonical inventory:

1. `llms.txt`: concise project overview and links to LLM-friendly component documentation.
2. `llms-full.txt`: concatenated full reference for agents that intentionally request complete context.
3. One Markdown file per public component under a stable directory such as `llms/components/`.
4. A machine-readable manifest such as `llms/components.manifest.json` for completeness checks and downstream automation.
5. An idempotent generator in the component-library repository so these files can be rebuilt in CI.
6. A validation command that fails when public exports and generated documentation drift.

Follow the exact artifact contract in [output-contract.md](./references/output-contract.md).

## Authoritative Sources

Use evidence in this priority order:

1. Public package exports and declaration/type source: authority for what consumers can import and the exact API.
2. Component implementation and exported prop types: authority for behavior not represented in declarations.
3. Storybook CSF stories, MDX, `argTypes`, controls, tags, and examples: authority for supported usage and intended variants.
4. Tests and interaction tests: evidence for behavior, state transitions, accessibility, and edge cases.
5. Design-token definitions and component token docs: authority for supported tokens and theming.
6. Published Storybook `index.json`: supplementary discovery and published-link verification.

Never infer a prop solely from rendered HTML or a story title. Never claim a default, event contract, accessibility behavior, or deprecation status without source evidence.

## Workflow

### 1. Discover Repository Conventions

Before editing:

- Read repository instructions and package-specific contribution guidance.
- Identify the package root, package entry points, `exports` map, barrels, build targets, Storybook configuration, static directories, test framework, and documentation conventions.
- Identify all related packages shown in the combined Storybook. Scope this run to `@sapiens-digital/shared-components-kit`; exclude Forms Kit, icons, generic smart components, deprecated shared forms, and unrelated headless packages unless they are public dependencies that a documented component explicitly requires.
- Determine the installed TypeScript and Storybook versions before choosing parser or Storybook APIs.
- Find existing documentation generators before adding a new one.

State one falsifiable completeness hypothesis before implementation. Recommended hypothesis: every runtime React component publicly exported by `@sapiens-digital/shared-components-kit` is represented by exactly one manifest record, regardless of whether it has a Storybook story. The cheapest check is a set comparison between resolved public component exports and manifest export names.

### 2. Build the Canonical Public Export Inventory

Start from the package's public entry points, not from Storybook.

- Resolve `package.json#exports`, the primary barrel, secondary entry points, and re-exports.
- Use the TypeScript compiler API or an existing API-extractor artifact to resolve aliases and exported symbols. Do not parse TypeScript with regular expressions.
- Include runtime values that are React components, compound component roots/parts, or documented component factories intended for consumers.
- Record exported public prop types that belong to each component.
- Exclude internal-only modules, test helpers, stories, token-only modules, hooks, utilities, and types that are not components, while recording the exclusion reason.
- Preserve distinct public components even when they share an implementation.
- Detect duplicate names, aliases, versioned replacements, compound components, and deprecated exports.

The inventory must not use `index.json` as the source of truth. Storybook can omit public components and can include components from other packages.

### 3. Reconcile Storybook Evidence

Read the local CSF/MDX source when available. Use the published Storybook only as fallback and publication verification.

- Group stories and docs by public component, not merely by normalized story title.
- Match with explicit component metadata, resolved component imports, `componentPath`, story imports, and package ownership.
- Capture canonical story URLs, story names, controls, `argTypes`, tags, play-function coverage, examples, and documented design tokens.
- Record unmatched public exports as `storybookStatus: missing`.
- Record unmatched Storybook components separately; do not silently add them to the package inventory.
- Honor `deprecated` tags and source deprecation annotations.
- Exclude docs-only token pages from component count while linking them from relevant components.

The published Storybook index is large and includes several packages. Filter entries whose source ownership resolves to `libs/shared-components-kit/` and then reconcile them against public package exports.

### 4. Extract Component Contracts

Use structured TypeScript analysis for every public component.

Capture:

- Public package name, export name, import path, source path, and category.
- Human purpose, appropriate use, and inappropriate use.
- Component kind: primitive, form control, layout, feedback, navigation, data display, overlay, composite, branding, or utility.
- Props with name, normalized TypeScript type, required/optional status, default, description, constraints, and deprecation.
- Literal unions and enums as explicit allowed values.
- Events/callbacks with parameter types and semantic meaning.
- Slots, children, compound parts, allowed composition, and provider/context requirements.
- Controlled and uncontrolled state contracts.
- Ref forwarding and polymorphic rendering behavior where public.
- Accessibility contract: required labels, keyboard behavior, focus, roles, and known requirements.
- Theming, tokens, required styles, providers, assets, and peer dependencies.
- Responsive behavior, localization, right-to-left behavior, and browser constraints where documented.
- Supported examples and canonical Storybook links.
- Deprecation status, replacement, and migration note.
- Foundation Generative UI readiness metadata described below.

For inherited native attributes, summarize the inherited interface and document component-specific overrides. Do not dump the complete DOM attribute type into every page.

### 5. Classify Generative UI Readiness

This classification prepares the library but does not decide catalog inclusion.

Assign one status:

- `ready`: public, documented, serializable props are sufficient, behavior is understood, and safe adapter boundaries are clear.
- `adapter-required`: usable through a future adapter because public props contain React nodes, callbacks, render functions, complex classes, or application-owned objects.
- `restricted`: security-sensitive, side-effectful, data-fetching, file-handling, navigation, or context-heavy; requires explicit application policy.
- `not-suitable`: internal/deprecated-only, arbitrary code/HTML, irreducibly non-serializable configuration, or not a runtime component.
- `unknown`: evidence is incomplete; generation must fail validation until reviewed.

For each component, document:

- JSON-safe props that could be exposed directly later.
- Props requiring translation by an adapter.
- Callback props represented only as semantic event names, never function source.
- Candidate child slots and composition constraints.
- Security, privacy, accessibility, and side-effect concerns.
- Missing documentation or API changes needed to reach `ready`.

Follow [readiness-rules.md](./references/readiness-rules.md). Do not generate Zod schemas or json-render definitions in this skill.

### 6. Implement an Idempotent Generator

Prefer a TypeScript generator that runs in the existing workspace toolchain.

The generator should:

- Resolve public exports through the TypeScript compiler or an existing structured API model.
- Parse Storybook `index.json` as JSON and local CSF/MDX through supported APIs or AST tooling.
- Merge evidence deterministically into one typed manifest.
- Sort components by stable category and export name.
- Emit `llms.txt`, per-component Markdown, `llms-full.txt`, and the JSON manifest from the same records.
- Normalize line endings and URLs.
- Include package version, generation timestamp, source revision, schema version, and Storybook origin.
- Refuse to overwrite reviewed human annotations unless the repository defines an explicit merge strategy.
- Report unresolved types, ambiguous story matches, broken links, duplicate exports, and undocumented components.

Do not add a new parsing dependency when the repository already has TypeScript, API Extractor, Storybook indexers, or an equivalent structured source. If a new package is required, explain why and use a maintained library.

### 7. Integrate with Storybook Publication

- Place generated files in the Storybook static-assets pipeline so production serves a stable `llms.txt` URL.
- Prefer `/llms.txt` at the Storybook origin. If infrastructure cannot support root placement, use `/ai/llms.txt` and document that scope.
- Serve component Markdown files at stable public URLs referenced by `llms.txt`.
- Serve `llms-full.txt` and the manifest beside the index.
- When infrastructure supports it, add `Link` headers or HTML links with `rel="describedby"` for `llms.txt` and `rel="alternate" type="text/markdown"` for Markdown documentation.
- Verify the deployed URLs, content types, cache behavior, and absence of authentication redirects expected to block approved agents.

### 8. Add CI Drift Protection

Add repository-native commands equivalent to:

```text
docs:llms:generate
docs:llms:check
```

The check command must regenerate in a clean temporary location or run generation followed by a clean-tree assertion. It must fail on:

- Missing or extra public component records.
- Duplicate manifest keys.
- Unresolved public prop types.
- Broken internal documentation links.
- Invalid manifest schema.
- `unknown` readiness unless explicitly allowlisted with an owner and reason.
- Deprecated components without replacement/status notes.
- Generated-file drift.

Do not require network access for normal CI when source and Storybook build metadata are available locally. Keep published-URL checks in a separate deployment smoke test.

### 9. Validate Quality and Completeness

Run all relevant package lint, type, unit, documentation, and Storybook build checks.

Also verify these set relationships:

```text
public runtime component exports == manifest documented exports
manifest component keys == generated component Markdown keys
llms.txt component links == published component Markdown URLs
```

Manually review a representative sample that includes:

- A simple primitive such as Button or Badge.
- A controlled input such as Checkbox, Select, or DatePicker.
- A compound component such as Accordion or CardV1.
- An overlay such as Dialog or Drawer.
- A complex data component such as DataTable.
- A deprecated component.
- A public component with no Storybook documentation, if any.

Ask an agent, using only `llms.txt` as its starting point, to answer import, props, composition, event, accessibility, and readiness questions. Verify that it follows links and does not invent APIs.

## Evidence and Conflict Rules

- Public types override Storybook controls when they disagree on the API.
- Explicit source defaults override story default args.
- Story examples describe usage but do not expand the public contract.
- Deprecation in any authoritative source must be retained until manually resolved.
- If evidence conflicts, record the conflict in the manifest and mark readiness `unknown`; do not guess.
- Preserve source citations as repository-relative paths and line-independent symbol references where possible.

## Completion Report

At the end, report:

- Public components found, documented, deprecated, missing Storybook coverage, and excluded.
- Readiness counts by status.
- Unresolved evidence conflicts and owners needed.
- Generated and published artifact paths/URLs.
- Validation commands and results.
- Any source-library improvements required before downstream catalog/registry automation is trustworthy.

## Prohibited Outcomes

- Do not create a json-render catalog or registry.
- Do not decide that every library component belongs in a generative catalog.
- Do not expose callbacks as serializable function strings.
- Do not treat `className`, raw CSS, raw HTML, arbitrary URLs, or renderer functions as model-safe props.
- Do not describe private/internal components as package APIs.
- Do not fabricate missing docs from component names or screenshots.
- Do not publish one enormous `llms.txt` with all details; use the concise index, linked component pages, and `llms-full.txt` structure.
