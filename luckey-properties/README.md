# LUCKEY Properties — website

The new LUCKEY Properties website (`luckeyproperties.com`): an editorial Dubai real-estate site and working lead-generation platform.
It is built with Next.js 16 (App Router), React 19 and TypeScript, using plain CSS and no UI framework.

```
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
npm run typecheck
npm test             # lead validation + qualification tests
```

Requires Node 20.9+. You can deploy it to any Node host: Vercel, Netlify, Render, a VPS behind nginx, and so on.
It doesn't need WordPress. Most pages are pre-rendered static HTML, and only `/api/lead` runs on the server.

## Content: where things live

| What | File |
| --- | --- |
| Company facts (phone, WhatsApp, email, address, Instagram) | `src/config/site.ts` |
| Six featured developments | `src/data/developments.ts` |
| Four featured locations | `src/data/locations.ts` |
| Team biographies & quotes | `src/data/team.ts` |
| Services | `src/data/services.ts` |
| "Why Dubai" content and sources | `src/data/dubai.ts` |
| Testimonials (unpublished until approved) | `src/data/testimonials.ts` |

### Media (logo, portraits, project photos)

I couldn't reach the original site's WordPress media folder from the build environment, so **no images have been assigned yet**.
I didn't guess any of them. Put files you have checked by eye at these paths and rebuild; they appear automatically.
Supported formats are `.avif`, `.webp`, `.jpg`, `.png` and `.svg`.

```
public/media/brand/logo-light.svg          # logo for dark backgrounds (header/footer)
public/media/hero/hero.jpg                 # hero photograph (and/or hero.mp4 for film)
public/media/team/pavan-tata.jpg
public/media/team/sravya-duvvuri.jpg
public/media/team/rohit-gonde.jpg
public/media/team/shiridish-raj-gollapally.jpg
public/media/locations/dubai-creek-harbour.jpg   (dubai-islands, expo-city, maritime-city)
public/media/properties/<slug>/01.jpg … 04.jpg   # slugs are listed in developments.ts
```

Until then the site uses honest stand-ins:

- the typographic LUCKEY wordmark;
- a line-drawn skyline in the hero;
- monogram panels for the team;
- numbered typographic plates for each property, marked "Official project imagery available on request".

Use only official developer imagery for projects.

### Verifying a property

Every development shows its previously published starting price, labelled **"Last published · subject to verification"**.
When you have confirmed the current details with the developer, update that development's entry in `developments.ts`:

- set `priceVerifiedAt: "2026-11-01"`. The label changes to "Verified Nov 2026".
- fill `verified.units`, `verified.paymentPlan`, `verified.handover`, `verified.amenities` and `verified.brochureUrl`.

Any field you leave empty shows a **"Request current …"** prompt instead of invented data.

## Leads

All forms post to `POST /api/lead`, which does the following:

1. Validates the submission on the server, using the same schema the browser uses (`src/lib/leads/schema.ts`).
2. Blocks spam: a honeypot field, a minimum fill time, a same-origin check, a per-IP rate limit, and optional Cloudflare Turnstile.
3. Scores the lead: **priority**, **active** or **nurture**, based on budget, timeline, a specific property and consultation requests (`qualify.ts`).
4. Attaches attribution: UTM tags, gclid/fbclid, referrer and landing page.
5. Delivers the lead to every configured channel. Set these in `.env` (see `.env.example`):
   - **CRM webhook** (`LEAD_WEBHOOK_URL`): signed JSON for a HubSpot, Zoho or Salesforce workflow, or Make/Zapier.
   - **Email** via Resend (`RESEND_API_KEY`, `LEAD_FROM_EMAIL`): a notification to `info@luckeyproperties.com`, then an acknowledgement to the visitor.

The visitor sees "Thank you" **only** when at least one channel has actually accepted the lead.
If nothing is configured in production, the form says it is unavailable and points to WhatsApp and email.
If delivery fails, the visitor sees an error with the same fallbacks.

Other enquiry routes:

- **WhatsApp:** every WhatsApp link opens `+971 55 825 6697` with a prefilled message. On property pages the message names the development and includes its URL.
- **Consultations:** set `NEXT_PUBLIC_BOOKING_URL` to a Calendly or Cal.com link, and "Book a Consultation" opens it. Without it, the button opens a consultation *request* form. The site never claims a booking is confirmed.

## Analytics

GA4 (`NEXT_PUBLIC_GA_ID`) or GTM (`NEXT_PUBLIC_GTM_ID`) loads only after the visitor accepts analytics cookies, and it uses Google Consent Mode.

Events:

| Event | Fires when |
| --- | --- |
| `generate_lead` | a lead is accepted (with `lead_type`, `property`, `tier`, `budget`, `timeline`) |
| `property_enquiry` | a lead names a property |
| `consultation_request` | a consultation is requested |
| `booking_click` | the booking link is opened |
| `whatsapp_click`, `phone_click`, `email_click` | a contact link is clicked |
| `view_item` | a property page is viewed |
| `property_filter` | the property filters change |
| `form_error` | a submission fails |

Mark `generate_lead` as a conversion in GA4. Lead source and campaign also travel with each lead into the CRM.

## SEO

- Per-page titles, descriptions and canonical URLs, plus Open Graph and a generated share image.
- Structured data: `/sitemap.xml`, `/robots.txt`, `RealEstateAgent` (organisation), `BreadcrumbList`, `ItemList`, `Residence`/`Place` and `Article`.
- Price offers are left out of structured data until they are verified.
- Permanent redirects from the old WordPress URLs, including `/privacy-policy-2/` and `…/index.html`, are in `next.config.ts`. Add any other URLs Google Search Console reports.
- Preview deployments are not indexed.

## Before launch — what still needs LUCKEY's input

- [ ] **Images:** supply and visually verify the logo, team portraits and official project imagery (see above).
- [ ] **Prices and availability:** confirm all six with each developer, then set `priceVerifiedAt` and the `verified` details.
- [ ] **Testimonials:** confirm each testimonial is genuine and the client has agreed to publication, then build with `NEXT_PUBLIC_TESTIMONIALS_APPROVED=true`. Until then the section is not rendered.
- [ ] **Office pin:** check the Ontario Tower map pin and address (`site.contact.mapQuery`).
- [ ] **RERA ORN and trade licence:** add them if you want them shown. They appear only once set.
- [ ] **Privacy policy and terms:** have counsel review them for the UAE PDPL, India's DPDP Act and GDPR where applicable.
- [ ] **Configuration:** set the lead channels, Turnstile and GA4 keys, then send a test enquiry and confirm it reaches the inbox or CRM.
- [ ] **Booking link:** add one if you use a calendar.
