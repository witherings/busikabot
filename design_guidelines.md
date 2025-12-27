# Anniversary Relationship Tracker - Design Guidelines

## Design Approach
**Reference-Based + Custom Aesthetic**: Draws from Stripe's minimalist UI patterns and Apple's spatial design, adapted for romantic space theme with glassmorphism.

## Core Visual System

### Typography
- **Primary Font**: Inter or DM Sans (clean, modern sans-serif)
- **Display**: 48-64px (hero headings), 600 weight
- **Headings**: 24-32px, 500-600 weight
- **Body**: 16-18px, 400 weight
- **Captions**: 14px, 400 weight
- **Letter Spacing**: Slightly increased (0.02em) for elegance

### Spacing System
Strict adherence to **24px and 32px** unit system:
- Section padding: `py-24` to `py-32`
- Component gaps: `gap-6` (24px), `gap-8` (32px)
- Card padding: `p-6` or `p-8`
- Between major sections: 48-64px (2x base unit)

### Layout Structure
- Max container width: 1200px centered
- Single-column focus for primary content
- Two-column grid for milestone cards (desktop), stack on mobile
- Asymmetric layouts for visual interest

## Component Design

### Glassmorphism Containers
- Semi-transparent dark backgrounds (rgba(15, 23, 42, 0.6))
- Backdrop blur: 20-24px
- Subtle border: 1px solid rgba(255, 255, 255, 0.1)
- Rounded corners: 20-24px
- Soft inner glow using box-shadow

### Primary Buttons (Pill-Shaped)
- Height: 48-56px
- Border radius: 9999px (full pill)
- Gold/peach gradient background (#FFD700 to #FFAB91)
- 16px horizontal padding minimum
- When on images: backdrop-blur-md background
- Subtle shadow with gold/peach glow

### Data Display Cards
- Glassmorphic container base
- Gold/peachy accent for numbers and key data
- White text for labels
- Outer glow effect (0 0 20px rgba(255, 215, 0, 0.3))
- Floating appearance with soft shadow

### Navigation
- Fixed top header with glassmorphism
- Minimal links (3-4 max)
- Right-aligned CTA button
- Subtle divider line at bottom

## Page Structure

### Hero Section (80vh)
- Full-width cosmos background with animated stars
- Large centered headline with gradient text (white to gold)
- Subtitle in muted white/gray
- Primary CTA button (blurred background)
- Foreground couple silhouette or romantic illustration with soft glow
- Subtle particle effects

### Timeline/Milestones Section
- Two-column grid of milestone cards
- Each card: glassmorphic, displays date, event name, days/years count
- Gold/peach accents on numbers
- Staggered layout for depth
- 32px gap between cards

### Stats Dashboard
- Three-column grid (stack on mobile)
- Large numbers in gold/peach gradient
- Labels in white
- Each stat in individual glassmorphic container
- Centered alignment

### Add Milestone CTA Section
- Full-width glassmorphic panel
- Centered content with generous padding (py-24)
- Headline + description + pill button
- Floating appearance with stronger shadow

### Footer
- Minimal glassmorphic container
- Links in single row (centered or spread)
- Subtle text, no visual clutter
- 24px padding

## Visual Effects

### Glow Implementation
- Text glow: `text-shadow: 0 0 20px rgba(255, 215, 0, 0.5)`
- Container glow: `box-shadow: 0 0 40px rgba(255, 215, 0, 0.2)`
- Image glow: Soft halo around couple imagery

### Background Treatment
- Deep gradient: #0a0e27 to #1a1f3a
- Layered star field (small dots, varying opacity)
- Subtle nebula gradient overlays (purple/blue tints)
- Fixed attachment for parallax effect

## Images

### Hero Image
**YES - Large hero background image**
- Description: Romantic couple silhouette or embrace against starry cosmos
- Placement: Full hero section background, centered
- Treatment: Soft glow edge effect, slightly blurred edges
- Overlay: Dark gradient (top to bottom, 0.4 to 0.6 opacity)

### Milestone Icons/Imagery
- Description: Subtle romantic icons (hearts, rings, stars)
- Placement: Inside milestone cards as accent elements
- Treatment: Gold/peach colored, small (24-32px), subtle glow

### Background Decorative Elements
- Description: Abstract constellation patterns, floating hearts
- Placement: Scattered throughout sections
- Treatment: Very low opacity (0.1-0.2), non-distracting

## Interaction Patterns
- Smooth transitions (0.3s ease)
- Cards lift on hover (subtle translateY)
- Glow intensifies on interactive elements
- No aggressive animations - maintain romantic, peaceful atmosphere

## Accessibility
- Minimum contrast ratio 4.5:1 (gold on dark achieves this)
- Clear focus states with gold outline
- Legible font sizes (16px minimum)
- Generous touch targets (48px minimum)