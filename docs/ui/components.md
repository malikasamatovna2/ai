# Component Library — StylistMatch (MVP)

Design principles: modular, accessible, dark-theme friendly, small API surface for each component.

## Atoms
- Button
  - props: { variant: primary|ghost|danger, size: sm|md|lg, onClick }
- Icon (from Recraft.ai)
- Avatar
  - props: { src, size }
- Badge
  - props: { text, tone }
- Input / TextField
  - props: { value, onChange, placeholder, type }

## Molecules
- Card
  - props: { title, subtitle, image, actions[] }
- ServiceCard
  - shows service name, duration, base price, tags, book CTA
- PriceBreakdown
  - props: { base_price, dynamic_markup, addons } → shows final price & breakdown
- RecommendationCard
  - props: { image, name, confidence, explain, onSelect }

## Organisms
- Calendar (week/day view)
  - props: { bookings[], onSelectSlot }
- BookingModal
  - flows: show service, choose time, price calc, confirm
- AdminTable (bookings/services)

## Pages (composed)
- LandingPage
- SalonPage
- BookingFlowPage
- RecommendationPage
- AdminDashboard

## Accessibility
- All interactive controls must be keyboard reachable
- Use ARIA roles for calendar and modal

## Styling approach
- CSS Variables (design tokens), follow BEM / utility class approach
- Keep component CSS minimal and theme-aware (`var(--color-*)`)
