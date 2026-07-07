# Mariscos Alta Vista — Online Ordering (Prototype)

A mobile-friendly ordering site + owner dashboard for Mariscos Alta Vista
(Paramount, CA), built to replace ordering entirely through Instagram DM/text.

This is a **demo/prototype** to show the business owner what's possible.
Prices, accounts, and integrations below are placeholders until real
ones are wired in.

## What's here

- **`/`** — Customer ordering page: browse the menu, add to cart, choose a
  pickup date/time, pay online (stub) or at pickup.
- **`/dashboard`** — Owner's order dashboard (passcode-protected), works on
  phone, tablet, or computer. Auto-refreshes every 10s.
- Orders are stored in a local `data/orders.json` file (gitignored) — good
  enough for a demo, should move to a real database before real launch.

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000 for the customer page, and
http://localhost:3000/dashboard for the owner dashboard (default passcode:
`mariscos2026`, override with the `DASHBOARD_PASSCODE` env var).

## Before this goes live for real

1. **Real menu & prices** — edit `src/lib/menu.ts`. All current prices are
   placeholders.
2. **SMS notifications** — wire up Twilio in `src/lib/notify.ts`
   (`notifyNewOrderBySms`). Needs a Twilio account + phone number.
3. **Email notifications** — wire up an email provider (e.g. Resend) in
   `src/lib/notify.ts` (`notifyNewOrderByEmail`).
4. **Online payment** — the "pay online" option currently just shows a
   "coming soon" message. Wire up Stripe Checkout for real card/Apple
   Pay/Google Pay payment before enabling it for real.
5. **Real database** — swap `src/lib/orderStore.ts`'s JSON file for a real
   database (e.g. Supabase/Postgres) before this handles real orders.
6. **Change the dashboard passcode** — set `DASHBOARD_PASSCODE` in your
   deployment environment.
7. **Deploy** — e.g. to Vercel — and optionally add a custom domain.

## Installing as an app

This is a PWA — on iPhone/Android, opening the site and choosing
"Add to Home Screen" installs it like a real app, no App Store needed.
