# Milo product-photo review — Oringo Distributions
Last reviewed: 2026-10-24.

A client-supplied PDF shows that searching Milo correctly returned 400g Tin and 800g Pouch but showed "Photo pending approval" placeholders.

The original stock list specifies Milo 400g tin and pouch, plus Milo 800g tin and pouch. The draft now contains four separately listed in-stock variants, bringing the active catalogue from 65 to 67 entries. No product photos are commercially cleared yet.

| SKU | Draft variant | Photo reference | Required checks |
| --- | --- | --- | --- |
| ORI-030 | Nestlé Milo Tin — 400g | [Success Foods 400g tin](https://successfoods.co.uk/home/131-nestle-milo-400g.html) | Match actual regional packaging, obtain permitted image. |
| ORI-072 | Nestlé Milo Pouch — 400g | [Official Nestlé MILO Nigeria 400g soft pack](https://www.milo.com.ng/products) | Confirm actual 2026 design matches Oringo stock, obtain image rights. |
| ORI-031 | Nestlé Milo Pouch — 800g | [Nestlé Nigeria](https://www.milo.com.ng/products), [Surulere Foods](https://www.surulerefoods.com/products/nestle-milo-nigeria-sachet-800g) | Confirm exact packaging, obtain own/authorised image. |
| ORI-073 | Nestlé Milo Tin — 800g | [Lanre Foods UK 800g tin reference](https://lanrefoodsonline.co.uk/products/nestle-milo-800g) | Check country/size/design. This is retailer reference, not official Nestlé Nigeria confirmation. Never substitute 1.2kg or 1.8kg. |

Product images require rights or suitable Oringo-owned front-facing photos. An image matching the brand alone is not enough: the exact variant and regional artwork matter. No photos are approved yet.

## Mobile PDF findings and fixes
- The attached PDF contains one extra-long page, not a native full-resolution iPhone screenshot; fit-to-screen makes everything appear tiny.
- Search returns results correctly. It showed two because two variants were initially recorded.
- The long ordering explanation above search is now collapsible and mobile hero compact.
- Added A4 print layout and print-friendly product card pagination.
- Existing phone-friendly basket shortcut, retail/wholesale choice and WhatsApp enquiry remain in place.
- Still required: independent manual browser check and approval of images before going live.

## Approval procedure
1. Confirm all four Milo pack formats and regional artwork in Oringo stock.
2. Request approved packshots from supplier/Nestlé or photograph Oringo stock.
3. After permission and variant check, add image files to repository assets and update image_url, photo_approved and source licence record.
4. Test iPhone search, basket and WhatsApp flow.
5. Ask the site owner to approve before merging draft changes. No auto-publishing.
