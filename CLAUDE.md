# Design Prototyping Kit — Claude Instructions

## Purpose
This repo is for creating UI prototypes for design review and stakeholder sharing.
Do not add backend logic, real API calls, or authentication. Use mock data only.

## Stack
- React + TypeScript + Vite
- Tailwind CSS v4 for styling
- No state management library — useState and useContext only

## Folder Structure
- /components — shared core UI components, use these before creating new ones
- /screens — example assembled screens for reference
- /prototypes — each designer's prototypes live here
- /tokens — design tokens as CSS custom properties

## Components
All core components live in /components/[ComponentName]/[ComponentName].tsx
Import like: `import { Button } from '../../components/Button/Button'`
Always check /components before building something new.

### Component inventory

#### Button
File: `components/Button/Button.tsx`
Props:
- `label?` — string
- `variant?` — `'accent' | 'primary' | 'secondary' | 'subtle' | 'inverted' | 'inverted-secondary' | 'error'`
- `size?` — `'small' | 'standard' | 'large'`
- `leftIcon?` — React.ReactNode
- `rightIcon?` — React.ReactNode
- `disabled?` — boolean
- `onClick?` — () => void
- `type?` — `'button' | 'submit' | 'reset'`
- `className?` — string

Variants: accent, primary, secondary, subtle, inverted, inverted-secondary, error
Sizes: small (14px), standard (16px), large (18px)

---

#### Tag
File: `components/Tag/Tag.tsx`
Props:
- `label` — string (required)
- `className?` — string

Single style: accent-500 background, white semibold uppercase text, radius-md.
Used inline within ActionRow but can be placed anywhere.

---

#### ActionRow
File: `components/ActionRow/ActionRow.tsx`
Props:
- `label` — string (required)
- `description?` — string (medium size only)
- `size?` — `'small' | 'medium'`
- `type?` — `'default' | 'subtle'`
- `leadingIcon?` — React.ReactNode (20×20, shrink-0)
- `counter?` — string (right-aligned subtle text)
- `showTag?` — boolean
- `tagLabel?` — string (defaults to `'new'`)
- `onClick?` — () => void
- `className?` — string

Sizes: small (56px, regular 14px label, no description), medium (84px min, semibold 16px label, optional description)
Types: default (no chevron), subtle (chevron shown on small only)
Uses Tag component internally when `showTag` is true.

---

#### ActionList
File: `components/ActionList/ActionList.tsx`
Props:
- `items` — ActionListItem[] (required)
- `className?` — string

ActionListItem shape:
- `id` — string (required, used as React key)
- `label` — string (required)
- `description?` — string
- `size?` — `'small' | 'medium'`
- `type?` — `'default' | 'subtle'`
- `leadingIcon?` — React.ReactNode
- `counter?` — string
- `showTag?` — boolean
- `tagLabel?` — string
- `onClick?` — () => void

Renders a vertical stack of ActionRow components. First row has no top border.
Wrap in a container with `overflow-hidden` and `rounded-[var(--radius-lg)]` to get card appearance.

---

### When a component is missing
If a designer's prototype requires a UI element that doesn't exist
in /components/, follow this process in order:

1. CHECK first — scan /components/ carefully before assuming
   something is missing. Check for similar components that could
   be composed or extended.

2. BUILD a local version in the prototype folder if it's a
   one-off or very prototype-specific element:
   /prototypes/[name]/components/[ComponentName].tsx
   Use our tokens from tokens/tokens.css and follow the same
   patterns as the shared components.

3. FLAG it to the designer with this message:
   "I've built [ComponentName] locally for this prototype as it
   doesn't exist in the shared library. If this component would
   be useful across other prototypes, consider opening a PR to
   add it to /components/."

4. NEVER use external component libraries (MUI, Chakra, shadcn etc.)
   Always build from scratch using our tokens and Tailwind.

5. NEVER invent design decisions — if unsure about colours,
   spacing or typography for a missing component, ask the designer
   to share the relevant Figma node before building.

## Prototypes
Each prototype lives in /prototypes/[designer-name]-[feature-name]/
Every prototype folder must contain:
- index.tsx — the entry point with a default export
- data.ts — all mock data
- README.md — a short description of what the prototype shows

## Design Tokens
Use Tailwind classes wherever possible.
For anything Tailwind doesn't cover, reference tokens from /tokens/tokens.css.
Never use raw hex values or pixel values outside the token system.

## Mock Data
Always create mock data in a data.ts file within the prototype folder.
Never fetch from real APIs. Never use real user data.

## Code Style
- Functional components only
- Props interfaces defined with TypeScript
- No inline styles — Tailwind classes only

## Storybook
Every component in /components must have a .stories.tsx file alongside it.
Stories must cover: all variants, all sizes, all interactive states, and disabled.
Run Storybook with: npm run storybook

## Git Workflow

Designers must always work in branches and commit regularly.
Claude Code should prompt git actions at the right moments —
never let a designer lose work or commit to main directly.

### Starting a new prototype
When a designer says they want to start a new prototype,
ALWAYS run this before creating any files:

  git checkout main
  git pull origin main
  git checkout -b prototype/[designer-name]-[feature-name]

Ask the designer for their name and the feature name if not provided.

### Committing work
Remind the designer to commit after each of these milestones:
  - After the initial prototype folder and index.tsx are created
  - After a screen or flow is assembled and working in the browser
  - After any significant change or iteration
  - Before stopping work for the day

Use clear, descriptive commit messages:
  git add .
  git commit -m "prototype/[name]: [what was built or changed]"

Example: "prototype/emma-settings: add billing section with mock data"

### Pushing and sharing
When a designer says they want to share their prototype,
ALWAYS run through this sequence:

  1. Commit any uncommitted work first
  2. Push the branch:
       git push origin [branch-name]
  3. Then ask which sharing method they want:
       a) Netlify Drop — run: npm run build
          Then tell them to drag the dist/ folder to app.netlify.com/drop
       b) GitHub PR — open a pull request on GitHub for team review

### Contributing a component to the shared library
When a designer wants to move a component from their prototype
into /components/, ALWAYS:
  1. Confirm they are on their prototype branch
  2. Copy the component to /components/[ComponentName]/
  3. Clean it up — remove prototype-specific mock data, make props generic
  4. Commit with message: "component: add [ComponentName] to shared library"
  5. Remind them to open a PR so an engineer can review before merging

### Rules Claude Code must enforce
- NEVER commit directly to main
- NEVER use "git add ." without first showing the designer what files
  will be staged with "git status"
- ALWAYS confirm before pushing to any branch
- If the designer hasn't committed in a while, remind them

## Adding a route for your prototype

Every prototype must have its own route so it can be shared via a URL.

When a designer creates a new prototype, Claude Code must:

1. Create the prototype in:
     /prototypes/[name]-[feature]/index.tsx

2. Add a route in App.tsx:
     <Route
       path="/prototypes/[name]-[feature]"
       element={<YourPrototype />}
     />

3. Add a card to the Home page index in /src/pages/Home.tsx
   so the prototype appears in the kit landing page.

4. The shareable URL will be:
     https://trusted-tom.github.io/design-prototyping-kit/
     #/prototypes/[name]-[feature]

Designers share this URL directly — no build step needed
if GitHub Pages is already deployed. To update the live
site after adding a prototype run: npm run deploy

## Form Flow Patterns

All multi-step forms and single page form screens must use the
FormFlow layout component from /components/FormFlow/FormFlow.tsx.

NEVER build a custom header or sticky footer in a prototype.
ALWAYS use the FormFlow wrapper as the root layout.

SPACING inside the content area — always use these gap values:
  - Between form fields:        16px (field title to field)     → var(--space-md)
  - Between field groups:       48px (field to field)           → var(--space-xxl)
  - Between selector options:   16px (selector spacing)         → var(--space-md)
  - Page title to description:  4px                             → var(--space-xxs)
  - Description to first field: 32px                            → var(--space-xl)

Use flex-col with gap classes — never margin-top on fields.

TYPOGRAPHY inside the content area:
  - Page title:  Bold 24px / lh 36px  / text-colour-primary-700
  - Field title: SemiBold 16px / lh 28px / text-colour-primary-700
  - Description: Regular 14px / lh 24px / text-colour-primary-900
  - Body:        Regular 16px / lh 28px / text-colour-primary-900
  - Subtle text: Regular 14px / lh 24px / text-colour-grey-700

MULTI-STEP FLOWS:
  Use local useState to track the current step.
  Each step renders different children inside the same FormFlow.
  Update title and button label per step.
  Never navigate to a new page or route.

  Example pattern:
    const [step, setStep] = useState(1)
    <FormFlow
      title={stepTitles[step - 1]}
      primaryLabel={step < total ? 'Continue' : 'Submit'}
      onPrimary={() => setStep(s => s + 1)}
      showBack={step > 1}
      onBack={() => setStep(s => s - 1)}
      footerNote={`Step ${step} of ${total}`}
    >
      {step === 1 && <StepOneContent />}
      {step === 2 && <StepTwoContent />}
    </FormFlow>
