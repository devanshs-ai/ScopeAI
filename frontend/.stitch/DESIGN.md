# Design System: Social Network (David Fincher Edition)
**Project ID:** 2574078534653431404

## 1. Visual Theme & Atmosphere
The atmosphere is heavily inspired by David Fincher's film aesthetics (Se7en, The Social Network, Fight Club). It feels moody, methodical, hyper-focused, and slightly clinical. 
- **Density:** High density, grid-like precision, resembling forensic dashboards or sterile development environments.
- **Aesthetic Philosophy:** Function over form. High contrast between text and the deep background.
- **Texture:** A very light, persistent grainy animation overlay that gives it an analog, cinematic, slightly gritty feel.

## 2. Color Palette & Roles
- **Abyss Black** (`#090a0a`): Primary background. Acts as the endless canvas.
- **Sterile Charcoal** (`#131615`): Secondary background for cards, sidebars, and elevated surfaces.
- **Desaturated Olive/Cyan** (`#1c2522`): Used for hover states and subtle borders.
- **Sickly Neon Green/Yellow** (`#a4c639` or `#d2d854`): Primary accent. Used sparingly for interactive elements, buttons, and call-to-actions, mimicking old CRT monitor glows.
- **Clinical White** (`#e0e5e3`): Primary text color. Slightly muted to prevent blooming.
- **Washed Mint Text** (`#8b9e97`): Secondary or inactive text. 

## 3. Typography Rules
- Use dense, technical fonts. Prefers fixed-width or neo-grotesque sans-serifs like **Inter**, **Roboto Mono**, or **Space Grotesk**.
- Headers are tightly tracked (negative letter spacing) and heavy.
- Body text is crisp and highly legible. Monospace fonts are used for metadata, timestamps, or system statuses.

## 4. Component Stylings
- **Buttons:** Sharp, squared-off edges (`rounded-none` or `rounded-sm`). Often outlined rather than filled, glowing with the accent color on hover.
- **Cards/Containers:** Crisp corners (`rounded-sm`), 1px solid borders in *Desaturated Olive*, flat shadows rather than deep drops.
- **Inputs/Forms:** Harsh outlines, deep backgrounds, glowing active states. Minimal placeholder text.

## 5. Layout Principles
- Strict grid alignments with thin dividing lines.
- Asymmetrical but highly structured layouts. 
- Intimacy through darkness—using large margins to focus on singular streams of data (the feed).
- The grain animation must sit on `pointer-events-none` fixed full-screen overlay to ensure it doesn't disrupt user interaction.

## 6. Design System Notes for Stitch Generation
[Copy this exactly to Stitch Prompts]
Use a David Fincher-inspired moody, cinematic aesthetic. The background should be Abyss Black (#090a0a) with surfaces in Sterile Charcoal (#131615). Use clinical, technical typography (Inter/Mono) with crisp, sharp edges (rounded-none or sm) and 1px borders (#1c2522). The primary accent color is a muted, sickly neon yellow/green (#d2d854) for sparse interactive highlights. Text should be clinical white (#e0e5e3) and washed mint (#8b9e97). Maintain a strict, grid-based, high-density layout. Include a CSS-based light film grain noise overlay throughout the site.
