# Romantic Anniversary Countdown - Design Guidelines

## Design Approach

**Strategy:** Premium experience-focused design inspired by luxury brands and romantic digital experiences (Tiffany & Co., luxury hotel booking platforms). Emphasizes emotional connection, elegance, and intimate atmosphere.

**Core Principle:** Create a personal, sacred digital space for the couple - minimal distractions, maximum emotional impact through restrained elegance.

---

## Typography

**Font Stack:**
- Primary (Headings): 'Cormorant Garamond' or 'Playfair Display' - serif for romantic elegance
- Secondary (Body/Numbers): 'Montserrat' or 'Inter' - clean sans-serif for readability

**Type Scale:**
- Hero Headline: text-5xl md:text-7xl, font-light, tracking-wide
- Countdown Numbers: text-6xl md:text-8xl, font-extralight, tabular-nums
- Countdown Labels: text-xs md:text-sm, uppercase, tracking-widest, font-light
- Daily Message: text-xl md:text-2xl, font-light, leading-relaxed, italic
- Button: text-base md:text-lg, tracking-wide

---

## Layout System

**Spacing Primitives:** Tailwind units of 4, 8, 12, 16, 24

**Container Structure:**
- Full viewport height (min-h-screen) single-page design
- Max width: max-w-4xl for content
- Vertical centering with flexbox
- Responsive padding: px-4 md:px-8

---

## Component Library

### Hero Section with Photo
- Circular couple photo: w-40 h-40 md:w-56 md:w-56 with subtle gold ring border (border-4)
- Positioned at top-center with generous top margin (mt-12 md:mt-16)
- Subtle glow effect around photo using box-shadow
- Names displayed below photo: text-2xl md:text-4xl, elegant serif, letter-spacing

### Countdown Timer Display
- Four-column grid: grid-cols-4 gap-4 md:gap-8
- Each time unit in vertical stack (flex-col)
- Large numbers on top, small labels below
- Thin dividers between units (optional hairline separators)
- Glowing subtle animation on number transitions (minimal, elegant pulse)

### Daily Message Section  
- Contained in elegant card with subtle backdrop blur
- Max width: max-w-2xl
- Message text: centered, italic, generous line-height (leading-loose)
- Decorative quotation marks (typographic ornaments)
- Date stamp below message: text-xs, uppercase, opacity-70

### Interactive Button
- Blurred glass-morphism background (backdrop-blur-md)
- Pill shape: rounded-full
- Generous padding: px-12 py-4 md:px-16 md:py-5
- Gold accent border or fill
- Elegant hover lift effect (transform scale and subtle shadow increase)

---

## Images

**Couple Photo:**
- Circular frame, high-quality portrait
- Professional or candid romantic photo
- Placement: Top-center of viewport, first visual element
- Size reference: 160px mobile, 224px desktop diameter

**Background:**
- Full-screen starry night sky gradient or particle effect
- NOT a static image - use CSS gradient or subtle animated particles
- Depth: layered blues transitioning from navy to deep blue
- Subtle twinkling star effects (small, sparse, not distracting)

**No large hero image** - the starry background IS the atmospheric hero treatment

---

## Animations

**Strategic Use Only:**
- Countdown numbers: Smooth flip/fade transition on updates (1-2s duration)
- Photo: Gentle fade-in on load (1s)
- Stars: Subtle, slow twinkling (3-5s intervals, low opacity change)
- Button: Gentle hover lift (0.2s)
- Daily message: Soft fade-in when scrolled into view

**Forbidden:** Aggressive parallax, constant motion, rotating elements

---

## Accessibility

- High contrast gold (#EAB308) against dark backgrounds
- Ensure countdown labels are clearly readable
- Touch targets: minimum 44x44px for button
- Semantic HTML for countdown (time elements)
- Focus states with visible gold outline
- Responsive text scaling for readability

---

## Mobile Optimization

**Breakpoint Strategy:**
- Mobile-first: Single column, stacked vertically
- Tablet (md): Slightly larger spacing and typography
- Desktop: Maximum elegance with increased spacing

**Touch Optimization:**
- Generous button padding
- Countdown grid adapts: 2x2 grid on very small screens if needed
- Photo size scales proportionally

---

## Vertical Rhythm

- Consistent section spacing: space-y-12 md:space-y-24
- Photo → Names: mt-8
- Names → Countdown: mt-16 md:mt-24  
- Countdown → Message: mt-16 md:mt-20
- Message → Button: mt-12 md:mt-16

**Layout Flow:**
1. Couple Photo (circular, top-center)
2. Names/Title
3. Countdown Display (prominent, centered)
4. Daily Message Card
5. Interactive Button
6. Subtle footer credit (tiny, centered, opacity-50)

---

**Design Essence:** Intimate, luxurious, timeless. Every element whispers elegance. The dark starry canvas makes the gold accents and couple's story shine like constellations.