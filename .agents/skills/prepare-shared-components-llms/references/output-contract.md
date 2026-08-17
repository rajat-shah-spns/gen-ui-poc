# Output Contract

All generated artifacts must derive from a single typed manifest. The manifest is the canonical generated representation; Markdown is a projection for agents and people.

## Recommended Public Layout

```text
public/
  llms.txt
  llms-full.txt
  llms/
    components.manifest.json
    components/
      button.md
      checkbox.md
      data-table.md
```

Adapt the source directory to the Storybook static-assets configuration while preserving the published URLs.

## `llms.txt`

Follow the llms.txt specification:

```md
# Sapiens Shared Components Kit

> AI-readable reference for the public React components exported by `@sapiens-digital/shared-components-kit`.

Package version: X.Y.Z. Generated from revision: SHA. This index links to complete Markdown component contracts. Public TypeScript exports are authoritative when examples conflict.

## Components

- [Button](https://storybook-origin/llms/components/button.md): Action control; readiness: ready.
- [DataTable](https://storybook-origin/llms/components/data-table.md): Complex tabular data display; readiness: adapter-required.

## Guides

- [Complete component reference](https://storybook-origin/llms-full.txt): Concatenated component documentation.
- [Machine-readable manifest](https://storybook-origin/llms/components.manifest.json): Versioned structured inventory.

## Optional

- [Storybook](https://storybook-origin/): Interactive examples and human documentation.
```

Keep the index concise. Every public component must be linked, but detailed props belong in component pages.

## Per-Component Markdown

Each component page must use this stable shape:

```md
# Button

> One-sentence purpose.

- Package: `@sapiens-digital/shared-components-kit`
- Import: `import { Button } from '@sapiens-digital/shared-components-kit'`
- Category: form control
- Status: stable
- Generative UI readiness: ready
- Source: `libs/shared-components-kit/.../Button.tsx`
- Storybook: https://storybook-origin/?path=/docs/components-button--docs

## Use When

Concise semantic guidance.

## Avoid When

Concise limitations and alternatives.

## Props

| Name | Type | Required | Default | Description | Constraints |
| --- | --- | --- | --- | --- | --- |

## Events

| Prop | Signature | Meaning |
| --- | --- | --- |

## Composition

Children, slots, compound parts, providers, and allowed nesting.

## State

Controlled/uncontrolled contract, values, and state transitions.

## Accessibility

Labels, keyboard behavior, focus management, roles, and consumer obligations.

## Styling and Tokens

Variants, supported tokens, required styles, themes, responsive and RTL behavior.

## Examples

Minimal public-import examples and canonical Storybook story links.

## Foundation Generative UI Readiness

- Status: ready | adapter-required | restricted | not-suitable | unknown
- JSON-safe props: ...
- Adapter-only props: ...
- Semantic events: ...
- Candidate slots: ...
- Risks and required safeguards: ...
- Readiness gaps: ...

## Deprecation

Status, replacement, and migration guidance, or `Not deprecated`.

## Evidence

Repository-relative source symbols, stories, MDX, tests, and token docs.
```

Use JSON or TypeScript examples only when supported by source. Avoid implementation-internal examples.

## `llms-full.txt`

The full file must contain:

1. Project summary and interpretation rules.
2. Package/version/source metadata.
3. All component pages in deterministic category/name order.
4. A generated table of contents.
5. No Storybook navigation chrome or duplicate story prose.

The file may be large; it exists for explicit full-context use and is not the primary discovery file.

## Manifest Schema

Use a versioned JSON document conceptually equivalent to:

```ts
interface ComponentManifest {
  schemaVersion: string;
  package: {
    name: '@sapiens-digital/shared-components-kit';
    version: string;
    sourceRevision: string;
    storybookOrigin: string;
    generatedAt: string;
  };
  components: ComponentRecord[];
  exclusions: ExclusionRecord[];
  conflicts: EvidenceConflict[];
}

interface ComponentRecord {
  key: string;
  exportName: string;
  importPath: string;
  sourcePath: string;
  category: string;
  summary: string;
  status: 'stable' | 'experimental' | 'deprecated';
  props: PropRecord[];
  events: EventRecord[];
  slots: SlotRecord[];
  composition: string[];
  accessibility: string[];
  dependencies: string[];
  tokens: string[];
  stories: StoryRecord[];
  readiness: ReadinessRecord;
  evidence: EvidenceRecord[];
}
```

Define the concrete schema with the repository's existing validation technology. Validate generated JSON before writing Markdown.

## Determinism

- Sort keys and records consistently.
- Use a supplied timestamp/source revision in tests.
- Normalize paths to `/` and line endings to LF.
- Do not include machine-specific absolute paths.
- Ensure two runs at the same revision produce byte-identical files except where the repository intentionally records generation time.
