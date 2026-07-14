# Master Prompt v2: Swappo — Equipment Sharing Platform (Netherlands)

This version merges the strategy prompt with the actual Swappo UI design (mockups v0.2). Paste everything below into your builder. The builder should reproduce THIS design, not invent its own.

---

## ROLE

You are a senior full-stack product designer and developer. Build **Swappo**, a production-quality, mobile-first, PWA-ready peer-to-peer equipment rental and sharing marketplace for the Netherlands. High-fidelity mockups exist — follow the DESIGN SYSTEM and SCREEN SPECS below exactly. Do not substitute your own visual style.

## PRODUCT VISION

**Brand:** Swappo
**One-liner:** A neighbourhood platform where people rent, lend, and share the equipment they own but rarely use — tools, instruments, gaming gear, furniture, garden equipment — reducing waste and saving money.
**Mission:** Unlock idle household inventory for neighbours, supporting the Dutch circular economy (circulaire economie) and community trust.

**Target users:**
1. Lenders/owners — earn a little, help neighbours, declutter
2. Borrowers — need an item briefly, don't want to buy

## DESIGN SYSTEM (from Swappo mockups — follow exactly)

- **Primary colour:** Vibrant orange (≈ #EE7218) — page background on browse screens
- **Secondary:** Warm peach/tan (≈ #F0BE94) — header bar background
- **Surface:** White rounded cards (≈ 24px radius) on orange background
- **Accents:** Red heart badge (favourites), green (success states, Publish button), purple (active dropdown/filter states), soft cream (#FAF3EC) for filter sheets
- **Typography:** Rounded geometric sans-serif (Poppins or similar), bold weights for prices and titles
- **Cards:** Listing card = photo (rounded top), star rating (orange stars), item name, bold price "10€ per Day", heart toggle top-right
- **Buttons:** Pill-shaped, orange primary, lighter peach for secondary/disabled
- **Overall feel:** Warm, playful, approachable — consumer app energy, not corporate

## GLOBAL LAYOUT

**Top header (persistent on main screens):**
- Profile avatar (left, tappable → account menu)
- Postcode input field (Dutch format, e.g. "3451WD")
- Radius dropdown ("5 Kms" — options 1/2/5/10/25 km)
- Rental cart icon (right) with item-count badge

**Bottom navigation (4 tabs):**
1. Home (house icon) — browse feed
2. Map (location pin) — map results view
3. Favourites (heart) — saved items
4. Inbox (envelope) — messages & notifications, unread badge

## SCREEN SPECS

### 1. Auth
- Login: "Hello there! Sign in to Continue" — email + password, LOGIN button, link to sign up
- Sign up: "Create new Account" — name, email, password; "Already Registered? Login"
- Forgot password: email field → SEND

### 2. Home / Browse
- Search bar ("Search item here") + filter icon button
- Category chips with small illustrated icons, horizontally arranged, selected chip = black background: **All items, Garden tools, Gaming, Music instruments, Furniture, Others (+)**
- 2-column grid of listing cards (photo, rating stars, name, "X€ per Day", heart toggle)
- Tapping a category filters the grid; heart toggles favourite state instantly

### 3. Map results
- Title "Results" + contextual subtitle ("Check out the guitars in your area…")
- Full-width stylised map with orange pins for matching items
- Filter icon opens **filter sheet** (cream card overlay) with removable active-filter chips and controls:
  - Rental price per day (min–max dropdowns)
  - Review (star range, from X stars to 5)
  - Rental duration (min–max days)
  - Available dates (date range)
  - CTA: "See N results" (live count)
- After filtering: matching pins highlighted, others faded; horizontal swipeable card carousel over the map showing matching items

### 4. Item detail
- "Back to other [category] options" header link + cart icon
- White card: title format "Electric guitar | Model 465", large photo, star rating, "Rental price per day: 10€"
- "Available for pick up at [postcode]" and "on the following days [date range]" — approximate location only (privacy: exact address shared via chat after confirmation)
- CTA: "Add to rental cart"
- Confirmation state (light-green card): "This item has been added to your rental cart" + "Go to rental cart" / "Add more items to rental cart"; cart badge increments

### 5. Rental cart / Checkout
- "Items in your rental cart": each item shows name, €/day, date range, computed "Total Rental price"
- "Pick up address": postcode + note "Address will be confirmed via message from renter once order has been confirmed."
- "Payment information": **iDEAL with bank selection (e.g. ABN AMRO)** as primary method; card fallback
- Gift voucher / promo code field with Apply
- "Buy now" button (enabled once payment method selected)

### 6. Order confirmation
- Celebration screen: "Your ORDER has been PLACED!" with confetti illustration
- Guidance text: contact the lister via the Inbox tab; return home via Home tab

### 7. Inbox & chat
- Conversation list: item thumbnail, item name ("Saxophone | Model 90"), last message preview, timestamp, orange unread-count badge
- Chat view: item-scoped conversation, avatars, timestamps, message input + send button
- Purpose: arrange pickup location/time (e.g. "Can I pick it up near Vleuten Station at 6pm?")

### 8. Account menu
- Header: avatar + user name on peach background
- Menu items (white rows, grey icons): Inbox, Orders, **List your item!**, Settings, Language (shows "Dutch" — toggle Dutch/English), Need help?, Feedback, Report a complaint, Sign out

### 9. Seller dashboard ("Your listings!")
- CTA: "Create new listing!"
- **Listing overview** stat tiles: Chats to answer, Active listings, Listings to review
- **Performance** tiles: Profit history (€), Clicks on listings (last 7 days), Seller rating (avg + count)

### 10. Create listing
- Photo uploader: "Add photos", counter "Photos: 0/10", "Choose your listing's main photo first."
- Fields: Title, Price, Category (dropdown), Condition (dropdown), Description (including brand)
- Location: city + postcode with Edit link (e.g. "Utrecht | 3451 WD")
- **Privacy setting toggle: "Show listing anonymously"** (hides name/avatar on public listing until booking confirmed)
- Publish (green) / Cancel (grey)

## CORE LOGIC & RULES

- **Booking model:** cart-based checkout (per mockups). Owner is notified after payment; pickup details arranged via chat. Architecture note: keep an owner accept/decline step feasible behind a feature flag for v2.
- **Payments:** iDEAL first-class (Mollie recommended — Dutch-native; Stripe acceptable). Platform holds payment escrow-style; release to owner after rental period ends. Support deposits (borg) as an optional per-listing field even though not shown in mockups.
- **Trust:** verified email + phone; ratings for items and sellers; response-rate tracking; anonymity toggle respected everywhere pre-booking.
- **Location privacy:** only postcode area shown publicly; exact address exchanged in chat after order confirmation.
- **Notifications:** email + PWA push for new orders, messages, return reminders.

## LOCALISATION & COMPLIANCE (NL/EU)

- Bilingual: Dutch (default) + English, full i18n, switcher in account menu
- GDPR/AVG: cookie consent (functional vs analytics), privacy policy, right-to-delete account, data minimisation
- Legal pages: Algemene voorwaarden, Privacybeleid, Cookie policy, P2P liability disclaimer
- EUR amounts, Dutch postcode format (1234 AB), WCAG 2.1 AA

## TECHNICAL REQUIREMENTS

- React/Next.js (or builder default), API-first (REST/GraphQL) so native iOS/Android apps can reuse the backend later
- Auth: email/password + Google/Apple; phone verification via SMS
- Images: client-side compression, up to 10 photos per listing, lazy loading
- Geosearch: postcode → lat/long, radius queries
- Payments: Mollie (iDEAL) integration points clearly stubbed
- SEO: SSR for listing/category pages, Dutch meta, schema.org Product/Offer
- Analytics: privacy-friendly (Plausible)

## PHASE 2 (architect for, don't build)

- Owner accept/decline booking flow; damage/dispute flow with pickup & return photo evidence
- Deposit (borg) handling UI; optional insurance add-on
- Lend-for-free and give-away listing types alongside rentals
- Neighbourhood groups (buurt circles); impact dashboard (CO₂, waste, € saved)
- Business accounts (kringloopwinkels, gemeenten); native mobile apps

## SUCCESS CRITERIA

- First-time visitor understands Swappo within 5 seconds
- Creating a listing takes under 3 minutes on a phone
- Renting an item takes under 5 taps from a listing card
- Trust signals (ratings, verification, privacy controls) visible at every decision point

## DELIVERABLES

1. Working frontend for all 10 screens above with realistic Dutch sample data (e.g. "Bosch accuboormachine — 4€ per Day — Utrecht Oost", guitars, ladders, PS4 controllers, bean bags — matching the mockup inventory)
2. Component library matching the Swappo design system (colours, pills, cards, chips, bottom nav)
3. Stubbed API layer with clear comments where Mollie, SMS, and email plug in
4. README covering architecture and Phase 2 extension points

Build the Home/Browse screen first so I can validate the design fidelity against the mockups before you build the remaining screens.
