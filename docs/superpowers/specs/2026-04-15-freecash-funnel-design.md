# FreeCash Bridge Funnel Design

## Overview

Build a local mobile web implementation of the Stitch project `Freecash Install Funnel` as a 3-screen linear bridge funnel for Instagram ad traffic. This is not a full application. It is a single-session frontend funnel whose only external link is the CTA on the final screen.

The local build must use the following Stitch screens as the visual source of truth:

- `Page 1 FINAL` -> `projects/17260101739451873134/screens/fb332b1f2f86420b861fe5c36be450f9`
- `Page 2 FINAL` -> `projects/17260101739451873134/screens/551333f2eeed418a9855b7cca40eaeda`
- `Page 3 FINAL` -> `projects/17260101739451873134/screens/bc6feb1fed1b4d578341fad4ced61172`

The implementation approach is HTML-first transplant:

- Use the Stitch-exported HTML for those three final screens as the baseline visual implementation.
- Keep the exported markup and styling as intact as possible.
- Add only the minimum local app shell and behavior code required to make the funnel functional.
- Use the final screenshots as a secondary verification reference only if the exported HTML needs small correction patches.

## Goals

- Recreate the finalized Stitch design locally as closely as possible.
- Preserve the original visual hierarchy, spacing, typography, copy, and screen sequencing.
- Add the exact required behavior for the funnel flow without redesigning the UI.
- Keep the implementation maintainable enough to support later copy/link adjustments.

## Non-Goals

- No authentication
- No database
- No user accounts
- No back navigation
- No multi-page site structure beyond the 3-screen funnel
- No design simplification, cleanup, or stylistic reinterpretation

## User Flow

The funnel flow is fixed and linear:

1. Screen 1: Hook & Qualify
2. Screen 2: Transition / Loading
3. Screen 3: Confirm & Install

Users cannot move backward. The funnel resets only on page refresh.

## Architecture

The local app will consist of:

- A root funnel controller that tracks the active screen in memory
- Three screen wrappers, one per Stitch final screen export
- A small behavior layer that wires interaction and timers into rendered screen markup
- Shared constants for durations and the placeholder affiliate URL
- A narrow patch layer for any required integration fixes such as viewport sizing, event hooks, or missing asset/font loading

The app shell owns state and behavior. The imported Stitch HTML remains the visual source of truth.

## Screen Requirements

### Screen 1: Hook & Qualify

Source of truth:

- Stitch screen `Page 1 FINAL`

Behavior:

- Both age selection buttons advance to Screen 2
- There is no conditional branching
- Any tappable age option on this screen must route to the same next step

Constraints:

- Do not change copy or restructure layout
- Preserve the visual emphasis and CTA treatment from Stitch

### Screen 2: Transition / Loading

Source of truth:

- Stitch screen `Page 2 FINAL`

Behavior:

- No user input
- Three checklist items animate on sequentially
- Each item appears about `700ms` after the previous one
- A progress bar fills from `0%` to `100%` over `2500ms`
- Once the progress bar completes, the funnel auto-advances to Screen 3

Timing behavior details:

- The sequential checklist reveal starts automatically when Screen 2 mounts
- The progress bar starts automatically when Screen 2 mounts
- Auto-advance is tied to the completion of the progress duration, not a manual interaction

Constraints:

- Keep the loading screen visually identical to Stitch apart from minimal functional hooks

### Screen 3: Confirm & Install

Source of truth:

- Stitch screen `Page 3 FINAL`

Behavior:

- Countdown timer starts at `14:59`
- Timer counts down in real time once Screen 3 mounts
- CTA button points to a placeholder affiliate URL constant that can be swapped later
- Everything other than the timer and CTA destination is static

Linking constraints:

- The CTA is the only external link in the funnel
- All other interactions remain local to the funnel

## Implementation Rules

- Prefer transplanting the exported Stitch HTML directly into local screen wrappers
- Avoid rewriting the screen markup unless integration issues force a minimal patch
- Keep any code changes scoped to function, responsiveness, and rendering correctness
- Do not invent new components, sections, or alternate states
- Do not add optional UX enhancements that alter the designed flow

## Responsive Scope

- Optimize for mobile portrait presentation around `390px` width
- Ensure the funnel renders correctly on common narrow mobile widths near the Stitch target
- Desktop can be a centered preview shell if needed, but the design target is mobile

## State Model

Minimal in-memory state only:

- Current funnel screen
- Screen 2 checklist reveal state
- Screen 2 progress state
- Screen 3 remaining countdown time

No persisted state is required.

## Error Handling

This funnel has minimal runtime complexity. Error handling should stay lightweight:

- If a timer cleanup is needed during screen transitions, it must happen automatically
- If a screen export needs a small DOM patch for functionality, keep that patch local and explicit
- Avoid introducing async dependencies that could block the screen flow

## Verification

The implementation is complete only when all of the following are true:

- The local build uses `Page 1 FINAL`, `Page 2 FINAL`, and `Page 3 FINAL` as the source screens
- Screen 1 advances to Screen 2 from both age buttons
- Screen 2 reveals three checklist items sequentially at about `700ms` intervals
- Screen 2 progress fills over `2500ms`
- Screen 2 auto-advances on progress completion
- Screen 3 timer starts at `14:59` and decrements in real time
- Screen 3 CTA uses a placeholder affiliate URL constant
- The CTA is the only external link
- The rendered funnel visually matches the Stitch finals closely at mobile width

## Notes

- Because the workspace is not a git repository, this spec may not be committed in version control unless the project is later initialized as one.
- Final visual fidelity takes priority over code elegance when the two are in tension, provided the implementation remains understandable and functional.
