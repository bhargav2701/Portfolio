# Portfolio Website - Bhargav Dolasiya

A responsive one-page personal portfolio website built with plain HTML, CSS, and vanilla JavaScript, featuring a Three.js animated particle network background.

## How to Run Locally

1. **Clone or download** this repository to your computer.
2. **Open the folder** containing the files.
3. **Open `index.html`** in any modern web browser (Chrome, Firefox, Edge, etc.).
   - You can double-click the file or right-click → "Open with" → Browser.
   - No server or build tools required — it's pure HTML/CSS/JS with CDN-loaded libraries.

Alternatively, you can use [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code for auto-reload during editing.

## File Structure

```
portfolio/
├── index.html       # Main HTML with all sections
├── style.css        # Complete stylesheet (dark theme, responsive)
├── script.js        # All JavaScript functionality
└── README.md        # This file
```

## Features

- Dark theme with electric blue/purple gradient accents
- Three.js animated particle network background
- Typing effect cycling through roles
- Smooth scroll navigation with active link highlighting
- Scroll-triggered fade/slide-in animations (IntersectionObserver)
- Animated count-up stat boxes
- Animated skill progress bars
- Project filter tabs
- Image carousel with auto-advance
- Contact form with validation and success message
- Fully responsive (mobile hamburger menu, tablet/desktop breakpoints)
- Performance optimized (reduces Three.js particles on mobile)

## Where to Edit Your Personal Info

All personal information is marked with **`[brackets]`** in the HTML or uses placeholder content. Search for these in `index.html`:

| What to Edit            | Where (index.html section)           |
| ----------------------- | ------------------------------------ |
| Your Name               | `<nav-logo>`, hero title, footer     |
| Roles (typing effect)   | `script.js` - `roles` array          |
| Tagline                 | `.hero-tagline`                      |
| Resume PDF link         | "View Resume" button `href`          |
| GitHub profile URL      | "GitHub" button, social links        |
| LinkedIn profile URL    | Social links in Contact & Footer     |
| Profile photo src       | `.profile-photo` `src`               |
| About photo src         | `.about-photo img` `src`             |
| Bio paragraphs          | `.about-text p`                      |
| Stats numbers           | `.stat-number` `data-target`         |
| Education entries       | `.timeline` items                    |
| Skill names/percentages | `.skill-bar-item` entries            |
| Project details         | `.project-card` elements             |
| Certification details   | `.cert-card` elements                |
| Contact email/phone     | `.contact-item` entries              |
| Email address (form)    | `mailto:` links                      |
| Certificate PDF links   | "View Certificate" button `href`     |
| Placeholder images      | All `src` with `via.placeholder.com` |

## Dependencies (loaded via CDN)

- **Google Fonts**: Poppins
- **Font Awesome 6**: Free icons
- **Three.js r128**: 3D particle background

No local installation required — all loaded from CDN in `<head>`.

## Browser Support

Works on all modern browsers:

- Chrome / Edge (latest)
- Firefox (latest)
- Safari (latest)
  </create_file>
