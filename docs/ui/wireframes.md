# Wireframes — StylistMatch (Dark Theme)

Purpose: quick, scannable wireframes for MVP screens. Use these as a guide for v0.dev / Galileo AI mockups.

## 1. Landing / Directory
- Header: Logo (left), Search (center), Auth buttons (right)
- Hero: dark gradient, large headline, CTA "Book your look" (neon teal)
- Featured salons: horizontal scroll of `Card` components
- Footer: minimal links, social icons (Recraft.ai)

ASCII sketch:

[Header]
Logo  |  Search bar  | Sign in / Sign up

[Hero]
Big headline
CTA [Book your look]

[Featured salons]
[Card][Card][Card]


## 2. Salon Page / Services
- Top banner with salon name, rating, location
- Services list: each `ServiceCard` shows name, duration, base price, CTA (Book)
- Sidebar: stylist list (avatars), Calendar snapshot

## 3. Booking flow
- Step 1: Select Service
- Step 2: Choose Date & Time (Calendar + TimePicker). Show stylist availability and buffer
- Step 3: Price Calculator modal (PriceBreakdown) with upsells
- Step 4: Confirmation (status pending), send SMS/email reminder

Sketch:

[Service list] -> [Select] -> [Calendar popover (select slot)] -> [Price modal] -> [Confirm]

## 4. Recommendation screen (AI)
- Photo uploader / camera
- Event type selector
- On submit: show `RecommendationCard` grid (3 items) with image, name, confidence badge, short explain
- If `audit_notes` exist, show warning banner ("May require 60+ minutes") with action "Adjust booking"

## 5. Admin Dashboard
- Left nav: Dashboard, Bookings, Services, Pricing Rules, Analytics
- Main: Calendar (week view) with bookings; top KPIs (conversion %, avg revenue)
- Pricing rules editor: list + modal to add rule (JSON params)

## Notes for v0.dev/Galileo
- Keep components reusable (Card, Modal, Button, Calendar, Avatar, Badge)
- Design for dark backgrounds: high contrast text, subtle shadows, neon highlights
- Export components as React + CSS Modules / Tailwind tokens
