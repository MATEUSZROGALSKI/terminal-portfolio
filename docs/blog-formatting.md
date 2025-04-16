# Blog Post Formatting Guide

This document explains how to format blog posts for the terminal portfolio website.

## Basic Markdown Formatting

The blog posts support standard Markdown formatting:

- `# Heading 1`
- `## Heading 2`
- `### Heading 3`
- Bullet lists with `- Item`
- Numbered lists with `1. Item`
- Code blocks with triple backticks: ``` code ```
- Inline code with single backticks: `code`

## Font Size Modifiers

You can change the font size of text within your blog posts using special tags:

```
[size:xs]Extra small text[/size]
[size:sm]Small text[/size]
[size:base]Base size text[/size]
[size:lg]Large text[/size]
[size:xl]Extra large text[/size]
[size:2xl]2x large text[/size]
[size:3xl]3x large text[/size]
```

### Examples

Here's how you can use these modifiers in your blog posts:

```markdown
# Regular Heading

This is normal text.

[size:lg]This is larger text that stands out.[/size]

[size:sm]This is smaller text, perhaps for a side note or less important information.[/size]

## Important Section

[size:xl]This is a key point that deserves extra attention.[/size]

### Code Example

```javascript
// This code will be displayed with line numbers
function example() {
  console.log("Hello, world!");
}
```

## Font Size Reference

- `xs`: 0.75rem (12px)
- `sm`: 0.875rem (14px)
- `base`: 1rem (16px)
- `lg`: 1.125rem (18px)
- `xl`: 1.25rem (20px)
- `2xl`: 1.5rem (24px)
- `3xl`: 1.875rem (30px)
