# Social Proof / CODE

Project direction: oEnzoRibas. Implementation reuses the existing Liquid Glass tokens,
testimonial cards, gold star interactions and page reveal animations.
Logos float directly on the page without rectangular tiles. Brand colors are preserved;
Canonical and Ubuntu wordmarks use white lettering for contrast, keeping their orange
symbols. Dom Helder and SYDLE use official white variants for dark backgrounds.

`src/data/partners.ts` supplies `PartnersMarquee` with name, logo, alt and optional URL.
The carousel of projects remains independent. Two equal-width logo groups produce a
seamless GSAP transform loop at approximately 28 pixels/second. A second row moves
in the opposite direction, with a rotated logo order. Both rows share pause controls;
the decorative second row is omitted for keyboard focus and reduced motion.
ResizeObserver keeps
speed proportional on resize and preserves progress. Hover and manual controls pause
the animation; document visibility also suspends it. Keyboard focus shows a stationary
list of unique links. Reduced motion uses this same static layout. All observers,
listeners and tweens are cleaned up. Logos have a text fallback on load failure.

## Reference assets — not confirmed partnerships

These marks are layout examples requested for the preview. Keep the visible disclaimer
until CODE confirms the relationships and permissions for public use. Do not add
invented endorsements, client counts or success metrics. Testimonials remain explicitly
demonstrative. About copy follows the services already listed in FileExplorer; AI and
computer vision were not added as unverified capabilities.

- Canonical: https://commons.wikimedia.org/wiki/File:Canonical_logo_2023.svg
  (Canonical Ltd.; the file page identifies Canonical's brand asset folder as the source).
- Dom Helder (color): https://domhelder.edu.br/wp-content/uploads/2025/04/2025-01-28_Logo-Dom-Helder_-Horizontal_Tagline_Preto-e-Vermelho.png (from https://domhelder.edu.br/).
- Red Bull wordmark: https://commons.wikimedia.org/wiki/File:Logo_of_Red_bull.svg
  (attributed to Red Bull GmbH, source website listed on the file page; PD-textlogo designation).

Files are stored locally under `src/assets/partners`. Canonical and Ubuntu have only
their dark lettering adapted to white; geometry and orange symbols remain unchanged.
CSS applies subtle hover opacity; trademarks remain with their owners.
Before launch, approve brand treatment and replace reference data with authorized
partners and testimonials. The component does not fetch third-party assets at runtime.

## Additional sources

- Ambev: https://commons.wikimedia.org/wiki/File:Logotipo_da_Ambev_(2024).svg
  (Ambev, sourced there from catalogoambev.com.br; PD-textlogo designation).
- Localiza: https://www.localiza.com/assets/images/logos/localiza-logo.svg
- SYDLE: https://sydle.sydle.one/api/1/main/_classId/60c7b2b0b9a01d433c2de256/download/67111d7c22a33d1bf3abe5d4/assets/sydle-logo-white.svg
  (asset used by the public sydle.com site header).
- Ubuntu: https://assets.ubuntu.com/v1/ff6a9a38-ubuntu-logo-2022.svg
  (Canonical Ltd.; licensing context: https://commons.wikimedia.org/wiki/File:Ubuntu-logo-2022.svg).
- Dom Helder, white variant: https://domhelder.edu.br/wp-content/uploads/2025/03/2025-01-28_Logo-Dom-Helder_-Horizontal_Tagline_Branco.png

These additions remain references, not a claim of verified commercial partnerships.
