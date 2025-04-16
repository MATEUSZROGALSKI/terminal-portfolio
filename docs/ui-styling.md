# UI Styling Guide

This document outlines the styling approach and guidelines for the terminal portfolio website.

## Terminal Theme

The website uses a dark-themed terminal-like UI with the following characteristics:

- Dark background with animated elements
- Terminal-like aesthetics inspired by Garuda Mokka and Dr4gonized Linux terminals
- Purple and orange accent colors
- Monospace fonts for authentic terminal feel

## Font System

### Font Families

- Primary Terminal Font: JetBrains Mono (variable font)
- Fallback Fonts: Consolas, Monaco, Courier New, monospace

### Font Size System

The application uses a unified font size system with CSS variables:

```css
/* Base text sizes */
--text-xs: 0.75rem;      /* 12px - Extra small text */
--text-sm: 0.875rem;     /* 14px - Small text */
--text-base: 1rem;       /* 16px - Base text size */
--text-lg: 1.125rem;     /* 18px - Large text */
--text-xl: 1.25rem;      /* 20px - Extra large */
--text-2xl: 1.5rem;      /* 24px - 2X large */
--text-3xl: 1.875rem;    /* 30px - 3X large */
--text-4xl: 2.25rem;     /* 36px - 4X large */
--text-5xl: 3rem;        /* 48px - 5X large */

/* Terminal specific text sizes */
--terminal-font-size: 0.875rem;  /* 14px - Unified terminal font size */
```

### Terminal Font Size

All terminal components use a unified font size (`--terminal-font-size`) to ensure consistency across the application. This includes:

- Command prompts
- Command outputs
- Terminal content
- Terminal tabs
- All UI elements except blog post content

### Blog Post Font Sizes

Blog posts use the unified terminal font size as a base but allow content authors to modify text sizes using special syntax:

```
[size:xs]Extra small text[/size]
[size:sm]Small text[/size]
[size:base]Base size text[/size]
[size:lg]Large text[/size]
[size:xl]Extra large text[/size]
[size:2xl]2x large text[/size]
[size:3xl]3x large text[/size]
```

See [Blog Formatting Guide](./blog-formatting.md) for more details.

## Color Scheme

The application uses a dark color scheme with the following primary colors:

```css
--background-rgb: 12, 12, 22;       /* Dark background */
--terminal-bg: #0c0c16;             /* Terminal background */
--terminal-header: #0c0c16;         /* Terminal header */
--terminal-text: #e4e4e4;           /* Terminal text */
--terminal-prompt: #9d4edd;         /* Terminal prompt */
--terminal-command: #ff7b00;        /* Terminal command */
--terminal-blue: #4390cf;           /* Terminal blue */
--terminal-green: #27c93f;          /* Terminal green */
--terminal-yellow: #ffbd2e;         /* Terminal yellow */
--terminal-red: #ff5f56;            /* Terminal red */
```

### Accent Colors

The primary accent colors are:

```css
--purple-accent: 157, 78, 221;      /* #9d4edd */
--orange-accent: 255, 123, 0;       /* #ff7b00 */
```

## Component Styling

### Terminal Window

- Dark background (#0c0c16)
- Subtle box shadow
- Rounded corners (6px)
- Terminal buttons (close, minimize, maximize) in the top-left corner
- Tabs inline with the title bar

### Terminal Tabs

- Inline with the title bar
- Path-style format: `username@hostname: ~ ./path`
- Small 'x' marks (non-functional)
- Active tab highlighted with purple border

### Terminal Content

- Custom scrollbar with purple accent
- Consistent line height and spacing
- Command prompts with username@hostname format
- Command outputs with appropriate spacing

### AboutMe (Neofetch)

- ASCII art with gradient coloring
- Two-column layout (ASCII art and system info)
- System info displayed in key-value format
- Color blocks at the bottom

### Timeline (Git Log)

- Git log format with commit hashes
- Branch and tag information
- Commit messages representing positions
- File changes representing skills
- Git graph visualization

### Projects (Process List)

- Process list format similar to htop/top
- CPU and memory usage bars
- Process details with command and description
- Color-coded process information

### Blog List

- Directory listing format
- File permissions and metadata
- File names with extensions
- Descriptions and tags

### Contact Form

- SMTP protocol simulation
- Server-client message exchange
- Command-line style input
- Step-by-step form completion

## CSS Organization

- Component-specific CSS files (e.g., `AboutMe.css`, `Timeline.css`)
- Global styles in `globals.css`
- Text size utilities in `text-sizes.css`
- Utility classes for common styling needs
- Minimal use of inline styles

## Responsive Design

The application is fully responsive with:

- Mobile-first approach
- Breakpoints for different screen sizes
- Adjusted layouts for smaller screens
- Preserved terminal aesthetics across devices

## Accessibility

- Sufficient color contrast for readability
- Keyboard navigation support
- Semantic HTML structure
- Screen reader friendly content
