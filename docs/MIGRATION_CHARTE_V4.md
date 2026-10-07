# Migration du site vers la charte Artis V4 (theme sombre)

Source des jetons : artis-tokens-v4.css / artis-tokens-v4.json (Base_Templates_Artis/11_Proposition_Charte_V4).
Migration de jetons uniquement : aucun contenu, script JS, structure de page, sitemap ou robots modifie.

## Variables existantes conservees (noms inchanges, valeurs changees)
| Variable | Ancienne | Nouvelle |
|---|---|---|
| --ac-col-01 | #07111f | #040b18 (marine-900) |
| --ac-col-02 | #0a1929 | #081525 (marine-800) |
| --ac-col-03 | #0d2033 | #0d1f34 (marine-700) |
| --ac-col-04 | #0c2033 | #0d1f34 (marine-700) |
| --ac-col-05 | #122a40 | #122942 (marine-600) |
| --ac-col-06 | #142d44 | #183552 (marine-500) |
| --ac-col-07 | #1c3d5a | #1e4062 (marine-400) |
| --ac-col-23 | #0a1929 | #040b18 (texte sombre sur bloc clair) |
| --ac-col-30 | #22c55e | #16a34a |
| --ac-col-31 | #f59e0b | #d97706 |
| --ac-col-32 | #ef4444 | #dc2626 |
| --ac-ray-l / --ac-ray-xl | 16px / 20px | 12px / 12px |
| --marine-logo | #123452 (alias) | #011c56 |
| --blanc | #f6f7f8 | #ffffff |
| --encre, --gris-texte, --gris-bordure | alias du theme sombre | valeurs V4 (non utilisees dans le site) |

## Variables ajoutees dans :root
Primitives V4 (--marine-900 a 200, --ciel-100 a 500, --bleu-700/500/400/300, --fonc-*), roles uniformes (--color-primary, -soft, -secondary, -accent, -accent-strong, -logo, -success, -warning, -error, -info), roles du theme sombre (--color-background, -surface, -surface-alt, -header, -footer, -title, -text, -muted, -faint, -border, -border-strong, -link, -success-text, -warning-text, -error-text, -info-text), boutons (--btn-primary-bg, --btn-primary-text, --btn-secondary-bg, --btn-secondary-text, --btn-outline-border, --btn-outline-text), formes (--radius-round, --btn-radius-sm 8px, --btn-radius-lg 20px). Les alias --color-*-txt sont conserves. --radius-lg et --radius-xl sont supprimes.

## Valeurs en dur remappees (CSS, style="" et blocs style des HTML)
Marines et fonds : #07111f, #0a1929, #06121f, #071523, #06101b, #06223a -> #040b18 ; #0b2a3c, #091523, #091726 -> #081525 ; #10253a, #10253b, #10263a, #13304a -> #122942 ; #142d44, #142f46, #18374f -> #183552 ; #0f2840 -> #0d1f34 ; #1f4463 -> #1e4062.
Statuts : #22c55e -> #16a34a, #f59e0b -> #d97706, #ef4444 -> #dc2626 (et rgba correspondants). Les libelles de gravite (.a3__lvl) utilisent les variantes de texte #fca5a5, #fcd27a, #72c9d6.
rgba : (6,16,28), (6,18,31) -> (4,11,24) ; (10,25,41), (8,23,37) -> (8,21,37) ; (39,94,129) -> (36,76,114) ; (34,197,94), (245,158,11), (239,68,68) -> (22,163,74), (217,119,6), (220,38,38).
designer-process-IA.html (palette locale embarquee) : #091827 -> #081525, #142e44 -> #183552, #0d3146 et #102c3a -> #0d1f34, #143750 -> #1e4062, #122b41 et #102a40 -> #122942, #071a29 -> #040b18, #0b2030 -> #081525, #2b4960 et #2c526a -> #244c72 ; rayons 9 a 18 px -> 12 px.
theme-color (31 pages) et site.webmanifest : #07111f -> #040b18.

## Boutons : une forme, rectangle arrondi
- Petits et moyens boutons : 8 px (--btn-radius-sm) : .btn-primary, .btn-secondary, .btn-outline, .btn-ghost (dont .svc-back), .diag-bar__btn, .a4__btn, .ac-btn-01..03 et boutons du bloc de diagnostic.
- Grands boutons : 20 px (--btn-radius-lg) : .btn-lg, boutons du hero (.hero__actions), boutons du bandeau d'appel a l'action final (.a6 .a2__cta). Regle documentee dans style.css.
- Principal sur marine : degrade #0099c8 -> #00b9e5, texte #040b18. Sur bloc clair (fenetre modale de diagnostic, .ac-blc-06) : marine-900 plein, texte blanc.
- Secondaire : #0e6a95 plein, texte blanc (remplace #12334b / #d8f4fa). Survol : filter brightness.
- Contour : bordure #00b9e5, texte #edf3f7 (sur bloc clair : bordure et texte marine-900).

## Rayons
Blocs et cartes : 12 px. Petits elements (anciens 5, 6, 7, 9, 10 px) : 8 px. Barre flottante .diag-bar : 20 px (aussi en mobile, ou elle etait a 18 px). Pilules (badges, etiquettes, puces), cercles (50 %, dont .diag-modal__close) inchanges.

## Reste volontairement
- #6fa8dc (--ac-col-41, couleur du parcours 2 et de .cmp-columns), #6d4fc2, #24214f, #0f3c39, #17514e, #123c43, #a87412 : teintes de parcours ou de categories hors palette V4, conservees pour ne pas modifier le rendu.
- Gris de cartes claires (#d3dee7, #9fb1c1, #3b4a59, #2b3947, #4f6275, #6f8294...) : textes et bordures de blocs clairs, hors rampe marine.
- Palette de la page maturite-ia (#12abd8, #39cff2, #134f74, #0a80ab...) : echelle de progression, inline.
- Polices : inchangees. designer-process-IA.html declare localement Inter / ui-sans-serif dans son bloc style (existant).
