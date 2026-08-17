# Foundation Generative UI Readiness Rules

Readiness metadata describes how a component library API could be adapted later. It is not a json-render catalog decision.

## Safe Data Shapes

Generally JSON-safe:

- Bounded strings, numbers, and booleans.
- Literal unions and enums.
- Arrays and records with explicit bounded schemas.
- Serializable date/time strings with documented formats.
- Stable icon or illustration names from an allowlist.
- Semantic variants, sizes, statuses, and alignment values.

Generally adapter-only or restricted:

- `ReactNode`, `ReactElement`, component types, portals, and JSX callbacks.
- Render props and functions returning UI.
- Event callbacks and arbitrary functions.
- Refs, DOM nodes, classes, and browser objects.
- `className`, style objects, CSS strings, and token override objects.
- Unrestricted URLs, HTML, Markdown with raw HTML, and file/blob inputs.
- Service clients, query objects, application stores, and domain entities with methods.
- Props that initiate network calls, downloads, uploads, navigation, or mutations.

## Classification

### `ready`

Use only when:

- The component is publicly exported and not deprecated.
- Its behavior and accessibility obligations are documented.
- Its useful presentation API can be represented with bounded JSON-safe values.
- Callback behavior can later be mapped to named semantic events.
- Composition and required providers are understood.
- No privileged side effect occurs merely by rendering it.

### `adapter-required`

Use when the component is suitable but its native API should not be exposed directly. Typical reasons include React-node slots, render functions, complex table columns, compound APIs, design-system objects, or callback-heavy controlled state.

Document the proposed semantic adapter boundary without implementing it.

### `restricted`

Use for components involving:

- File upload/download or camera access.
- External navigation or deep links.
- Data fetching, mutations, or application API clients.
- Rich text or potentially unsafe content.
- Sensitive records or authorization-dependent presentation.
- Destructive or irreversible actions.

Document required allowlists, confirmation, authorization, content validation, and application ownership.

### `not-suitable`

Use for deprecated-only/internal components, non-runtime docs utilities, token tools, arbitrary-code renderers, or APIs that cannot be represented safely without changing their purpose.

### `unknown`

Use when public types, behavior, ownership, or documentation conflict or are incomplete. Record exact evidence gaps and an owner. CI should reject unallowlisted `unknown` records.

## Events

Document callback props as semantic event candidates:

```text
Native callback: onClick(event)
Semantic event candidate: press
Payload candidate: none
```

Never serialize callback source. Do not define application actions in this readiness pass.

## Slots

For every `children` or React-node prop, classify it as:

- Candidate generated-component slot.
- Application-owned slot.
- Fixed adapter content.
- Unsupported arbitrary content.

Document allowed child categories and cardinality where known.

## Complex Components

For DataTable, forms, navigation shells, chat, drawers, file uploaders, and similar components:

- Separate visual configuration from data/service integration.
- Identify the smallest serializable presentation contract.
- Mark cell renderers, data providers, API clients, and callbacks as adapter/application owned.
- Record element/row limits needed to bound generated specifications.
- Prefer `adapter-required` or `restricted` until reviewed.

## Readiness Review Gate

A component is ready for downstream catalog consideration only when its record has:

- No unresolved type or evidence conflict.
- Explicit JSON-safe and adapter-only prop lists.
- Event and slot classifications.
- Accessibility obligations.
- Deprecation status.
- Security and side-effect review.
- At least one verified public-import example.
