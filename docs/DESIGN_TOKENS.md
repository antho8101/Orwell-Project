# Design tokens (Figma → code)

Source of truth: Figma (Anthony). Synced into CSS `:root` where applicable.

## Couleurs principales

| Token | Hex | Usage |
|-------|-----|--------|
| **European Yellow** | `#E7C178` | Sable / accents / surfaces claires / CTA secondaires |
| **European Blue** | `#103463` | Marine / surfaces sombres / texte fort / CTA primaires |

Dérivés utiles (calculés pour UI, pas encore figés dans Figma) :

| Token | Hex | Rôle |
|-------|-----|------|
| `--blue-deep` | `#0B2448` | Header / hover plus sombre |
| `--blue-mid` | `#1A4A7A` | Hover / texte secondaire sur clair |
| `--yellow-soft` | `#F3E2B8` | Fond page / halos |
| `--ink` | `#101820` | Texte quasi-noir si besoin |

## Typographie

| Rôle | Famille | Taille | Line-height | Letter-spacing |
|------|---------|--------|-------------|----------------|
| **H1** | Anton Regular | 128px | 100% (1.0) | 5% (0.05em) |
| **Buttons** | Anton Regular | 16px | 111% (1.11) | 5% (0.05em) |
| **Text** | Roboto Medium | 16px | 150% (1.5) | 5% (0.05em) |

### Notes d’implémentation web

- Anton via Google Fonts (`Anton`)
- Roboto Medium = `Roboto` weight **500**
- Letter-spacing Figma 5% → CSS `letter-spacing: 0.05em`
- H1 128px : sur mobile, clamper (ex. `clamp(3rem, 12vw, 8rem)`) pour ne pas casser le layout
- All-caps souvent implicite avec Anton en display / boutons (à confirmer écran par écran dans Figma)

## UI copy

- **Product UI & mockups: English (native)** — always
- Internal design docs may stay FR; shipping strings do not

## À venir

- Styles H2 / H3 / labels / captions
- États hover / disabled / focus
- Grille / spacing scale
