# Modular CSS Map for formant.ca

This file documents the current modular CSS structure of the site after refactoring the monolithic `style.css` file.

---

## CSS Modules

### `critical.css`
- Font-face declarations for Orbitron
- Basic `html`, `body` reset
- Initial layout and typography for `.logo-text`, `.logo-text2`, `#home`
- Animated hover outlines for `.logo-text`

### `base.css`
- Standard resets (margins, paddings)
- Global typography and colors
- Scroll-snapping configuration
- Base section and anchor styles

### `layout.css`
- Page-wide containers
- Scroll and viewport sizing logic
- Section layout (`#content > section`)
- Scroll containment, vertical layout

### `nav.css`
- Fixed navigation bar
- `.logo`, `.nav-links`, responsive behavior
- Hover transitions for nav links

### `abt.css`
- `#about` section-specific styling
- `.about-image-frame`, `.card-title`, `.card-image`
- About carousel button styles

### `carousel.css`
- Shared carousel layout and buttons
- `.work-carousel`, `.music-carousel`, `.carousel-track`
- `.carousel-btn`, `.carousel-card`, `.music-card`, `.selection-slot`

### `modal.css`
- `.project-modal`, `.project-modal-content`
- Open/close logic styling for project modals

### `embeds.css`
- Embed card designs: `.embed-card`, `.yt-embed-card`, `.sc-embed-card`, `.sp-embed-card`
- Modal styles: `.embed-modal`, `#close-embed-modal`, `#embed-player-container`
- Embedded iframe and thumbnail layouts

### `pages.css`
- Background images for each section: `#home`, `#about`, `#work`, `#music`, `#contact`
- Overrides for full-page layout per section

### `cookie.css`
- (Empty or placeholder) Styles for cookie consent UI

### `nf.css`
- `404 Not Found` page: `.not-found`, `.btn`

### `anim.css`
- Logo orbit animations
- Hover/active transition keyframes

### `components.css`
- Utility and reusable component styles
- `.skip-link`, `.visually-hidden`, `.section-header`
- Form controls, focus states

### `media.css`
- Global responsive styles
- Adjustments for `.music-card`, `.embed-card`, `.nav`, `.social-bar`
- Landscape handling on mobile

### `accessibility.css`
- (Currently empty) Reserved for future accessibility-focused rules

---

## Notes
- `style.css` is now intentionally empty.
- All critical styles (fonts, layout, first paint) are in `critical.css` for performance.
- Each section-specific stylesheet is modular and preloadable via `<link rel="preload" ...>`.

---

_This map should be updated if stylesheets are added, renamed, or consolidated._