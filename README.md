# SPIDER — Security Agency Concept

A cinematic, editorial portfolio concept for a security agency, built as a responsive React experience with custom motion, a procedural security-network visualization, and a reusable geometric identity system.

> [!IMPORTANT]
> SPIDER is an independent, unofficial portfolio concept. It is not the official website of the security agency referenced by the interface, and it is not affiliated with or endorsed by that company. Brand references are used only to demonstrate product design and frontend engineering skills.

## Live Demo

**[Explore the deployed experience →](https://newocontrary.github.io/spider59/)**

The interface is written in Russian. For the intended experience, view it in a modern browser with JavaScript enabled; motion is automatically simplified when the operating system requests reduced motion.

## Overview

SPIDER reimagines how a private-security company can present operational confidence without relying on conventional corporate imagery. The concept combines oversized typography, controlled red illumination, thin technical geometry, and a system of connected nodes to make security feel like an active infrastructure rather than a static promise.

The project is a client-side, single-page presentation. It covers the agency story, protection directions, services and pricing, response process, security-network concept, advantages, and direct contact details. The production build is static and is deployed automatically to GitHub Pages.

### Project goals

- Modernize the visual language commonly associated with the security industry.
- Balance a distinctive digital identity with clear service and pricing information.
- Turn the ideas of monitoring, routing, and response into a coherent interaction language.
- Keep the experience expressive without allowing motion to interfere with content.
- Provide purpose-built desktop, tablet, mobile, and reduced-motion behavior.
- Produce a maintainable static application that can be deployed without a backend.

## Design Concept

The visual system is based on a simple operational sequence:

```text
NODE  →  SIGNAL  →  ROUTE  →  RESPONSE
source   detection   network   resolution
```

- **Node** — a protected location, control point, or system endpoint.
- **Signal** — a red active state that marks attention or an incoming event.
- **Route** — the connected infrastructure through which information travels.
- **Response** — the coordinated action that completes the sequence.

This model appears across the project in the custom SVG mark, square control nodes, border intersections, progress rails, Canvas signals, and restrained pointer responses. Black and near-black surfaces provide depth; red is reserved for signals, current states, and localized ambient light. A warm editorial section interrupts the dark sequence to give the response process a deliberate change of pace.

## Key Features

- Custom intent-driven preloader with a branded SVG route sequence.
- Fixed responsive header with active-section tracking and an accessible mobile menu.
- Oversized display typography tuned for the current responsive grid.
- GSAP reveal choreography and ScrollTrigger-driven section narratives.
- Lenis smooth scrolling synchronized with the GSAP ticker.
- Pinned desktop storytelling for the company story, response process, and advantages.
- Linear tablet and mobile alternatives to the pinned desktop interactions.
- Procedural Canvas security network with responsive topology and randomized signal routes.
- Fine-pointer ambient lighting and localized pointer reveals.
- Reusable geometric logo mark and inline system-icon family.
- Explicit `prefers-reduced-motion` handling across scrolling, animation, pointer, and Canvas systems.
- Automated production deployment through GitHub Actions and GitHub Pages.

## Technology Stack

| Area | Technology | Role in the project |
| --- | --- | --- |
| Application | React 19 | Component composition, state, effects, and lifecycle management |
| Build tooling | Vite 7 | Local development, optimized static builds, and repository-aware base paths |
| Language | JavaScript / JSX | Application and interaction logic |
| Styling | CSS | Tokens, responsive grids, typography, visual states, and transitions |
| Motion | GSAP 3 | Timelines, reveals, transforms, and scoped animation contexts |
| Scroll scenes | GSAP ScrollTrigger | Pinned narratives, scrubbed progress, and viewport-triggered choreography |
| Smooth scrolling | Lenis 1 | Inertial scrolling and programmatic anchor navigation |
| Visualization | Canvas 2D API | Animated network topology, signals, and pointer displacement |
| Identity graphics | SVG | Logo geometry, system icons, route lines, and decorative marks |
| Quality | ESLint 9 | JavaScript, React Hooks, and React Refresh linting |
| Package manager | pnpm | Reproducible dependency installation via `pnpm-lock.yaml` |
| Delivery | GitHub Actions / Pages | Automated static build and hosting |

The display system uses **Geologica** for filled display typography, **Onest** for outline treatments, and **Manrope** for body copy. The fonts are loaded from Google Fonts in `index.html`.

## Application Architecture

The codebase is organized around reusable foundation components, page-level sections, shared motion hooks, and centralized styling primitives.

```text
main.jsx
└── App.jsx
    ├── application hooks
    │   ├── Lenis ↔ GSAP ticker ↔ ScrollTrigger
    │   └── fine-pointer ambient controller
    ├── Preloader
    ├── Header
    ├── main
    │   ├── Hero
    │   ├── About + protection directions
    │   ├── Services
    │   ├── Statement
    │   ├── Process
    │   ├── SecurityVisual + Canvas network
    │   ├── Advantages
    │   └── Contact
    └── Footer
```

`main.jsx` mounts the application in React Strict Mode. `App.jsx` defines the page sequence and activates the two application-level hooks. Each animated section owns its GSAP setup and cleanup through `gsap.context()` or `gsap.matchMedia()`, keeping selectors and ScrollTriggers local to the component.

Static content currently lives close to the section that presents it. This keeps the concept easy to inspect and edit without introducing a data layer that the project does not need.

## Project Structure

```text
spider59/
├── .github/workflows/deploy.yml
├── public/favicon.svg
├── src/
│   ├── components/
│   │   ├── Header/
│   │   ├── Logo/
│   │   │   ├── Logo.jsx
│   │   │   ├── LogoMark.jsx
│   │   │   ├── Logo.css
│   │   │   └── logoGeometry.js
│   │   ├── Preloader/
│   │   ├── SystemIcon/
│   │   └── ui/Button/
│   ├── hooks/
│   │   ├── usePointerAmbient.js
│   │   └── useSmoothScroll.js
│   ├── sections/
│   │   ├── About/
│   │   ├── Advantages/
│   │   ├── Contact/
│   │   ├── Footer/
│   │   ├── Hero/
│   │   ├── Process/
│   │   ├── SecurityVisual/
│   │   │   ├── SecurityVisual.jsx
│   │   │   ├── SecurityNetworkCanvas.jsx
│   │   │   ├── SecurityVisual.css
│   │   │   └── networkConfig.js
│   │   ├── Services/
│   │   └── Statement/
│   ├── styles/
│   │   ├── animations.css
│   │   ├── global.css
│   │   ├── index.css
│   │   ├── reset.css
│   │   ├── typography.css
│   │   └── variables.css
│   ├── utils/motion.js
│   ├── App.jsx
│   └── main.jsx
├── eslint.config.js
├── index.html
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── vite.config.js
```

## Page Structure

| Order | Area | Purpose |
| ---: | --- | --- |
| 0 | Preloader | Introduces the identity, waits for user intent, and coordinates the initial reveal |
| 1 | Header | Provides section navigation, contact CTA, and responsive menu behavior |
| 2 | Hero | Establishes the core security proposition with oversized typography |
| 3 | About | Presents the agency overview, operating facts, and protection directions |
| 4 | Services | Lists eight security services with descriptions, included work, and pricing units |
| 5 | Statement | Creates a concise transition between service information and operations |
| 6 | Process | Explains the four-stage response workflow through a progress-led narrative |
| 7 | Security Visual | Turns the connected-security concept into an animated Canvas system |
| 8 | Advantages | Presents four differentiators with a stepped active-state sequence |
| 9 | Contact | Exposes direct telephone, email, address, and working-hours information |
| 10 | Footer | Closes the composition with navigation, contacts, and the outline wordmark |

## Motion and Interaction System

Motion is treated as part of the security metaphor rather than as independent decoration.

### Reveal

Text masks, opacity changes, and vertical transforms introduce information in controlled groups. Hero choreography begins only after the preloader releases the page. Section animations are scoped to their own components and reverted when the component lifecycle ends.

### Signal

Red nodes, route traces, counters, rails, and progress states identify the part of the interface that is currently active. The Canvas network extends the same idea into a dynamic system rather than adding an unrelated visual effect.

### Response

Buttons, arrows, cards, and ambient layers react with small, bounded movements. Magnetic button behavior is enabled only for fine pointers; it moves the button content rather than destabilizing the layout.

### Scroll coordination

`useSmoothScroll.js` creates the Lenis instance and connects its animation frame to the GSAP ticker. Lenis scroll events update ScrollTrigger, internal anchors use programmatic smooth scrolling, and the preloader can lock and release the scroll instance through custom application events. If reduced motion is requested, the enhanced smooth-scroll layer is not created.

On desktop, the About, Process, and Advantages sections use pinned or scrubbed sequences. Below the desktop breakpoint they switch to direct, document-flow reveals so the content remains readable and touch-friendly.

## Security Network Visualization

The security network is rendered with the Canvas 2D API in `SecurityNetworkCanvas.jsx`; nodes and moving signals are not represented by large collections of DOM elements.

### Responsive topology

`networkConfig.js` stores normalized coordinates and links for three intentional layouts:

| Layout | Selection rule | Network nodes | Concurrent signals |
| --- | --- | ---: | ---: |
| Desktop | `width >= 1100px` | 22 | Up to 3 |
| Tablet | `768px <= width < 1100px` | 12 | Up to 2 |
| Mobile | `width < 768px` | 7 | 1 |

A `ResizeObserver` selects the topology from the rendered width, scales normalized points into Canvas coordinates, updates the central-logo position, and rebuilds the adjacency map. Device pixel ratio is capped at `2` to avoid unnecessary rendering cost on dense displays.

### Signal routing

Signals are launched by a recursive randomized timer rather than a fixed interval. Their sources are distributed across spatial zones and recent sources are excluded, reducing repetitive starts. A route is assembled as a bounded random walk over the topology's adjacency map, avoiding immediate backtracking and repeated nodes where possible.

Travel duration is proportional to route length, so apparent signal speed remains stable across different paths and breakpoints. The active-signal list is pruned after completion and constrained by the current layout profile.

### Runtime behavior

- A single `requestAnimationFrame` loop renders the active scene.
- An `IntersectionObserver` pauses animation when the section is outside the relevant viewport range.
- Rendering also pauses while the document is hidden.
- Fine-pointer proximity introduces subtle node displacement.
- Small sinusoidal offsets prevent the network from feeling mechanically static.
- Reduced-motion mode renders a simplified static state without continuous signals.
- Timers, observers, listeners, and animation frames are cleaned up on unmount.

The central element is the same reusable SVG mark used by the wider identity system, visually linking the Canvas implementation to the header and preloader.

## Responsive Strategy

The layout is designed around content behavior rather than a single scaled desktop composition.

- **Desktop (`>= 1024px`)** — 12-column grid, pinned narratives, horizontal process progression, full navigation, and the densest network treatment.
- **Tablet (`768px–1023px`)** — 8-column grid, document-flow storytelling, reduced network density, and fluid display sizing.
- **Mobile (`< 768px`)** — 4-column grid, menu toggle, stacked cards and contacts, linear process states, and a purpose-built compact network.

The Canvas topology changes at `1100px` and `768px`, independently from the main layout breakpoint, because its useful density depends on rendered width. Fluid `clamp()` values control padding, section spacing, and typography. Coarse-pointer layouts retain the base decorative treatment but disable pointer-following ambient behavior.

## Design System

The core tokens are defined in `src/styles/variables.css`; reset, typography, global rules, and shared animations are separated into focused stylesheets.

### Color roles

| Role | Token / value | Usage |
| --- | --- | --- |
| Signal red | `--red-primary: #e62532` | Active nodes, key lines, states, and highlights |
| On-light red | `--red-on-light: #b91325` | Red accents on the editorial light surface |
| Base black | `--bg-black: #050505` | Primary page background |
| Near black | `--bg-near-black: #09090a` | Depth and section separation |
| Charcoal | `--bg-charcoal: #100f11` | Cards and layered surfaces |
| Warm dark | `--bg-warm-dark: #140d0f` | Warmer narrative transitions |
| Burgundy | `--bg-burgundy: #1a0b0e` | Deep red-black atmosphere |
| Editorial light | `--bg-editorial: #e9e8e3` | High-contrast process section |

Text uses tiered alpha values for primary, secondary, tertiary, and muted information. Thin translucent borders, square signal nodes, negative space, and localized radial light reinforce the technical editorial character.

### Typography

- **Geologica** — filled display headings and the primary oversized voice.
- **Onest** — outline typography and large decorative word treatments.
- **Manrope** — body copy, metadata, navigation, and functional UI.

Display sizes, body sizes, container width, page padding, section spacing, header height, transitions, easing, and z-index layers are exposed as CSS custom properties.

### Identity components

`LogoMark.jsx` renders the shared SVG route, branches, and diamond node using geometry from `logoGeometry.js`. `Logo.jsx` composes the mark into full, compact, or mark-only variants. `SystemIcon.jsx` provides a related family of inline geometric icons with square corners, technical strokes, and red control nodes.

## Accessibility

The project includes practical accessibility behavior without claiming formal standards certification:

- Semantic headings, sections, articles, definition lists, navigation, and contact markup.
- Section labels connected with `aria-labelledby` where appropriate.
- Mobile navigation state exposed through `aria-expanded` and `aria-controls`.
- Active navigation exposed with `aria-current`.
- Escape-key support for closing the mobile menu.
- Visible global `:focus-visible` outlines.
- Decorative SVG, Canvas, and background elements hidden from assistive technology where applicable.
- SVG graphics marked as non-focusable when decorative.
- Telephone and email values implemented as actionable links.
- Reduced-motion branches in the preloader, smooth scrolling, section motion, pointer response, and Canvas visualization.

The repository does not currently contain a formal accessibility test suite or a documented WCAG audit; those remain appropriate follow-up tasks for a production service.

## Performance Considerations

- Vite produces a minified static production bundle in `dist/`.
- The network uses one Canvas render loop instead of a DOM node per particle or connection.
- Canvas resolution is bounded by a device-pixel-ratio cap.
- Intersection and document-visibility checks prevent unnecessary off-screen animation work.
- Resize handling uses `ResizeObserver` instead of continuous dimension polling.
- Pointer and scroll listeners are passive where the interaction allows it.
- Lenis is driven by the GSAP ticker instead of maintaining a competing loop.
- GSAP contexts, media queries, ScrollTriggers, timers, observers, event listeners, and Canvas frames have explicit cleanup paths.
- Most visual motion uses transforms and opacity rather than layout-changing properties.

No Lighthouse score or production performance budget is asserted in this repository.

## Getting Started

### Prerequisites

- A modern Node.js release. Node.js 22 is recommended to match the deployment workflow.
- [pnpm](https://pnpm.io/) installed locally.
- Git.

### Installation

```bash
git clone https://github.com/newocontrary/spider59.git
cd spider59
pnpm install
```

### Start the development server

```bash
pnpm dev
```

Vite prints the local URL in the terminal, typically `http://localhost:5173/` when that port is available.

No project-specific environment variables are required for local development.

## Available Scripts

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the Vite development server with hot module replacement |
| `pnpm build` | Create the optimized static build in `dist/` |
| `pnpm preview` | Serve the production build locally for verification |
| `pnpm lint` | Run ESLint across the repository |

## Production Build

```bash
pnpm lint
pnpm build
pnpm preview
```

`pnpm preview` is a local verification server, not a production hosting command. Deploy the generated `dist/` directory to a static host.

## Deployment

The repository includes `.github/workflows/deploy.yml`, which deploys the site to GitHub Pages.

```text
push to main / manual dispatch
              │
              ▼
        GitHub Actions
              │
     Node 22 + pnpm 11
              │
  pnpm install --frozen-lockfile
              │
         pnpm build
              │
              ▼
       upload dist artifact
              │
              ▼
        GitHub Pages deploy
```

The workflow can run after a push to `main` or through `workflow_dispatch`. It uses GitHub's Pages environment and the minimal permissions required to read repository contents and publish a Pages artifact.

`vite.config.js` calculates the production base path from GitHub's `GITHUB_REPOSITORY` value when the build runs in GitHub Actions. For this repository the deployed asset prefix becomes `/spider59/`; local builds use `/`. This avoids hard-coding a development subpath while keeping GitHub Pages assets and internal references valid.

### Deploying a fork

1. Enable GitHub Pages with **GitHub Actions** as the source in repository settings.
2. Push to the deployment branch or update the trigger if it is not `main`.
3. Run the deployment workflow.
4. Vite derives the base path from the fork's repository name during the Actions build.

## Configuration and Content Editing

| Concern | Source of truth |
| --- | --- |
| Page order | `src/App.jsx` |
| Global design tokens | `src/styles/variables.css` |
| Shared typography | `src/styles/typography.css` |
| Services and prices | `src/sections/Services/Services.jsx` |
| Company facts and protection directions | `src/sections/About/About.jsx` |
| Response stages | `src/sections/Process/Process.jsx` |
| Advantages | `src/sections/Advantages/Advantages.jsx` |
| Contact details | `src/sections/Contact/Contact.jsx` |
| Network nodes, links, and layouts | `src/sections/SecurityVisual/networkConfig.js` |
| Canvas routing and timing | `src/sections/SecurityVisual/SecurityNetworkCanvas.jsx` |
| Shared logo geometry | `src/components/Logo/logoGeometry.js` |
| Motion registration and defaults | `src/utils/motion.js` |
| Deployment behavior | `.github/workflows/deploy.yml` and `vite.config.js` |

When changing section content, preserve the semantic heading order and verify long Russian display lines at desktop, tablet, and mobile widths. When changing network topology, keep node coordinates normalized between `0` and `1` and ensure each referenced link endpoint exists.

## Browser Support

The experience targets current evergreen browsers with support for modern JavaScript, CSS custom properties, Canvas 2D, `IntersectionObserver`, `ResizeObserver`, and Pointer Events. The repository does not define a formal Browserslist matrix or legacy-browser polyfill bundle.

Content remains available when enhanced pointer behavior is unavailable. Touch and coarse-pointer devices receive the responsive layout without mouse-specific ambient or magnetic interactions.

## Development Notes

- The project is written in JavaScript and JSX; it does not use TypeScript application source.
- Section-specific CSS is colocated with its React component, while shared primitives live in `src/styles`.
- The application has no router because the experience is one continuous page.
- Internal navigation uses section anchors enhanced by Lenis when smooth motion is allowed.
- The preloader emits application events to coordinate scroll locking and the initial hero reveal.
- The large decorative SPIDER wordmarks are non-interactive and protected from selection and dragging.
- The application does not require runtime environment secrets or an API client.

## Known Limitations

- The concept is a static frontend presentation with no CMS, authentication, or backend.
- Contact actions use direct telephone and email links; there is no form-processing service.
- Content records and contact information are maintained directly in section source files.
- Fonts are requested from Google Fonts and depend on that external delivery path.
- The repository has no automated unit, end-to-end, visual-regression, or accessibility test suite.
- Browser support is based on modern platform APIs rather than a formal compatibility matrix.

## Possible Improvements

- Add repository-owned desktop and mobile screenshots or a short interaction reel.
- Add Playwright coverage for navigation, preloader release, responsive states, and reduced motion.
- Introduce automated visual-regression and accessibility checks for motion-heavy sections.
- Self-host and subset fonts if the concept is adapted for production use.
- Move editable business content into a typed module or CMS if non-developers need to maintain it.

## Disclaimer

SPIDER is an unofficial design and frontend-development case study created for portfolio purposes. It is not the official website of the referenced security agency. Names, service context, and contact-style content appear only as part of the concept demonstration and should be reviewed or replaced before any real commercial use.

## Author

Design and development by [@newocontrary](https://github.com/newocontrary).
