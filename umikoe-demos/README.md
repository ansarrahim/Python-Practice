# Umikoe website: 4 design concepts

Redesign concepts for Umikoe (Social Design Collective LLC), a Japan trade desk, based on the client's original one-page demo.

## What's here

| File | What it is |
|---|---|
| `index.html` | Gallery: start here, it links to all four concepts |
| `demo-1-harbor.html` | Concept 1: original design, refined |
| `demo-2-washi.html` | Concept 2: Japanese editorial / minimal |
| `demo-3-tradedesk.html` | Concept 3: modern B2B with quick start and a 3-step request wizard |
| `demo-4-voyage.html` | Concept 4: bold container colours with an interactive route map |
| `assets/umikoe.js` | Shared engine: EN/JA text, products, catalogue, dialog, form, menu |
| `assets/base.css` | Shared styles for the dialog, form errors and scroll reveal |
| `standalone/` | Each concept as **one file**, easy to email or send on WhatsApp |
| `build_standalone.py` | Rebuilds `standalone/` after edits: `python3 build_standalone.py` |
| `PROPOSAL.md` | Client proposal: packages, pricing, running costs and timeline |
| `screenshots/` | Thumbnails used by the gallery |

## Showing the client

- **Easiest:** drag the whole `umikoe-demos` folder onto https://app.netlify.com/drop. You get a free public link in seconds; send them that link.
- **Or** send the four files in `standalone/`. They open in any browser (internet is needed for the fonts).
- Add `?lang=ja` to any URL to open it in Japanese.

## Working features (all concepts)

- EN / 日本語 switch for every text. The choice is remembered, and `?lang=ja` opens Japanese directly
- Product filter chips, search (Harbor and Trade Desk) and a details pop-up per product
- "Ask about this group" jumps to the form with that product already chosen
- Form validation with messages in the current language, a spam honeypot and a success message
- Mobile menu, sticky header, active section highlight, scroll reveal and a back-to-top button
- Keyboard and screen-reader support; animations switch off for users who prefer reduced motion

## Making the form really send

In `assets/umikoe.js`, set:

```js
var FORM_ENDPOINT = 'https://formspree.io/f/your-id';
```

Then run `python3 build_standalone.py` again. While it is empty, the form runs in demo mode and nothing is sent.

## Editing text

All wording, in both languages, lives in the `I18N` object at the top of `assets/umikoe.js`. Change it once and all four concepts update.
