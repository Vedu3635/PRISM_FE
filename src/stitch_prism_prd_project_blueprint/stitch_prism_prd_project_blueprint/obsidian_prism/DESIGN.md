# The Design System: Digital Luminescence

## 1. Overview & Creative North Star
**The Creative North Star: "The Obsidian Architect"**

This design system moves away from the "flat dashboard" trope and toward a high-end, editorial experience for personal finance. We are not just building an app; we are building a private vault that feels both impenetrable and infinitely deep. 

The aesthetic is driven by **Tonal Architecture**. Instead of using lines to define space, we use light and shadow to carve it out of the darkness. By utilizing intentional asymmetry—such as oversized display type paired with condensed data visualizations—we create a sophisticated rhythm that guides the user’s eye through complex financial landscapes.

## 2. Colors & Surface Philosophy

The color palette is rooted in a "Dark-First" philosophy, where color is used sparingly as a functional signal or a premium accent.

### The Foundation
- **Surface (Base):** `#101419` – The canvas.
- **Surface Container Lowest:** `#0a0e13` – Used for "sunken" areas like search bars or secondary backgrounds.
- **Surface Container High:** `#262a30` – Used for primary interactive cards.

### The "No-Line" Rule
**Lines are a failure of layout.** To create a premium feel, 1px solid borders for sectioning are strictly prohibited. Boundaries must be defined solely through:
1.  **Background Shifts:** Place a `surface-container-low` card on a `surface` background.
2.  **Negative Space:** Use the 8px spacing system (specifically `spacing-8` and `spacing-12`) to create "islands" of information.

### The "Glass & Gradient" Rule
To elevate the AI features, use Glassmorphism for floating overlays. Use the `surface-variant` color at 40% opacity with a `24px` backdrop blur. 
*   **Signature CTA:** Main actions must use a linear gradient: `primary-container` to `secondary-container` at a 135-degree angle. This provides a "soul" to the interface that flat hex codes cannot replicate.

## 3. Typography: Editorial Authority

We use **Inter** not as a utility font, but as a brand voice. The contrast between `display-lg` and `label-sm` creates an authoritative hierarchy.

| Token | Size | Weight | Use Case |
| :--- | :--- | :--- | :--- |
| **display-lg** | 3.5rem | 700 | Large hero numbers (Net Worth) |
| **headline-md** | 1.75rem | 600 | Section headers |
| **title-sm** | 1rem | 500 | Card titles / Navigation |
| **body-md** | 0.875rem | 400 | General reading / Data descriptions |
| **label-sm** | 0.6875rem | 600 | Uppercase metadata / Micro-labels |

**Editorial Note:** For financial data, always use tabular numbers (tnum) to ensure that columns of figures align perfectly for scannability.

## 4. Elevation & Depth: The Layering Principle

Depth in this system is achieved through **Tonal Layering**, mimicking physical sheets of obsidian glass stacked in a dark room.

*   **The Layering Principle:** Stacking follows a logical light source. An inner component (like a transaction row) should be `surface-container-highest` when placed inside a `surface-container-low` parent.
*   **Ambient Shadows:** Floating elements (modals/tooltips) use a `24px` blur shadow with the color `#000000` at 40% opacity. Avoid "dirty" grey shadows; use a deep black to maintain the "Dark-First" integrity.
*   **The Ghost Border Fallback:** If accessibility requires a container boundary, use `outline-variant` at **15% opacity**. It should be felt, not seen.

## 5. Components

### Buttons: The Kinetic Engine
*   **Primary:** Indigo-to-Blue gradient. No border. White text (`on-primary`). 
*   **Secondary:** `surface-container-high` background with `primary` colored text.
*   **Tertiary:** Ghost style. No background. `outline` color for text, shifting to `primary` on hover.

### Input Fields: The Sunken Well
Inputs must feel "inset" into the interface. Use `surface-container-lowest` for the background. 
*   **Active State:** No thick border. Use a 1px `primary` shadow glow (3px spread) to indicate focus.

### Cards & Lists: The No-Divider Standard
**Dividers are forbidden.** 
*   Separate list items using a `surface-container-low` background on hover.
*   Use `spacing-4` (1rem) between cards to let the "Deepest" background (`#0B0F14`) act as the natural separator.

### Specialized Component: The "Prism" Data Card
For AI-powered insights, use a card with a `0.5px` Ghost Border and a subtle `surface-tint` glow at the top-left corner (20% opacity). This differentiates AI suggestions from standard user data.

## 6. Do’s and Don’ts

### Do
*   **Do** use extreme scale. Pair a `display-lg` number with a `label-sm` descriptor for a premium, high-contrast look.
*   **Do** use "Surface Nesting" to create hierarchy.
*   **Do** apply `backdrop-blur` to all navigation bars and sticky headers to maintain a sense of environmental depth.

### Don’t
*   **Don’t** use `#000000` for backgrounds. It kills the ability to create "sunken" layers. Use the defined `surface-container-lowest`.
*   **Don’t** use 100% opaque borders. They create "visual noise" that clutters the financial data.
*   **Don’t** use standard "Success Green." Use the `tertiary` tokens for a more sophisticated, muted financial palette that remains legible against dark backgrounds.

---
*Document Version 1.0 | Prepared for Junior Design Team*