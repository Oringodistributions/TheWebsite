# Page-specific FAQ update — 26 October 2026

Replaced repeated blocks with 39 distinct questions: home 6, products 7, about 6, contact 8, returns 6, privacy 6. Each answer is static HTML inside an accessible native disclosure, with relevant internal links and stable question IDs. Catalogue records and photos are unchanged.

## Research and editorial decisions

Reviewed relevant UK competitors, not a verified market-share or rankings leaderboard:
- https://3sieefoods.com/pages/faq — ordering, delivery, bulk enquiries and order support.
- https://4wayfoods.com/faq/ — business identity, physical location, range and collection.
- https://www.african-foodbox.com/pages/faqs — search-indexed FAQ covers Birmingham delivery, order minimums and weight-based shipping; full page retrieval timed out.

Used topics as gap analysis only. Answers are original and grounded in Oringo's approved business details, existing policies and photographed inventory. No competitor fees, delivery promises, product claims or wording were adopted. No invented reviews, superlatives or claims that AI recommends the business.

Home answers discovery questions; products cover listed staples/brands and the actual enquiry flow; about explains the business and retail/wholesale audiences; contact covers location, hours, parking, quotes and payment; policy pages explain their own subjects rather than repeating commercial keywords.

Google's guidance: https://developers.google.com/search/docs/appearance/ai-features — helpful textual content, crawlability and internal links remain relevant; no special AI files or markup are required, and inclusion is not guaranteed. Existing robots.txt permits crawling. No speculative AI-specific markup or changes to crawler permissions were added.

Returns answers summarise the existing policy; UK cancellation wording checked against https://www.gov.uk/accepting-returns-and-giving-refunds . Privacy answers reflect the existing notice and sessionStorage/WhatsApp/email implementation.

## Validation

All six pages contain exactly one FAQ section. All 39 questions are unique, each has a nonempty answer, internal links resolve locally, IDs are unique per page, existing JSON-LD parses, and git diff --check passes. No changes to catalogue data, prices, photos or order functionality.
