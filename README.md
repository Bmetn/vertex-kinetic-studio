# VERTEX — Apex Kinetic Architecture Portfolio Template

VERTEX is a professional, high-end portfolio template designed specifically for architectural studios, structural engineers, and visionary designers. Rooted in brutalist, minimalist, and technical aesthetics, this template serves as a digital canvas for showcasing kinetic architecture and large-scale projects with precision and elegance.

## Key Features

- **Systemic & sustainable grid design:** A rigid, mathematically perfect layout grid that ensures optical alignment across all breakpoints.
- **Interactive fluid background animation layer:** A purely technical, physics-based background that brings the canvas to life without distracting from your work.
- **Clean and semantic HTML5 & CSS3 structure:** Built with modern web standards in mind, ensuring high performance, accessibility, and ease of maintenance.
- **Fully responsive navigation & responsive layout:** Milimetrically calibrated spacing and typography that scales flawlessly from ultra-wide desktops to mobile devices.

## How to Customize

### Logo & Text
To personalize the template, open the main HTML files and locate the `<header>` or navigation area. You can easily replace the "VERTEX" text with your own studio's name. Global typography and color variables can be adjusted directly in the core CSS file to match your brand identity.

### Alignments
The template's core alignment is governed by a strict structural rule: a `max-width: 1440px` and `margin: 0 auto` container applied to both the Header and the main content areas. This guarantees that your navigation items, logos, and project titles are always perfectly synchronized on the same vertical axis. **Keep these wrapper classes intact** to maintain the rigid brutalist alignment.

### Background Animation
The kinetic background layer operates independently behind the main content. It is isolated using `position: fixed`, `z-index: -1`, and `pointer-events: none` to ensure it never interferes with user interactions.
- **To customize:** Edit the specific animation parameters within the JavaScript files.
- **To disable:** You can simply remove or comment out the animation `<canvas>` tag and its script reference. The site will seamlessly fall back to its sleek, dark minimal theme.

## Folder Structure

```text
VERTEX/
├── index.html          # Main entry point and homepage
├── assets/             # Global assets (fonts, icons, vectors)
├── css/                # Stylesheets and global design tokens
├── js/                 # Interaction logic and background animation scripts
└── images/             # Project showcases and placeholder images
```

## Licensing & Support

By purchasing this template, you are granted a license for both **personal and commercial portfolio use**. You may modify, adapt, and deploy this template to showcase your studio's work or your agency's projects to the world. Reselling the template as a standalone product or theme is prohibited.
